import React from 'react'
import usePageMetadata from '../hooks/usePageMetaData';
import { Link } from "react-router-dom";
import { Button, Carousel } from "@material-tailwind/react";
import Banner1 from "../assets/banner/banner1.jpg";
import Banner2 from "../assets/banner/banner2.jpg";
import Banner3 from "../assets/banner/banner3.jpg";
import VideoBanner1 from "../assets/video/qzone-banner-vid.mp4";
import "../styles/home.css"
import Accordions from '../components/accordions/Accordions';
import Testimonials from '../components/testimonials/Testimonials';
import Services from '../components/services/Services';
import { useUser } from '../context/userContext';
const Home = () => {
    const { user } = useUser();
    usePageMetadata('Q-Zone Professional Detailers', 'This is the description for the Home page.');
    return (
        <>
            <section className='hero'>
                <div className="my-9 relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
                    <div className=" inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
                        <svg
                            className="absolute z-20 left-0 hidden h-full text-white transform -translate-x-1/2 lg:block "
                            viewBox="0 0 100 100"
                            fill="currentColor "
                            preserveAspectRatio="none slice"
                        >
                            <path d="M50 0H100L50 100H0L50 0Z" />
                        </svg>
                        <Carousel autoplay={true} prevArrow={false} nextArrow={false} loop={true} className='z-10'
                            // className="rounded-xl"
                            navigation={false}
                        >
                            <img
                                src={Banner1}
                                alt=" 1"
                                className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full "
                            />
                            <img
                                src={Banner2}
                                alt=" 2"
                                className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full "
                            />
                            <img
                                src={Banner3}
                                alt=" 3"
                                className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full "
                            />
                        </Carousel>
                    </div>
                    <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
                        <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
                            <p className="inline-block  py-px mb-4 text-xs font-semibold tracking-wider text-orange-500 uppercase rounded-full bg-teal-accent-400">
                                Clean your car now!
                            </p>
                            <h2 className="mb-5 font-sans text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl sm:leading-none">
                                Everything you
                                <br className="hidden md:block" />
                                can imagine{" "}
                                <span className="inline-block text-deep-purple-accent-400">
                                    is real
                                </span>
                            </h2>
                            <p className="pr-5 mb-5 text-base text-gray-700 md:text-lg">
                                Trust us to bring out the true brilliance of your vehicle, leaving a lasting impression on every journey.
                            </p>
                            <div className="flex items-center">
                                {!user?.data?.isAdmin && <>
                                    {user ? (<Link to="/services">
                                        <Button className="mr-4 py-2">Book Now</Button>
                                    </Link>) : (<Link to="/register">
                                        <Button className="mr-4 py-2">Register Now</Button>
                                    </Link>)}

                                    <Link
                                        to="/about"
                                        aria-label=""
                                        className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:underline"
                                    >
                                        Learn more
                                    </Link>
                                </>}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>


            </section>
            <section>
                <Services />
            </section>
            <section>
                <div className='relative'>
                    <video className="w-full h-[300px] sm:h-[750px] object-cover" autoPlay muted loop>
                        <source src={VideoBanner1} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                    <div className='video-banner-container top-20 md:left-24 rounded-lg absolute w-full md:w-1/2 lg:w-1/4 p-4 border-2 border-orange-500'>
                        <h1 className='text-lg sm:text-2xl font-extrabold tracking-tight text-orange-500 uppercase'>Auto Detailing Services</h1>
                        <p className='mt-4 text-xs sm:text-base text-justify text-gray-500'>Q-Zone makes your car detailing experience better for your vehicle and the environment by championing the newest technology and services in the industry.</p>
                        {!user?.data?.isAdmin && <Link to={"/services"}>
                            <Button className='mt-4'>Our Services</Button></Link>}
                    </div>
                </div>
            </section>
            <section>
                <Testimonials />
            </section>
            <section>
                <Accordions />
            </section>
        </>
    )
}

export default Home