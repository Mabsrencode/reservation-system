import React, { useState, useEffect } from "react";
import axios from "axios";
import ServicesCards from "../components/services-cards/ServicesCards";
import PricesCard from "../components/prices-cards/PricesCard";
const Services = () => {
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = (await axios.get("/api/services")).data;
                setServices(data);
                setLoading(false);
                console.log(data)
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="mt-24">
            <PricesCard services={services} loading={loading} />

            <ServicesCards />
        </section>
    );
};

export default Services;
