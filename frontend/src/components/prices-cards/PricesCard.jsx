import React from "react";
import "./prices-cards.css";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
const PricesCard = ({ services, loading }) => {
    return (
        <div className="table rounded-lg mt-24">
            <table className="max-w-7xl">
                <thead>
                    <tr>
                        <th className="text-orange-500 font-bold">AUTO DETAILING</th>
                        <th>SMALL</th>
                        <th>MEDIUM</th>
                        <th>LARGE</th>
                        <th>X-LARGE</th>
                    </tr>
                </thead>

                {loading ? (<tbody>
                    <tr></tr>
                    <tr role="status" className="max-w-md animate-pulse mt-2" >
                        <td className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></td>
                        <td className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></td>
                        <td className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></td>
                        <td className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></td>
                        <td className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></td>

                    </tr>
                    <tr></tr>
                    <tr role="status" className="max-w-md animate-pulse mt-2" >
                        <td className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></td>
                        <td className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></td>
                        <td className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></td>
                        <td className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></td>
                        <td className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></td>

                    </tr>
                </tbody>) : (<tbody>
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


                )}

            </table>
        </div>
    );
};

export default PricesCard;
