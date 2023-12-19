import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from "react-router-dom";
import {
    Tabs,
    TabsHeader,
    TabsBody,
    Tab,
    TabPanel,
    Button,
    Input
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
                            +{user.data.tel}
                        </dd>
                    </div>
                </dl>
            </div>
        </div>
    </section>);
};

export const MyBookingsTab = () => {
    const { user } = useUser();
    const [bookings, setBookings] = useState([]);
    const [loadingStates, setLoadingStates] = useState({});
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = (await axios.post("/api/bookings/booking-id", { user_id: user.data._id })).data;
                setBookings(data);
                console.log(data)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, [user.data._id]);

    const cancelBooking = async (bookingId, serviceId) => {
        try {
            setLoadingStates(prevStates => ({ ...prevStates, [bookingId]: true }));
            const result = (await axios.post("/api/bookings/cancel-booking", { bookingId, serviceId })).data;
            console.log(result)
            setLoadingStates(prevStates => ({ ...prevStates, [bookingId]: false }));
            setBookings(prevBookings =>
                prevBookings.map(booking =>
                    booking._id === bookingId ? { ...booking, status: 'CANCELLED' } : booking
                )
            );
        } catch (error) {
            setLoadingStates(prevStates => ({ ...prevStates, [bookingId]: false }));
            console.log(error);
        }
    };
    //delete
    const handleDelete = async (bookingId) => {
        try {
            setLoadingStates(prevStates => ({ ...prevStates, [bookingId]: true }));
            const result = await axios.post("/api/bookings/delete-booking", { bookingId });
            console.log(result);
            setBookings((prevBookings) => prevBookings.filter((booking) => booking._id !== bookingId));
        } catch (error) {
            setLoadingStates(prevStates => ({ ...prevStates, [bookingId]: false }));
            console.log(error);
        }
    }
    const generateReceipt = async (bookingId) => {
        try {

        } catch (error) {

        }
    };
    return (<section>
        {bookings.length > 0 ? <>
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
                                    Down Payment
                                </dt>
                                <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    {booking.vehiclePrice * 0.20} <span className="ml-2 border-solid border-2 px-1 border-green-500 text-green-500">PAID</span>
                                </dd>
                            </div>
                            <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                                <dt className="text-sm font-medium text-gray-500 font-bold">
                                    Status
                                </dt>
                                <dd className="mt-3 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                    <h1 className={`border-solid border-2 ${booking.status === "ongoing" ? "border-yellow-700 text-yellow-700" : ""} ${booking.status === "booked" || booking.status === "done" ? "border-green-500 text-green-500" : "border-red-500 text-red-500"} inline p-1`}>  {booking.status.toUpperCase()}</h1>
                                </dd>
                            </div>
                        </dl>
                    </div>
                    <div className="text-right mx-2 my-2">
                        {booking.status === 'booked' ? <div className="text-right mx-2 my-2">
                            <Button onClick={() => { cancelBooking(booking._id, booking.serviceId) }} disabled={loadingStates[booking._id]}>
                                {loadingStates[booking._id] ? (
                                    <>
                                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg>
                                        Processing...
                                    </>
                                ) : "Cancel Booking"}
                            </Button>
                        </div> : <></>}
                    </div>
                    {(booking.status.trim().toLowerCase() === 'cancelled' || booking.status.trim().toUpperCase() === 'CANCELLED') ? (
                        <div className="text-right mx-2 my-2">
                            <Button onClick={() => { handleDelete(booking._id) }}>
                                {loadingStates[booking._id] ? (
                                    <>
                                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                        </svg>
                                        Processing...
                                    </>
                                ) : "Delete"}
                            </Button>
                        </div>
                    ) : <></>}
                    {booking.status === 'done' ? <div className="text-right mx-2 my-2">
                        <Button className="mr-2" onClick={() => { generateReceipt(booking._id, booking.serviceId) }} disabled={loadingStates[booking._id]}>
                            {loadingStates[booking._id] ? (
                                <>
                                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                    </svg>
                                    Processing...
                                </>
                            ) : "GENERATE RECEIPT"}
                        </Button>

                    </div> : <></>}

                </div>
            ))}</> : <> <div className="bg-white overflow-hidden shadow rounded-lg border my-6">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        There is nothing booked.
                    </h3>
                    <p className="mt-1 max-w-2xl text-sm text-gray-500">
                        Try to book something in the <Link to="/services" className="font-bold hover:underline">Services Page.</Link>
                    </p>
                </div>
            </div></>}
    </section>);
};

