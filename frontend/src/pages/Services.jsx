import React, { useState, useEffect } from "react";
import axios from "axios";
import ServicesCards from "../components/services-cards/ServicesCards";
import PricesCard from "../components/prices-cards/PricesCard";
import CarwashPackage from "../components/carwash/CarwashPackage";
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
                const data = (await axios.get("/api/services/auto-detailing")).data;
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
                const data = (await axios.get("/api/services/carwash-package")).data;
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
                <PricesCard services={services} loading={loading} />
                <br />
                <CarwashPackage className="mt-2" carwash={carwash} loading={loadingCarwash} />
            </> : <></>}

            <ServicesCards />
        </section>
    );
};

export default Services;
