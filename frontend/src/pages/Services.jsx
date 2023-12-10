import React, { useState, useEffect } from "react";
import axios from "axios";
import ServicesCards from "../components/services-cards/ServicesCards";
import PricesCard from "../components/prices-cards/PricesCard";
import { useUser } from "../context/userContext";
const Services = () => {
    const { user } = useUser()
    const [services, setServices] = useState([]);
    const [loading, setLoading] = useState();
    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const data = (await axios.get("https://q-zone-api.onrender.com/api/services")).data;
                setServices(data);
                setLoading(false);
            } catch (error) {
                setLoading(false);
                console.log(error);
            }
        };

        fetchData();
    }, []);

    return (
        <section className="mt-24">
            {user ? <PricesCard services={services} loading={loading} /> : <></>}

            <ServicesCards />
        </section>
    );
};

export default Services;
