import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Button } from "@material-tailwind/react";
import Accordions from "../components/content/Accordions";
// import Map from "../components/content/Map";
import Testimonials from "../components/content/Testimonials";
import ServicesContainer from "../components/content/ServicesContainer";
import { AuthContext } from "../context/AuthContext";
const Home = () => {
  const { user } = useContext(AuthContext);
  return (
    <main>
      {/* hero */}
      <section>
        <div className="my-9 relative flex flex-col-reverse py-16 lg:pt-0 lg:flex-col lg:pb-0">
          <div className=" inset-y-0 top-0 right-0 z-0 w-full max-w-xl px-4 mx-auto md:px-0 lg:pr-0 lg:mb-0 lg:mx-0 lg:w-7/12 lg:max-w-full lg:absolute xl:px-0">
            <svg
              className="absolute left-0 hidden h-full text-white transform -translate-x-1/2 lg:block"
              viewBox="0 0 100 100"
              fill="currentColor"
              preserveAspectRatio="none slice"
            >
              <path d="M50 0H100L50 100H0L50 0Z" />
            </svg>
            <img
              className="object-cover w-full h-56 rounded shadow-lg lg:rounded-none lg:shadow-none md:h-96 lg:h-full"
              src="https://the-riotact.com/wp-content/uploads/2019/01/carwash-service-worker-soaps-glasses-2021-08-26-16-26-42-utc-1200x801.jpg"
              alt=""
            />
          </div>
          <div className="relative flex flex-col items-start w-full max-w-xl px-4 mx-auto md:px-0 lg:px-8 lg:max-w-screen-xl">
            <div className="mb-16 lg:my-40 lg:max-w-lg lg:pr-5">
              <p className="inline-block  py-px mb-4 text-xs font-semibold tracking-wider text-teal-900 uppercase rounded-full bg-teal-accent-400">
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
                {user ? (<Link to="/booking">
                  <Button className="mr-4 py-2">Book Now</Button>
                </Link>) : (<Link to="/register">
                  <Button className="mr-4 py-2">Register Now</Button>
                </Link>)}

                <Link
                  to="/about"
                  aria-label=""
                  className="inline-flex items-center font-semibold text-gray-800 transition-colors duration-200 hover:text-deep-purple-accent-700"
                >
                  Learn more
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* services */}

      {/* map */}
      <ServicesContainer />
      {/* {user ? (<ServicesContainer />) : (<Map />)} */}

      {/* testimonials/feedback */}
      <Testimonials />
      {/* accordion */}
      <Accordions />
    </main>
  );
}

export default Home;
