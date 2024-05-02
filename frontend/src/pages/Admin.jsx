import React, { useState, useEffect, useRef } from "react";
import axios from 'axios';
import moment from "moment";
import { Navigate } from "react-router-dom";
import usePageMetadata from "../hooks/usePageMetaData";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Input, Button, Alert
} from "@material-tailwind/react";
import { FaRegCheckCircle } from "react-icons/fa";
import { BsTools } from "react-icons/bs";
import { RiErrorWarningLine } from "react-icons/ri";
import {
    BookOpenIcon, UserCircleIcon
} from "@heroicons/react/24/solid";
import { AiOutlineAudit } from "react-icons/ai";
import { useUser } from "../context/userContext";
const data = [
    {
        label: "Bookings",
        value: "bookings",
        icon: BookOpenIcon,
    },
    {
        label: "Services",
        value: "services",
        icon: BsTools,
    },
    {
        label: "Users",
        value: "users",
        icon: UserCircleIcon,
    },
    {
        label: "Audit Trails",
        value: "audit-trails",
        icon: AiOutlineAudit,

    }
];

const Admin = () => {
    usePageMetadata('Admin Page', 'This is the description for the Admin page.');
    const { user } = useUser();
    const isAdmin = user && user.data.isAdmin;
    if (!isAdmin) {
        return <Navigate to="/*" />;
    }

    const renderTabContent = (tabValue) => {
        switch (tabValue) {
            case "bookings":
                return <Bookings />;
            case "services":
                return <Services />;
            case "users":
                return <Users />;
            case "audit-trails":
                return <AuditTrails />;
            default:
                return null;
        }
    };
    return (
        <section className="px-1 my-12 md:px-2">
            <div className="mx-auto">
                <Tabs id="custom-animation" value="bookings">
                    <TabsHeader className="bg-orange-500 flex flex-wrap md:flex-nowrap">
                        {data.map(({ label, value, icon }) => (
                            <Tab key={value} value={value}>
                                <div className="flex items-center gap-2">
                                    {React.createElement(icon, { className: "w-5 h-5" })}
                                    <h1 className="font-bold">  {label}</h1>
                                </div>
                            </Tab>
                        ))}
                    </TabsHeader>
                    <TabsBody
                        animate={{
                            initial: { y: 250 },
                            mount: { y: 0 },
                            unmount: { y: 250 },
                        }}
                    >
                        {data.map(({ value }) => (
                            <TabPanel key={value} value={value}>
                                {renderTabContent(value)}
                            </TabPanel>
                        ))}
                    </TabsBody>
                </Tabs>
            </div>
        </section>
    )
}

export default Admin



