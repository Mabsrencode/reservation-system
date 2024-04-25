import React, { useState } from 'react'
import StripeCheckout from 'react-stripe-checkout';
import "./openPaymentMethodModal.css"
import gcash from "../../assets/Gcash-logo.png"
import card from "../../assets/card.png"
import QR from '../qr/QR'
const OpenPaymentMethodModal = ({open, setOpen, selectedTime, selectedDate, vehiclePrice, onToken, accessToken, redirect, loading, count}) => {
    const [gcashModalOpen, setGcashModalOpen] = useState(false)
    const closeModal = () =>{
        setOpen(!open)
    }
    const gcashModal = () =>{
        setGcashModalOpen(!gcashModalOpen)
        setOpen(!open)
    }
  return (
    <>
    <div className={`${open ? "block" : "hidden"} fixed top-0 left-0 w-full h-full  z-20 backdrop-blur-md bg-white/30`} onClick={closeModal}></div>
    <div id='payment-method' className={`${open ? "block" : "hidden"} relative rounded-xl z-30 flex flex-col gap-2 items-center bg-white shadow-xl w-full sm:w-[600px] text-black py-12 px-6`}>
        <h1 className='font-bold text-xl'>Choose Payment Method</h1>
        <StripeCheckout
                    disabled={!selectedTime || !selectedDate || !vehiclePrice ? true : false}
                    amount={vehiclePrice * 100 * 0.20}
                    token={onToken}
                    currency='PHP'
                    stripeKey={accessToken}
                >
                    <button className='py-3 px-6 border-2 border-orange-500 shadow-xl rounded-lg'>
                        {redirect ? <span>Redirect in <span className="rounded-full border-2 border-orange-500 px-2 py-1">{count}</span></span> : <>{loading ? <><svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                        </svg>
                            Processing...</> : <img src={card} alt="gcash" className='w-[200px]'  />}</>}
                    </button>
        </StripeCheckout> 
        {/* <button className='py-3 px-6 border-2 border-orange-500 shadow-xl rounded-lg'><img src={card} alt="gcash" className='w-[200px]'  /></button> */}
        <button onClick={gcashModal} className='py-7 px-6 border-2 border-orange-500 shadow-xl rounded-lg'><img src={gcash} alt="gcash" className='w-[200px]'  /></button>
        <button className='close-btn' onClick={closeModal} ><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
</svg></button>

    </div>
    <QR open={gcashModalOpen} setOpen={setGcashModalOpen}/>
    </>
  )
}

export default OpenPaymentMethodModal