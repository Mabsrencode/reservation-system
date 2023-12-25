import React from 'react'
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    Typography,
} from "@material-tailwind/react";
const SkeletonPriceCard = () => {
    return (
        <div className="flex flex-wrap justify-center items-center gap-5 rounded-lg mt-24">
            <Card className="card mt-6 w-96">
                <CardHeader color="blue-gray" className="relative h-36 mt-4 image-card animate-pulse">

                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="white" className="mb-2">
                        <div className='w-[200px] h-[20px] animate-pulse bg-gray-500 rounded-lg'></div>
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <div className='w-[120px] h-[40px] animate-pulse bg-gray-500 rounded-lg'></div>
                </CardFooter>
            </Card>
            <Card className="card mt-6 w-96">
                <CardHeader color="blue-gray" className="relative h-36 mt-4 image-card animate-pulse">

                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="white" className="mb-2">
                        <div className='w-[200px] h-[20px] animate-pulse bg-gray-500 rounded-lg'></div>
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <div className='w-[120px] h-[35px] animate-pulse bg-gray-500 rounded-lg'></div>
                </CardFooter>
            </Card>
            <Card className="card mt-6 w-96">
                <CardHeader color="blue-gray" className="relative h-36 mt-4 image-card animate-pulse">

                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="white" className="mb-2">
                        <div className='w-[200px] h-[20px] animate-pulse bg-gray-500 rounded-lg'></div>
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <div className='w-[120px] h-[35px] animate-pulse bg-gray-500 rounded-lg'></div>
                </CardFooter>
            </Card>
            <Card className="card mt-6 w-96">
                <CardHeader color="blue-gray" className="relative h-36 mt-4 image-card animate-pulse">

                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="white" className="mb-2">
                        <div className='w-[200px] h-[20px] animate-pulse bg-gray-500 rounded-lg'></div>
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <div className='w-[120px] h-[35px] animate-pulse bg-gray-500 rounded-lg'></div>
                </CardFooter>
            </Card>
            <Card className="card mt-6 w-96">
                <CardHeader color="blue-gray" className="relative h-36 mt-4 image-card animate-pulse">

                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="white" className="mb-2">
                        <div className='w-[200px] h-[20px] animate-pulse bg-gray-500 rounded-lg'></div>
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <div className='w-[120px] h-[35px] animate-pulse bg-gray-500 rounded-lg'></div>
                </CardFooter>
            </Card>
            <Card className="card mt-6 w-96">
                <CardHeader color="blue-gray" className="relative h-36 mt-4 image-card animate-pulse">

                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="white" className="mb-2">
                        <div className='w-[200px] h-[20px] animate-pulse bg-gray-500 rounded-lg'></div>
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <div className='w-[120px] h-[35px] animate-pulse bg-gray-500 rounded-lg'></div>
                </CardFooter>
            </Card>
            <Card className="card mt-6 w-96">
                <CardHeader color="blue-gray" className="relative h-36 mt-4 image-card animate-pulse">

                </CardHeader>
                <CardBody>
                    <Typography variant="h5" color="white" className="mb-2">
                        <div className='w-[200px] h-[20px] animate-pulse bg-gray-500 rounded-lg'></div>
                    </Typography>
                </CardBody>
                <CardFooter className="pt-0">
                    <div className='w-[120px] h-[35px] animate-pulse bg-gray-500 rounded-lg'></div>
                </CardFooter>
            </Card>
        </div>
    )
}
export default SkeletonPriceCard