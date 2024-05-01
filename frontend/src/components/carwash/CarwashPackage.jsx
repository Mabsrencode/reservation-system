import React from "react";
import { Button } from "@material-tailwind/react";
import { Link } from "react-router-dom";
import "./carwash.css"
const CarwashPackage = ({ carwash, loading }) => {
    return (
        <div className="table rounded-lg mt-24 p-2 sm:px-10 py-8">
            <table className="max-w-7xl">
                <thead>
                    <tr>
                        <th className="text-orange-500 font-bold pr-2">CAR WASH PACKAGE</th>
                        <th className="pr-2 hidden sm:table-cell">SMALL</th>
                        <th className="pr-2 hidden sm:table-cell">MEDIUM</th>
                        <th className="pr-2 hidden sm:table-cell">LARGE</th>
                        <th className="pr-2 hidden sm:table-cell">XLARGE</th>
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
                    {carwash.map((wash) => (
                        <tr key={wash._id}>
                            <td className="text-gray-700 capitalize font-bold whitespace-nowrap pr-6">{wash.title}</td>
                            <td className="text-gray-700 hidden sm:table-cell">{wash.small}</td>
                            <td className="text-gray-700 hidden sm:table-cell">{wash.medium}</td>
                            <td className="text-gray-700 hidden sm:table-cell">{wash.large}</td>
                            <td className="text-gray-700 hidden sm:table-cell">{wash.x_large}</td>
                            <td className="book-now-button">
                                <Link to={`book/carwash/${wash._id}`}>
                                    <Button className="carwash-book-btn whitespace-nowrap">Book Now</Button>
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

export default CarwashPackage;