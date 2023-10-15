// import React from 'react'

// const BookingDetails = ({ booking }) => {
//     const handleClick = async () => {
//         try {
//             const response = await fetch(`/api/bookings/${booking._id}`, {
//                 method: 'GET',
//             });

//             if (response.ok) {
//                 console.log('Booking deleted successfully');
//             } else {
//                 // Handle the case where the deletion was not successful, e.g., show an error message.
//                 console.error('Failed to delete the booking');
//             }
//         } catch (error) {
//             console.error('Error occurred while deleting the booking:', error);
//         }
//     }
//     return (
//         <div className="booking-details">
//             {/* <h1>{booking.firstName}</h1>
//       <h1>{booking.lastName}</h1> */}
//             <h3>{booking.email}</h3>
//             <h3>{booking.phoneNumber}</h3>
//             <p>{booking.createdAt}</p>
//             <span className="button" onClick={handleClick}>Delete</span>
//         </div>
//     )
// }

// export default BookingDetails