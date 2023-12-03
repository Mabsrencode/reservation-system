import React from 'react'
import { Link } from "react-router-dom";
import { Button, Carousel } from "@material-tailwind/react";
import "../styles/home.css"
import Accordions from '../components/accordions/Accordions';
import Testimonials from '../components/testimonials/Testimonials';
import Services from '../components/services/Services';
const Home = () => {

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
                        {/* <img
                            className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full "
                            src="https://scontent.fmnl8-3.fna.fbcdn.net/v/t39.30808-6/376617703_682357273940870_3389933641310435906_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeFXfNJLtiLrDgZAk6JfytaJNFGdvJiqIQ00UZ28mKohDV5aiSRj1TbAWNE4acflSdPt_D1dwkSq5PdUm26gv6Q7&_nc_ohc=xVGART9kCsoAX_GLt4M&_nc_ht=scontent.fmnl8-3.fna&oh=00_AfCPooOkUJN5iZZxu5Vp4bsp2mvIyzvMqjsEDdP8SsLF_A&oe=656BE82E"
                            alt="banner"
                        /> */}
                        <Carousel autoplay={true} prevArrow={false} nextArrow={false} loop={true} className='z-10'
                            // className="rounded-xl"
                            navigation={false}
                        >
                            <img
                                src="https://scontent.fmnl8-3.fna.fbcdn.net/v/t39.30808-6/376617703_682357273940870_3389933641310435906_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeFXfNJLtiLrDgZAk6JfytaJNFGdvJiqIQ00UZ28mKohDV5aiSRj1TbAWNE4acflSdPt_D1dwkSq5PdUm26gv6Q7&_nc_ohc=xVGART9kCsoAX_GLt4M&_nc_ht=scontent.fmnl8-3.fna&oh=00_AfCPooOkUJN5iZZxu5Vp4bsp2mvIyzvMqjsEDdP8SsLF_A&oe=656BE82E"
                                alt=" 1"
                                className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full "
                            />
                            <img
                                src="https://scontent.fmnl8-3.fna.fbcdn.net/v/t39.30808-6/353751420_636372491872682_453364921932947133_n.jpg?stp=cp6_dst-jpg&_nc_cat=104&ccb=1-7&_nc_sid=dd5e9f&_nc_eui2=AeGNMFsyNKPzaTJVAv2tlSFC59gmM7fX73fn2CYzt9fvd557gmrbYHdwce-xOMoZiKdOv61jZrKyC0bS4-mFrgaY&_nc_ohc=6Vmv17UulqoAX8ikS1S&_nc_ht=scontent.fmnl8-3.fna&oh=00_AfAFEdfOqyKS6RkzG6sK9ttvyF_bAWpsNAZm2PpHjRduVA&oe=656EA87A"
                                alt=" 2"
                                className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full "
                            />
                            <img
                                src="https://scontent.fmnl8-3.fna.fbcdn.net/v/t39.30808-6/341784987_173555755624477_6289078246031432220_n.jpg?stp=cp6_dst-jpg&_nc_cat=101&ccb=1-7&_nc_sid=a73e89&_nc_eui2=AeHWAEd8bW6cHPbt7e5OmvSbljxX2qtq5YSWPFfaq2rlhHQqtPO3eUuxJKiNGyyx2ouVRtvylxv16whIHWJncNjV&_nc_ohc=4HunzQHLW0wAX-ErjzY&_nc_ht=scontent.fmnl8-3.fna&oh=00_AfAa_mIaY8E8n2rFTrB7UDgSBJ3ZSJ4lf_1xpuFSJ0LSww&oe=656E1744"
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
                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                                accusantium doloremque laudantium, totam rem aperiam, eaque ipsa
                                quae. explicabo.
                            </p>
                            <div className="flex items-center">
                                {/* {user ? (<Link to="/booking">
                                <Button className="mr-4 py-2">Book Now</Button>
                            </Link>) : (<Link to="/register">
                                <Button className="mr-4 py-2">Register Now</Button>
                            </Link>)} */}
                                <Link to="/register">
                                    <Button className="mr-4 py-2">Register</Button>
                                </Link>
                                <Link
                                    to="/about"
                                    aria-label=""
                                    className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:underline"
                                >
                                    Learn more
                                </Link>
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
                <Testimonials />
            </section>
            <section>
                <Accordions />
            </section>
        </>
    )
}

export default Home