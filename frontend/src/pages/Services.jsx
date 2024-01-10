import React, { useState, useEffect } from "react";
import axios from "axios";
import ServicesCards from "../components/services-cards/ServicesCards";
import PricesCard from "../components/prices-cards/PricesCard";
import CarwashPackage from "../components/carwash/CarwashPackage";
import { Typography } from "@material-tailwind/react";
import { useUser } from "../context/userContext";
const Services = () => {
    const { user } = useUser()
    const [services, setServices] = useState([]);
    const [carwash, setCarwash] = useState([]);
    const [loading, setLoading] = useState();
    const [loadingCarwash, setLoadingCarwash] = useState();
    console.log(carwash)
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = (await axios.get("https://attractive-pink-shrimp.cyclic.app/api/services/auto-detailing")).data;
                setServices(data);
                setTimeout(() => {
                    setLoading(false);
                }, 1000)
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoadingCarwash(true);
                const data = (await axios.get("https://attractive-pink-shrimp.cyclic.app/api/services/carwash-package")).data;
                setCarwash(data);
                setTimeout(() => {
                    setLoadingCarwash(false);
                }, 2000)
            } catch (error) {
                setLoadingCarwash(false);
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="mt-24">
            {user ? <>
                <Typography variant="h1" color="white" className="mb-2 text-center text-7xl  text-orange-500 text-4xl sm:text-7xl">
                    AUTO DETAILING
                </Typography>
                <PricesCard services={services} loading={loading} />
                <br />
                <hr className="mt-12" />
                <br />
                <Typography variant="h1" color="white" className="my-24 text-center text-4xl  text-orange-500 sm:text-7xl my-12">
                    Others
                </Typography>
                <CarwashPackage className="mt-2" carwash={carwash} loading={loadingCarwash} />
            </> : <></>}

            <ServicesCards />
        </section>
    );
};

export default Services;