export const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingStates, setLoadingStates] = useState({});
    const [loadingStatesBoneFire, setLoadingStatesBoneFire] = useState({});
    const [bookingCount, setBookingCount] = useState(0);
    const [cancelledCount, setCancelledCount] = useState(0);
    const [ongoingCount, setOngoingCount] = useState(0);
    const [doneCount, setDoneCount] = useState(0);
    const [sendNotification, setSendNotification] = useState({});
    const [modalMessage, setModalMessage] = useState(false);
    const accessTokenSms = process.env.REACT_APP_SEMAPHORE_ACCESS_TOKEN;
    const fetchData = async () => {
        try {
            setLoading(true);
            const data = (await axios.get("https://q-zone-api.onrender.com/api/bookings/all-bookings")).data;
            setBookings(data);
            const bookingCount = data.filter(booking => booking.status === 'booked').length;
            const cancelledCount = data.filter(booking => booking.status === 'cancelled').length;
            const ongoingCount = data.filter(booking => booking.status === 'ongoing').length;
            const doneCount = data.filter(booking => booking.status === 'done').length;
            setBookingCount(bookingCount);
            setCancelledCount(cancelledCount);
            setOngoingCount(ongoingCount);
            setDoneCount(doneCount);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const sortByStatus = (a, b) => {
        const statusOrder = ['booked', 'done', 'cancelled'];
        const indexA = statusOrder.indexOf(a.status);
        const indexB = statusOrder.indexOf(b.status);
        if (indexA !== indexB) {
            return indexA - indexB;
        } else {
            const dateA = new Date(a.selectedDate);
            const dateB = new Date(b.selectedDate);
            const timeA = a.selectedTime;
            const timeB = b.selectedTime;
            if (dateA < dateB) return -1;
            if (dateA > dateB) return 1;
            if (timeA < timeB) return -1;
            if (timeA > timeB) return 1;
            return 0;
        }
    };
    const sortedBookings = [...bookings].sort(sortByStatus);

    const handleUpdateDone = async (userNumber, userName, bookingId) => {
        try {
            setLoadingStates(prevStates => ({ ...prevStates, [bookingId]: true }));
            await axios.post("https://q-zone-api.onrender.com/api/bookings/update-done", { bookingId });
            await axios.post('https://q-zone-api.onrender.com/api/bookings/send-message-notify', {
                apikey: accessTokenSms,
                number: `+${userNumber}`,
                message: `[Q-ZONE ONLINE]\n\nHello ${userName}! Your service is done.\n\nThank you for trusting our services`,
            });
            fetchData();
            setLoadingStates(prevStates => ({ ...prevStates, [bookingId]: false }));
        } catch (error) {
            setLoadingStates(prevStates => ({ ...prevStates, [bookingId]: false }));
            console.error("Error updating status:", error.response);
        }
    };

    const handleUpdateOngoing = async (userNumber, userName, bookingId) => {
        try {
            setLoadingStatesBoneFire(prevStates => ({ ...prevStates, [bookingId]: true }));
            await axios.post("https://q-zone-api.onrender.com/api/bookings/update-ongoing", { bookingId });
            await axios.post('https://q-zone-api.onrender.com/api/bookings/send-message-notify', {
                apikey: accessTokenSms,
                number: `+${userNumber}`,
                message: `[Q-ZONE ONLINE]\n\nHello ${userName}! Your service is now ongoing please wait for the process.\n\nThank you!`,
            });
            fetchData();
            setLoadingStatesBoneFire(prevStates => ({ ...prevStates, [bookingId]: false }));
        } catch (error) {
            setLoadingStatesBoneFire(prevStates => ({ ...prevStates, [bookingId]: false }));
            console.error("Error updating status:", error.response);
        }
    }
    const handleUpdateMessage = async (userNumber, userName, bookingId) => {
        try {
            setSendNotification(prevStates => ({ ...prevStates, [bookingId]: true }));
            await axios.post('https://q-zone-api.onrender.com/api/bookings/send-message-notify', {
                apikey: accessTokenSms,
                number: `+${userNumber}`,
                message: `[Q-ZONE ONLINE]\n\nHello ${userName}! You are now able to go from Q-Zone Professional Detailers. Your slot is now available.\n\nThank you!`,
            });
            setModalMessage(true);
            setTimeout(() => {
                setModalMessage(false);
            }, 5000)
            setSendNotification(prevStates => ({ ...prevStates, [bookingId]: false }));
        } catch (error) {
            setSendNotification(prevStates => ({ ...prevStates, [bookingId]: false }));
            console.log(error)
        }
    }
    return (
        <section className="my-6">
            {modalMessage ? <Alert className="fixed top-2 right-2 max-w-xs flex justify-center"><FaRegCheckCircle className="inline mr-2 text-green-500 text-lg" />Message Sent.</Alert> : <></>}
            {loading ? (
                <div role="status" className=" p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                    <div className="flex items-center justify-between pt-4">
                        <div>
                            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                            <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
                        </div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
                    </div>
                </div>
            ) : (
                <div className="relative overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                            <tr>
                                <th colSpan={7} className="px-6 py-3 text-center">
                                    <RiErrorWarningLine className="inline text-base text-gray-700" /> <span className="text-green-500">BOOKED: {bookingCount}</span> | <span className="text-yellow-700">ONGOING: {ongoingCount}</span> | <span className="text-green-500">DONE: {doneCount}</span> | <span className="text-red-500">CANCELLED: {cancelledCount}</span>
                                </th>
                            </tr>
                            <tr className="border-t border-b">
                                <th scope="col" className="px-6 py-3">
                                    NAME:
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    EMAIL:
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    SERVICE:
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    DATE:
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    TIME:
                                </th>
                                <th scope="col" className="px-6 py-3">
                                    STATUS:
                                </th>
                                <th scope="col" className="px-6 py-3 text-center">
                                    ACTION:
                                </th>
                            </tr >

                        </thead >
                        <tbody>
                            {sortedBookings.map((booking) => (
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={booking._id}>
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                        {booking.userName ? booking.userName.toUpperCase() : ''}
                                    </th>
                                    <td className="px-6 py-4">
                                        {booking.userEmail}
                                    </td>
                                    <td className="px-6 py-4">
                                        {booking.service}
                                    </td>
                                    <td className="px-6 py-4">
                                        {moment(booking.selectedDate).format("MMM Do YY")}  {moment(booking.selectedDate).startOf('hour').fromNow()}
                                    </td>
                                    <td className="px-6 py-4">
                                        {booking.selectedTime} {booking.selectedTime.split(":")[0] > 11 ? "PM" : "AM"}
                                    </td>
                                    <td className={`px-6 py-4 ${booking.status === "ongoing" ? "text-yellow-700" : ""} ${booking.status === "booked" || booking.status === "done" ? "text-green-500" : "text-red-500"} `}>
                                        {booking.status.toUpperCase()}
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        {booking.status === "done" || booking.status === "cancelled" ? <></> : <><Button className="mr-2" onClick={() => { handleUpdateDone(booking.userNumber, booking.userName, booking._id) }} disabled={booking.status === "booked" || loadingStates[booking._id] ? true : false}>
                                            {loadingStates[booking._id] ? "Processing..." : "UPDATE DONE"}
                                        </Button><Button className="mr-1" onClick={() => { handleUpdateMessage(booking.userNumber, booking.userName, booking._id) }}>{sendNotification[booking._id] ? "Sending..." : "NOTIFY"}</Button> <Button onClick={() => { handleUpdateOngoing(booking.userNumber, booking.userName, booking._id) }} disabled={booking.status === "ongoing" ? "disabled" : loadingStatesBoneFire[booking._id]}> {loadingStatesBoneFire[booking._id] ? "Processing..." : "ONGOING"}</Button></>}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table >
                </div >
            )}
        </section>
    )
}
export const Services = () => {
    const [loading, setLoading] = useState(false);
    const [loadingCarwash, setLoadingCarwash] = useState(false);
    const [services, setServices] = useState([]);
    const [carwash, setCarwash] = useState([]);
    const [title, setTitle] = useState("");
    const [small, setSmall] = useState(Number);
    const [medium, setMedium] = useState(Number);
    const [large, setLarge] = useState(Number);
    const [x_large, setXLarge] = useState(Number);
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [loadingStates, setLoadingStates] = useState({});
    const [editingServiceId, setEditingServiceId] = useState(null);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [updateForm, setUpdateForm] = useState({
        title: "",
        small: "",
        medium: "",
        large: "",
        x_large: "",
        imageUrl: "",
        description: "",
    });
    const fetchData = async () => {
        try {
            setLoading(true);
            const data = (await axios.get("https://q-zone-api.onrender.com/api/services/auto-detailing")).data;
            setServices(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchDataCarwash = async () => {
        try {
            setLoading(true);
            const data = (await axios.get("https://q-zone-api.onrender.com/api/services/carwash-package")).data;
            setCarwash(data);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDataCarwash();
    }, []);

    const handleDeleteService = async (serviceId) => {
        try {
            setLoadingStates(prevStates => ({ ...prevStates, [serviceId]: true }));
            await axios.post("https://q-zone-api.onrender.com/api/delete-service", { serviceId });
            setLoadingStates(prevStates => ({ ...prevStates, [serviceId]: false }));
            setServices((prevServices) => prevServices.filter((service) => service._id !== serviceId));
            setCarwash((prevServices) => prevServices.filter((service) => service._id !== serviceId));
        } catch (error) {
            setLoadingStates(prevStates => ({ ...prevStates, [serviceId]: false }));
            console.log(error);
        }
    }

    const handleAddService = async (e) => {
        e.preventDefault();
        const service = { title, small, medium, large, x_large, imageUrl, description };
        if (title === "" || small === "" || medium === "" || large === "" || x_large === "" || imageUrl === "" || description === "") {
            setError(true)
            setErrorMessage("Please fill the following fields.")
        } else {
            try {
                setError(false)
                setLoading(true);
                const response = await axios.post("https://q-zone-api.onrender.com/api/add-services", service);
                setServices(prevServices => [...prevServices, response.data]);
                setLoading(false);
                setTitle("");
                setSmall("");
                setMedium("");
                setLarge("");
                setXLarge("");
                setImageUrl("");
                setDescription("");
                window.location.reload();
            } catch (error) {
                setLoading(false);
                console.log(error);
                setError(true);
                setErrorMessage("Something went wrong from the server. Please try again.");

            }
        }
    };
    //!carwash
    const handleAddServiceCarwash = async (e) => {
        e.preventDefault();
        const carwash = { title, small, medium, large, x_large };

        setError(false);
        try {
            setLoadingCarwash(true);
            const response = await axios.post("https://q-zone-api.onrender.com/api/add-services/carwash", carwash);
            setCarwash(prevServices => [...prevServices, response.data]);
            setLoadingCarwash(false);
            setTitle("");
            setSmall("");
            setMedium("");
            setLarge("");
            setXLarge("");
            window.location.reload();
        } catch (error) {
            setLoadingCarwash(false);
            console.log(error);
            setError(true);
            setErrorMessage("Something went wrong from the server. Please try again.");
        }

    };
    const handleUpdateService = async (serviceId) => {
        try {
            setLoadingStates((prevStates) => ({ ...prevStates, [serviceId]: true }));
            const response = await axios.post("https://q-zone-api.onrender.com/api/update-service", {
                serviceId,
                updatedServiceData: updateForm,
            });
            setServices((prevServices) =>
                prevServices.map((service) =>
                    service._id === serviceId ? response.data : service
                )
            );

            setLoadingStates((prevStates) => ({ ...prevStates, [serviceId]: false }));
            setEditingServiceId(null);
            setUpdateForm({
                title: "",
                small: "",
                medium: "",
                large: "",
                x_large: "",
                imageUrl: "",
                description: "",
            });
        } catch (error) {
            setLoadingStates((prevStates) => ({ ...prevStates, [serviceId]: false }));
            console.log(error);
        }
    };

    const handleUpdateServiceCarwash = async (serviceId) => {
        try {
            setLoadingStates((prevStates) => ({ ...prevStates, [serviceId]: true }));
            const response = await axios.post("https://q-zone-api.onrender.com/api/update-service/carwash", {
                serviceId,
                updatedServiceData: updateForm,
            });
            setCarwash((prevServices) =>
                prevServices.map((service) =>
                    service._id === serviceId ? response.data : service
                )
            );

            setLoadingStates((prevStates) => ({ ...prevStates, [serviceId]: false }));
            setEditingServiceId(null);
            setUpdateForm({
                title: "",
                small: "",
                medium: "",
                large: "",
                x_large: "",
            });
        } catch (error) {
            setLoadingStates((prevStates) => ({ ...prevStates, [serviceId]: false }));
            console.log(error);
        }
    };
    return (
        <section >
            <div className="relative overflow-x-auto">
                <h1 className="text-center text-7xl text-white my-6">Auto Detailing</h1>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-2 py-3">
                                SERVICE TITLE
                            </th>
                            <th scope="col" className="px-2 py-3">
                                SMALL
                            </th>
                            <th scope="col" className="px-2 py-3">
                                MEDIUM
                            </th>
                            <th scope="col" className="px-2 py-3">
                                LARGE
                            </th>
                            <th scope="col" className="px-2 py-3">
                                X-LARGE
                            </th>
                            <th scope="col" className="px-2 py-3">IMAGE</th>
                            <th scope="col" className="px-2 py-3">DESCRIPTION</th>
                            <th scope="col" className="px-2 py-3">ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (

                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={service._id}>
                                {editingServiceId === service._id ? (
                                    <>
                                        <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <Input type="text" placeholder="Enter service Name" value={updateForm.title} onChange={(e) => setUpdateForm((prevForm) => ({ ...prevForm, title: e.target.value }))} />
                                        </th>
                                        <td className="px-2 py-4">
                                            <Input type="number" placeholder="Small" value={updateForm.small} onChange={(e) => setUpdateForm((prevForm) => ({ ...prevForm, small: e.target.value }))} />
                                        </td>
                                        <td className="px-2 py-4">
                                            <Input type="number" placeholder="Medium" value={updateForm.medium} onChange={(e) => setUpdateForm((prevForm) => ({ ...prevForm, medium: e.target.value }))} />
                                        </td>
                                        <td className="px-2 py-4">
                                            <Input type="number" placeholder="Large" value={updateForm.large} onChange={(e) => setUpdateForm((prevForm) => ({ ...prevForm, large: e.target.value }))} />
                                        </td>
                                        <td className="px-2 py-4">
                                            <Input type="number" placeholder="Extra Large" value={updateForm.x_large} onChange={(e) => setUpdateForm((prevForm) => ({ ...prevForm, x_large: e.target.value }))} />
                                        </td>
                                        <td className="px-2 py-4">
                                            <Input type="text" placeholder="Image" value={updateForm.imageUrl} onChange={(e) => setUpdateForm((prevForm) => ({ ...prevForm, imageUrl: e.target.value }))} />
                                        </td>
                                        <td className="px-2 py-4">
                                            <Input type="text" placeholder="Description" value={updateForm.description} onChange={(e) => setUpdateForm((prevForm) => ({ ...prevForm, description: e.target.value }))} />
                                        </td>
                                        <td className="px-2 py-4">
                                            <Button className="mr-2" onClick={() => handleUpdateService(service._id)} disabled={loadingStates[service._id]}>
                                                {loadingStates[service._id] ? "Processing..." : "Update"}
                                            </Button>
                                            <Button onClick={() => { setEditingServiceId(null); setUpdateForm({ title: "", small: "", medium: "", large: "", x_large: "", imageUrl: "", description: "" }); }}>
                                                Cancel
                                            </Button>
                                        </td>
                                    </>
                                ) : (
                                    <>
                                        <th scope="row" className="px-2 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {service.title}
                                        </th>
                                        <td className="px-2 py-4">
                                            {service.small}
                                        </td>
                                        <td className="px-2 py-4">
                                            {service.medium}
                                        </td>
                                        <td className="px-2 py-4">
                                            {service.large}
                                        </td>
                                        <td className="px-2 py-4">
                                            {service.x_large}
                                        </td>

                                        <td className="px-2 py-4">
                                            <h1 className="text-ellipsis overflow-hidden whitespace-nowrap w-[100px]">{service.imageUrl}</h1>
                                        </td>
                                        <td className="px-2 py-4">
                                            <h1 className="text-ellipsis overflow-hidden whitespace-nowrap w-[100px]">{service.description}</h1>
                                        </td>
                                        <td className="px-2 py-4">
                                            <Button className="mr-2" onClick={() => setEditingServiceId(service._id)}>
                                                Edit
                                            </Button>
                                            <Button onClick={() => { handleDeleteService(service._id) }} disabled={loadingStates[service._id]}>
                                                {loadingStates[service._id] ? "Processing..." : "Delete"}
                                            </Button>
                                        </td>
                                    </>
                                )}
                            </tr>

                        ))}
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-2 py-4">
                                <Input type="text" placeholder="TITLE" id="title" name="title" onChange={(e) => { setTitle(e.target.value) }} />
                            </td>
                            <td className="px-2 py-4">
                                <Input type="number" placeholder="SMALL" id="small" name="small" onChange={(e) => { setSmall(e.target.value) }} />
                            </td>
                            <td className="px-2 py-4">
                                <Input type="number" placeholder="MEDIUM" id="medium" name="medium" onChange={(e) => { setMedium(e.target.value) }} />
                            </td>
                            <td className="px-2 py-4">
                                <Input type="number" placeholder="LARGE" id="large" name="large" onChange={(e) => { setLarge(e.target.value) }} />
                            </td>
                            <td className="px-2 py-4">
                                <Input type="number" placeholder="X-LARGE" id="x_large" name="x_large" onChange={(e) => { setXLarge(e.target.value) }} />
                            </td>
                            <td className="px-2 py-4">
                                <Input type="text" placeholder="Image" id="image" name="image" onChange={(e) => { setImageUrl(e.target.value) }} />
                            </td>
                            <td className="px-2 py-4">
                                <Input type="text" placeholder="Description" id="description" name="description" onChange={(e) => { setDescription(e.target.value) }} />
                            </td>
                            <td>
                                <Button onClick={handleAddService} disabled={loading}>
                                    {loading ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                        Processing...</> : "Add Services"}
                                </Button>
                                {error ? <h1 className="text-red-500">{errorMessage}</h1> : <></>}
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>
            {/*//! carwash */}
            <br />
            <div className="relative overflow-x-auto">
                <h1 className="text-center text-7xl text-white my-6">Carwash Package</h1>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                SERVICE TITLE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                SMALL
                            </th>
                            <th scope="col" className="px-6 py-3">
                                MEDIUM
                            </th>
                            <th scope="col" className="px-6 py-3">
                                LARGE
                            </th>
                            <th scope="col" className="px-6 py-3">
                                X-LARGE
                            </th>
                            <th>ACTION</th>
                        </tr>
                    </thead>
                    <tbody>
                        {carwash.map((service) => (
                            <>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={service._id}>
                                    {editingServiceId === service._id ? (
                                        <>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                <Input type="text" placeholder="Enter service Name" value={updateForm.title} onChange={(e) => setUpdateForm((prevForm) => ({ ...prevForm, title: e.target.value }))} />
                                            </th>
                                            <td className="px-6 py-4">
                                                <Input type="number" placeholder="Small" value={updateForm.small} onChange={(e) => setUpdateForm((prevForm) => ({ ...prevForm, small: e.target.value }))} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <Input type="number" placeholder="Medium" value={updateForm.medium} onChange={(e) => setUpdateForm((prevForm) => ({ ...prevForm, medium: e.target.value }))} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <Input type="number" placeholder="Large" value={updateForm.large} onChange={(e) => setUpdateForm((prevForm) => ({ ...prevForm, large: e.target.value }))} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <Input type="number" placeholder="Extra Large" value={updateForm.x_large} onChange={(e) => setUpdateForm((prevForm) => ({ ...prevForm, x_large: e.target.value }))} />
                                            </td>
                                            <td className="px-6 py-4">
                                                <Button className="mr-2" onClick={() => handleUpdateServiceCarwash(service._id)} disabled={loadingStates[service._id]}>
                                                    {loadingStates[service._id] ? "Processing..." : "Update"}
                                                </Button>
                                                <Button onClick={() => { setEditingServiceId(null); setUpdateForm({ title: "", small: "", medium: "", large: "", x_large: "" }); }}>
                                                    Cancel
                                                </Button>
                                            </td>
                                        </>
                                    ) : (
                                        <>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {service.title}
                                            </th>
                                            <td className="px-6 py-4">
                                                {service.small}
                                            </td>
                                            <td className="px-6 py-4">
                                                {service.medium}
                                            </td>
                                            <td className="px-6 py-4">
                                                {service.large}
                                            </td>
                                            <td className="px-6 py-4">
                                                {service.x_large}
                                            </td>
                                            <td className="px-6 py-4">
                                                <Button className="mr-2" onClick={() => setEditingServiceId(service._id)}>
                                                    Edit
                                                </Button>
                                                <Button onClick={() => { handleDeleteService(service._id) }} disabled={loadingStates[service._id]}>
                                                    {loadingStates[service._id] ? "Processing..." : "Delete"}
                                                </Button>
                                            </td>
                                        </>
                                    )}
                                </tr>
                            </>
                        ))}
                        <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td className="px-6 py-4">
                                <Input type="text" placeholder="TITLE" id="title" name="title" onChange={(e) => { setTitle(e.target.value) }} />
                            </td>
                            <td className="px-6 py-4">
                                <Input type="number" placeholder="SMALL" id="small" name="small" onChange={(e) => { setSmall(e.target.value) }} />
                            </td>
                            <td className="px-6 py-4">
                                <Input type="number" placeholder="MEDIUM" id="medium" name="medium" onChange={(e) => { setMedium(e.target.value) }} />
                            </td>
                            <td className="px-6 py-4">
                                <Input type="number" placeholder="LARGE" id="large" name="large" onChange={(e) => { setLarge(e.target.value) }} />
                            </td>
                            <td className="px-6 py-4">
                                <Input type="number" placeholder="X-LARGE" id="x_large" name="x_large" onChange={(e) => { setXLarge(e.target.value) }} />
                            </td>
                            <td>
                                <Button onClick={handleAddServiceCarwash} disabled={loading}>
                                    {loadingCarwash ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                        Processing...</> : "Add Services"}
                                </Button>
                            </td>
                        </tr>
                    </tbody>
                </table>

            </div>


        </section>
    )
}
export const Users = () => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = (await axios.get("https://q-zone-api.onrender.com/api/users/all-users")).data;
                setUsers(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    return (
        <section className="my-6">

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID:
                            </th>
                            <th scope="col" className="px-6 py-3">
                                FULL NAME:
                            </th>
                            <th scope="col" className="px-6 py-3">
                                EMAIL:
                            </th>
                            <th scope="col" className="px-6 py-3">
                                TELEPHONE NUMBER:
                            </th>

                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            user.isAdmin ? <></> : <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user._id}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {user._id}
                                </th>
                                <td className="px-6 py-4">
                                    {user.name}
                                </td>
                                <td className="px-6 py-4">
                                    {user.email}
                                </td>
                                <td className="px-6 py-4 text-blue-500">
                                    +{user.tel}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}


export const AuditTrails = () => {
    usePageMetadata('Records', 'This is the description for the Admin page.');
    const { user } = useUser();
    const [print, setPrint] = useState(false);
    const [weeklyIncome, setWeeklyIncome] = useState([]);
    const [userBookings, setUserBookings] = useState([]);
    const printRef = useRef();
    const fetchWeeklyIncome = async () => {
        try {
            const response = await axios.get("https://q-zone-api.onrender.com/api/bookings/all-bookings");
            const bookings = response.data.filter(booking => booking.status === 'done');

            const incomeByWeek = {};
            const bookingsByUser = {};
            bookings.forEach(booking => {
                const weekStartDate = moment(booking.createdAt).startOf('week').format('YYYY-MM-DD');
                if (!incomeByWeek[weekStartDate]) {
                    incomeByWeek[weekStartDate] = 0;
                }
                incomeByWeek[weekStartDate] += booking.vehiclePrice;

                if (!bookingsByUser[booking.user_id]) {
                    bookingsByUser[booking.user_id] = [];
                }
                bookingsByUser[booking.user_id].push({
                    userName: booking.userName,
                    servicePrice: booking.vehiclePrice,
                    service: booking.service,
                    bookingDate: moment(booking.selectedDate).format('YYYY-MM-DD')
                });
            });

            const weeklyIncomeArray = Object.entries(incomeByWeek).map(([weekStartDate, income]) => ({
                weekStartDate,
                income
            }));
            setWeeklyIncome(weeklyIncomeArray);
            setUserBookings(bookingsByUser);
        } catch (error) {
            console.error("Error fetching weekly income:", error);
        }
    };

    useEffect(() => {
        fetchWeeklyIncome();
    }, []);
    const generateReceipt = () => {
        setTimeout(() => {
            setPrint(true);
        }, 2000)
        setTimeout(() => {
            const printContent = document.getElementById("print-element").innerHTML;
            const originalContent = document.body.innerHTML;

            document.body.innerHTML = printContent;

            window.print();
            document.body.innerHTML = originalContent;
        }, 3000)
    }
    return (
        <section>
            <div ref={printRef} id="print-element" className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr className="border-t border-b">
                            <th scope="col" colSpan={1} className="px-6 py-3">
                                Total Weekly Income
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Records
                            </th>
                        </tr >
                        <tr className="border-t border-b">
                            <th scope="col" className="px-6 py-3">
                                NAME:
                            </th>
                            <th scope="col" className="px-6 py-3">
                                BOOKED DATE & SERVICE PRICE
                            </th>
                        </tr >
                    </thead >
                    <tbody>
                        {Object.entries(userBookings).map(([userId, bookings]) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={userId}>
                                <th className="px-6 py-4">{bookings[0].userName}</th>
                                <th className="px-6 py-4">
                                    {bookings.map((booking, index) => (
                                        <p key={index}>
                                            {booking.bookingDate} / Service Price: ₱{booking.servicePrice.toFixed(2)}
                                        </p>
                                    ))}
                                </th>
                            </tr>
                        ))}
                        {weeklyIncome.map(({ weekStartDate, income }) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={weekStartDate}>
                                <td className="px-6 py-4 font-bold text-gray-700">
                                    Weekly start day: {weekStartDate}
                                </td>
                                <td className="px-6 py-4 font-bold text-gray-700">
                                    Total Weekly Income: ₱{income.toFixed(2)}
                                </td>
                            </tr>
                        ))}

                        {print && (<tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                            <td colSpan={3} className="px-6 pt-12 pb-4 font-bold text-gray-700">
                                <span className="block w-[300px] border-t border-gray-500"></span>
                                <h1 className="mt-2">Signature Over Printed Name</h1>
                                <h2 className="mt-2">{user?.data?.name}</h2>
                            </td>
                        </tr>)}

                    </tbody>
                </table >
            </div >
            <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <div colSpan={3} className="px-6 py-4"><Button onClick={generateReceipt}>Print</Button></div>
            </div>
        </section>
    )
}