import React from 'react'
import qr from "../../assets/QR.jpg"
import "./qr.css"
const QR = ({open, setOpen}) => {
  const closeModal = () =>{
    setOpen(!open)
}
  return (
    <>
    <div className={`${open ? "block" : "hidden"} fixed top-0 left-0 z-30 w-full h-full  backdrop-blur-md bg-white/30`} onClick={closeModal}></div>
    <div id='payment-method' className={`${open ? "block" : "hidden"} rounded-xl z-30 flex flex-col gap-2 items-center bg-white shadow-xl w-full sm:w-[600px] text-black py-12 px-6`}>
       <img src={qr} alt="" />
    </div>
    </>
  )
}

export default QR