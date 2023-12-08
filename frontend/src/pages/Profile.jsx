import React, { useState, useEffect } from "react";
import axios from 'axios';

import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Button,
} from "@material-tailwind/react";
import {
    Square3Stack3DIcon,
    UserCircleIcon,
    Cog6ToothIcon,
} from "@heroicons/react/24/solid";
import { useUser } from '../context/userContext';
const data = [
    {
        label: "Profile",
        value: "profile",
        icon: UserCircleIcon,
    },
    {
        label: "Bookings",
        value: "myBookings",
        icon: Square3Stack3DIcon,
    },
    {
        label: "Settings",
        value: "settings",
        icon: Cog6ToothIcon,
    },
];

const Profile = () => {
    const renderTabContent = (tabValue) => {
        switch (tabValue) {
            case "profile":
                return <MyProfile />;
            case "myBookings":
                return <MyBookingsTab />;
            case "settings":
                return <SettingsTab />;
            default:
                return null;
        }
    };

    return (
        <section className="px-1 my-12 md:px-20">
            <div className=" md:w-6/12 mx-auto">
                <Tabs id="custom-animation" value="profile">
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
            </div>
        </section>
    );
};

export default Profile;

export const MyProfile = () => {
    const { user } = useUser();
    return (<section>
        <div className="bg-white mt-6 overflow-hidden shadow rounded-lg border">
            <div className="px-4 py-5 sm:px-6">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                    User Profile
                </h3>
                <p className="mt-1 max-w-2xl text-sm text-gray-500">
                    This is some information about the user.
                </p>
            </div>
            <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                <dl className="sm:divide-y sm:divide-gray-200">
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Full name
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {user.data.name}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Email address
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            {user.data.email}
                        </dd>
                    </div>
                    <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt className="text-sm font-medium text-gray-500">
                            Phone number
                        </dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            +63 {user.data.tel}
                        </dd>
                    </div>
                    {/* <div class="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                        <dt class="text-sm font-medium text-gray-500">
                            Address
                        </dt>
                        <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                            123 Main St<br />
                            Anytown, USA 12345
                        </dd>
                    </div> */}
                </dl>
            </div>
        </div>
    </section>);
};

export const MyBookingsTab = () => {
    const [loading, setLoading] = useState(false);
    const { user } = useUser();
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = (await axios.post("/api/bookings/booking-id", { user_id: user.data._id })).data;
                setBookings(data);
                setLoading(false);
                console.log(data)
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        fetchData();
    }, [user.data._id]);
    const cancelBooking = async (bookingId, serviceId) => {
        try {
            setLoading(true);
            const result = (await axios.post("/api/bookings/cancel-booking", { bookingId, serviceId })).data;
            console.log(result)
            setLoading(false);
            window.location.reload();
        } catch (error) {
            setLoading(false);
            console.log(error);
        }
    };
    return (<section>
        {bookings && bookings.map((booking) => (
            <div key={booking._id} className="bg-white overflow-hidden shadow rounded-lg border mt-6 mb-6">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Bookings Details
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        This is some information about the your bookings.
                    </p>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="flex py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-orange-500 font-bold">
                                SERVICE
                            </dt>
                            <dd className="mt-1 text-sm text-orange-500 sm:mt-0 sm:col-span-2">
                                {booking.service}
                            </dd>

                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 font-bold">
                                Booking ID
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {booking._id}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 font-bold">
                                Reserved Date
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {booking.selectedDate}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 font-bold">
                                Reserved Time
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {booking.selectedTime}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 font-bold">
                                Transaction ID
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {booking.transactionId}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 font-bold">
                                Price
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {booking.vehiclePrice}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500 font-bold">
                                Status
                            </dt>
                            <dd className="mt-3 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                <h1 className={`border-solid border-2 ${booking.status === "booked" ? "border-green-500 text-green-500" : "border-red-500 text-red-500"} inline p-1`}>  {booking.status === 'booked' ? "CONFIRMED" : "CANCELLED"}</h1>
                            </dd>
                        </div>
                    </dl>
                </div>
                <div className="text-right mx-2 my-2">
                    {booking.status === 'booked' ? <div className="text-right mx-2 my-2">
                        <Button onClick={() => { console.log(booking.serviceId); cancelBooking(booking._id, booking.serviceId) }}>{loading ? "Processing..." : "Cancel Booking"}</Button>
                    </div> : <></>}
                </div>
            </div>
        ))}
    </section>);
};

export const SettingsTab = () => {
    return (<section>Settings Content</section>);
};
