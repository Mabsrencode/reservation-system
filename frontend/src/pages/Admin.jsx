import React, { useState, useEffect } from "react";
import axios from 'axios';
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Input, Button
} from "@material-tailwind/react";
import { BsTools } from "react-icons/bs";
import {
    BookOpenIcon, UserCircleIcon
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
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
];

const Admin = () => {
    const { user } = useUser();
    const renderTabContent = (tabValue) => {
        switch (tabValue) {
            case "bookings":
                return <Bookings />;
            case "services":
                return <Services />;
            case "users":
                return <Users />;
            default:
                return null;
        }
    };
    return (
        <section className="px-1 my-12 md:px-20">
            {user?.data?.isAdmin ? <div className="mx-auto">
                <Tabs id="custom-animation" value="bookings">
                    <TabsHeader className="bg-orange-500">
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
            </div> : <main className="grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <h1 className="text-5xl font-semibold text-black-600">404</h1>
                    <h1 className="mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">You are not Authorize to enter this page.</h1>
                    <p className="mt-6 text-base leading-7 text-gray-600">Sorry, we couldn't find the page you're looking for.</p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to="/" ><Button>Go back home</Button></Link>
                        <Link to="/contact" className="text-sm font-semibold text-gray-900">Contact support <span aria-hidden="true">&rarr;</span></Link>
                    </div>
                </div>
            </main>}
        </section>
    )
}

export default Admin



export const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = (await axios.get("/api/bookings/all-bookings")).data;
                setBookings(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    return (
        <section>


            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID:
                            </th>
                            <th scope="col" className="px-6 py-3">
                                USER ID:
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
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.map((booking) => (
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={booking._id}>
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                    {booking._id}
                                </th>
                                <td className="px-6 py-4">
                                    {booking.user_id}
                                </td>
                                <td className="px-6 py-4">
                                    {booking.service}
                                </td>
                                <td className="px-6 py-4">
                                    {booking.selectedDate}
                                </td>
                                <td className="px-6 py-4">
                                    {booking.selectedTime}
                                </td>
                                <td className={`px-6 py-4 ${booking.status === "booked" ? "text-green-500" : "text-red-500"} `}>
                                    {booking.status}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

        </section>
    )
}
export const Services = () => {
    const [loading, setLoading] = useState(false);
    const [services, setServices] = useState([]);
    const [title, setTitle] = useState("");
    const [small, setSmall] = useState("");
    const [medium, setMedium] = useState("");
    const [large, setLarge] = useState("");
    const [x_large, setXLarge] = useState("");
    const [loadingStates, setLoadingStates] = useState({});
    const fetchData = async () => {
        try {
            setLoading(true);
            const data = (await axios.get("/api/services")).data;
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

    const handleDeleteService = async (serviceId) => {
        try {
            setLoadingStates(prevStates => ({ ...prevStates, [serviceId]: true })); // Set loading state for this service
            const result = await axios.post("/api/delete-service", { serviceId });
            console.log(result);
            setLoadingStates(prevStates => ({ ...prevStates, [serviceId]: false })); // Reset loading state for this service
            setServices((prevServices) => prevServices.filter((service) => service._id !== serviceId));
        } catch (error) {
            setLoadingStates(prevStates => ({ ...prevStates, [serviceId]: false })); // Reset loading state if there's an error
            console.log(error);
        }
    }

    const handleAddService = async (e) => {
        e.preventDefault();
        try {
            const service = { title, small, medium, large, x_large };
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 3000)
            const response = await axios.post("/api/add-services", service);
            setLoading(false);
            setServices([...services, response.data]);
            setTitle("");
            setSmall("");
            setMedium("");
            setLarge("");
            setXLarge("");
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };

    return (
        <section>
            <div className="relative overflow-x-auto">
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
                        {services.map((service) => (<>
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={service._id}>
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
                                    <Button onClick={() => { handleDeleteService(service._id) }} disabled={loadingStates[service._id]}>
                                        {loadingStates[service._id] ? "Processing..." : "Delete"}
                                    </Button>
                                </td>
                            </tr>
                            <tr key={service._id}>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                        </>))}
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
                                <Button onClick={handleAddService} disabled={loading}>
                                    {loading ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
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
                const data = (await axios.get("/api/users/all-users")).data;
                setUsers(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);
    return (
        <section>

            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                ID:
                            </th>
                            <th scope="col" className="px-6 py-3">
                                USER NAME:
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
                            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={user._id}>
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
                                    +63 {user.tel}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    )
}


