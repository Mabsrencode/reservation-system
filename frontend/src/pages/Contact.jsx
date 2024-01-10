import React, { useState } from 'react'
import { Input, Button } from '@material-tailwind/react'
import axios from 'axios';
import { Navigate } from 'react-router-dom';
import { useUser } from '../context/userContext';
const Contact = () => {
    const [loading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState(false);
    const [messageStatus, setMessageStatus] = useState('');
    const { user } = useUser();
    if (!user) {
        return <Navigate to="/sign-in" />
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setLoading(true);
            document.body.style.cursor = "wait";
            const response = await axios.post('https://attractive-pink-shrimp.cyclic.app/api/contact/send-email', {
                email,
                subject,
                message,
            });
            setMessageStatus("Your email sent successfully.")
            setLoading(false);
            setErrorMessage(true)
            console.log(response.data);
            document.body.style.cursor = "default";
        } catch (error) {
            setLoading(true);
            setMessageStatus("Something went wrong please try again later");
            console.error('Error sending email:', error.response.data);
            document.body.style.cursor = "default";
            setErrorMessage(true);
        }
    };
    return (
        <>
            <section className="h-5/6  my-12 bg-white dark:bg-gray-900">
                <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                    <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-center text-gray-900 dark:text-white">Contact Us</h2>
                    <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">Got a technical issue? Want to send feedback about a beta feature? Need details about our Service plan? Let us know.</p>
                    <div>
                        <label for="email" className="block my-2 text-xl font-medium text-gray-900 dark:text-gray-300">Your email</label>
                        <Input onChange={(e) => { setEmail(e.target.value) }} type="email" id="email" className="pl-8 shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="name@gmail.com" required />
                    </div>
                    <div>
                        <label for="subject" className="block my-2 text-xl font-medium text-gray-900 dark:text-gray-300">Subject</label>
                        <Input onChange={(e) => { setSubject(e.target.value) }} type="text" id="subject" className="pl-8 block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" placeholder="Let us know how we can help you" required />
                    </div>
                    <div className="sm:col-span-2">
                        <label for="message" className="block my-2 text-xl font-medium text-gray-900 dark:text-gray-400">Your message</label>
                        <textarea onChange={(e) => { setMessage(e.target.value) }} id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Leave a comment..."></textarea>
                    </div>
                    <Button className='mt-2' onClick={handleSubmit} type="submit" disabled={loading} >
                        {loading ? (
                            <>
                                <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                                </svg>
                                Processing...
                            </>
                        ) : "Send Message"}
                    </Button>
                    {errorMessage ? <span className='ml-2 mt-2 text-green-500'>{messageStatus}</span> : <></>}
                </div>
            </section>
        </>
    )
}

export default Contact