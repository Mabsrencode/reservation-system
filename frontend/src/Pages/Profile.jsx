// import { React, useEffect, useState } from "react";
// import { AuthContext } from "../context/AuthContext";
// const Profile = () => {
//     const [user, setUser] = useState(AuthContext);
//     useEffect(() => {
//         const fetchUser = async () => {
//             const response = await fetch(`http://localhost:4000/users/${user._id}`);
//             const json = await response.json();
//             if (response.ok) {
//                 setUser(json);
//             }
//         };
//         fetchUser();
//     }, []);
//     return (
//         <div className="dashboard">
//             <div className="users">
//                 {/* {users && users.map((user) => (
//                     <li key={user._id}>{user.name}</li>


//                 ))} */}
//                 <h1 key={user}>{user.username}</h1>
//             </div>
//         </div>
//     );
// };

// export default Profile;
