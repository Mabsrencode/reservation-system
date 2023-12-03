import React, { useState, useEffect } from "react";
import axios from "axios";
import ServicesCards from "../components/services-cards/ServicesCards";
import PricesCard from "../components/prices-cards/PricesCard";
const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = (await axios.get("/api/services")).data;
                setServices(data);
                console.log(data)
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="mt-24">
            <PricesCard services={services} />

            <ServicesCards />
        </section>
    );
};

export default Services;
