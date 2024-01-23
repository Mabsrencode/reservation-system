import React from 'react'
import usePageMetadata from '../hooks/usePageMetaData'
const About = () => {
    usePageMetadata('About Page', 'This is the description for the About page.');
    return (
        <section className='my-6 sm:my-12'>
            <h1 className='text-3xl mt-20 md:text-7xl font-bold mb-20 text-center'>Welcome to Q-Zone</h1>
            <div className='px-4 sm:px-12 sm:w-1/2 text-justify mx-auto'>
                <p>where passion meets precision in automotive care. With a commitment to excellence, we specialize in professional car detailing and car wash services. Our skilled team combines expertise with state-of-the-art techniques, ensuring your vehicle receives the meticulous care it deserves. At Q-Zone, we redefine automotive aesthetics, providing a tailored experience that exceeds expectations. Trust us to bring out the true brilliance of your vehicle, leaving a lasting impression on every journey.</p>
            </div>

        </section>
    )
}

export default About