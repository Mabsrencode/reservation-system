import React from "react";
import "./prices-cards.css";
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
    Button,
} from "@material-tailwind/react";
import { Link } from "react-router-dom";
import SkeletonPriceCard from "./SkeletonPriceCard";
const PricesCard = ({ services, loading }) => {
    return (
        <section>
            {loading ? <>
                <SkeletonPriceCard />
            </> : <>
                <div className="flex flex-wrap justify-center items-center gap-5 rounded-lg mt-24">
                    {services.map((service) => (
                        <Card className="card mt-6 w-96 mx-4" key={service._id}>
                            <CardHeader color="blue-gray" className="relative h-36 mt-4 image-card">
                                <img
                                    src={service.imageUrl}
                                    alt={service.title}
                                />
                            </CardHeader>
                            <CardBody>
                                <Typography variant="h5" color="white" className="mb-2">
                                    {service.title}
                                </Typography>
                                <div className="card-details">
                                    {service.description}
                                </div>
                            </CardBody>
                            <CardFooter className="pt-0">
                                <Link to={`book/auto-detailing/${service._id}`}>
                                    <Button>Book Now</Button>
                                </Link>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </>
            }
        </section>
    );
};

export default PricesCard;
