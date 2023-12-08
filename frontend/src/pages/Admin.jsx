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
                                <td className="px-6 py-4">
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

    const handleAddService = async (e) => {
        e.preventDefault();
        try {
            const service = { title, small, medium, large, x_large };
            setLoading(true);
            setTimeout(() => {
                setLoading(false);
            }, 3000);
            const response = await axios.post("/api/add-services", service);
            setServices([...services, response.data]);
            setTitle("")
            setSmall("")
            setMedium("")
            setLarge("")
            setXLarge("")
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
                        </tr>
                    </thead>
                    <tbody>
                        {services.map((service) => (
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
                            </tr>
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
                        </tr>
                    </tbody>
                </table>
                <Button onClick={handleAddService} disabled={loading}>
                    {loading ? "Processing..." : "Add Services"}
                </Button>
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
                                <td className="px-6 py-4">
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


