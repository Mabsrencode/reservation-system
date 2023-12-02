import React from "react";
import "./prices-cards.css";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const PricesCard = ({ services }) => {
    return (
        <div className="table rounded-lg mt-24">
            <table>
                <thead>
                    <tr>
                        <th className="text-orange-500 font-bold">AUTO DETAILING</th>
                        <th>SMALL</th>
                        <th>MEDIUM</th>
                        <th>LARGE</th>
                        <th>X-LARGE</th>
                    </tr>
                </thead>
                <tbody>
                    {services.map((service) => (
                        <tr key={service._id}>
                            <td className="text-gray-700 capitalize font-bold">{service.title}</td>
                            <td className="text-gray-700">{service.small}</td>
                            <td className="text-gray-700">{service.medium}</td>
                            <td className="text-gray-700">{service.large}</td>
                            <td className="text-gray-700">{service.x_large}</td>
                            <td className="book-now-button">
                                <Link to={`book/${service._id}`}>
                                    <Button>Book Now</Button>
                                </Link>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PricesCard;