export const SettingsTab = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [isEditingName, setIsEditingName] = useState(false);
    const [isEditingEmail, setIsEditingEmail] = useState(false);
    const [isEditingNumber, setIsEditingNumber] = useState(false);
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    //name 
    const handleEditName = () => {
        setIsEditingName(true);
    };
    const handleCancelEditName = () => {
        setIsEditingName(false)
    }

    const handleFullNameUpdate = async () => {

    };
    //email
    const handleEditEmail = () => {
        setIsEditingEmail(true)
    }
    const handleCancelEditEmail = () => {
        setIsEditingEmail(false)
    }

    const handleEmailUpdate = async () => {

    };
    //number
    const handleEditNumber = () => {
        setIsEditingNumber(true)
    }
    const handleCancelEditNumber = () => {
        setIsEditingNumber(false)
    }
    const handlePhoneNumberUpdate = () => {

    };
    //password
    const handleEditPassword = () => {
        setIsEditingPassword(true);
    };

    const handleCancelEditPassword = () => {
        setIsEditingPassword(false);

    };

    const handleSavePassword = () => {

        setIsEditingPassword(false);
    };
    return (
        <section>
            <div className="bg-white mt-6 overflow-hidden shadow rounded-lg border">
                <div className="px-4 py-5 sm:px-6">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                        Edit Your Profile here
                    </h3>
                </div>
                <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
                    <dl className="sm:divide-y sm:divide-gray-200">
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Full name
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isEditingName ? <div className="flex gap-2"><Input type="text" id="fullName" name="fullName" placeholder="Full Name" onChange={(e) => { setFullName(e.target.value) }}></Input><Button onClick={handleFullNameUpdate}>SAVE</Button><Button onClick={handleCancelEditName}>CANCEL</Button></div> : <Button onClick={handleEditName} className="float-right">EDIT</Button>}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Email address
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isEditingEmail ? <div className="flex gap-2"><Input type="email" id="email" name="email" placeholder="Email" onChange={(e) => { setEmail(e.target.value) }}></Input><Button onClick={handleEmailUpdate}>SAVE</Button><Button onClick={handleCancelEditEmail}>CANCEL</Button></div> : <Button onClick={handleEditEmail} className="float-right">Edit</Button>}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Mobile Number
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isEditingNumber ? <div className="flex gap-2"><Input type="tel" id="tel" name="tel" placeholder="Telephone Number" onChange={(e) => { setPhoneNumber(e.target.value) }}></Input><Button onClick={handlePhoneNumberUpdate}>SAVE</Button><Button onClick={handleCancelEditNumber}>CANCEL</Button></div> : <Button onClick={handleEditNumber} className="float-right">Edit</Button>}
                            </dd>
                        </div>
                        <div className="py-3 sm:py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                            <dt className="text-sm font-medium text-gray-500">
                                Password
                            </dt>
                            <dd className="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                                {isEditingPassword ? <div className="flex gap-2"><Input type="text" id="password" name="password" placeholder="Password" onChange={(e) => { setPassword(e.target.value) }}></Input><Button onClick={handleSavePassword}>SAVE</Button><Button onClick={handleCancelEditPassword}>CANCEL</Button></div> : <Button onClick={handleEditPassword} className="float-right">Edit Password</Button>}
                            </dd>
                        </div>
                    </dl>
                </div>
            </div>
        </section>
    );
};
