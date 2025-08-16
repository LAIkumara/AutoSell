import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import UploadUserProfileFile from "../../utils/userProfileImages";


export default function UserDetailsUpdatePopup() {

    const Navigate = useNavigate();
    const location = useLocation();
    const [userID, setUserId] = useState(location.state.userID)
    const [userName, setUserName] = useState(location.state.userName);
    const [userEmail, setUserEmail] = useState(location.state.email);
    const [userPhone, setUserPhone] = useState(location.state.phone);
    const [userAddress, setUserAddress] = useState(location.state.address);
    const [profilePic, setProfilePic] = useState(location.state.profilePic);

    async function handleUpdate() {
        const img = UploadUserProfileFile(profilePic);

        const updatedData = {
            userID: userID,
            userName: userName,
            email: userEmail,
            phone: userPhone,
            address: userAddress,
            profilePic: img
        };

        const token = localStorage.getItem("token");
        if (!token) {
            alert("You are not logged in. Please log in to update your profile.");
            Navigate('/singIn');
            return;
        }

        axios.put(import.meta.env.VITE_BACKEND_URL + '/api/auth/user/updateUserData/'+ userID, updatedData, {
            headers: {
                Authorization: "Bearer " + token
            }
        }).then((response) => {
            console.log("User details updated successfully:", response.data);
            toast.success("User details updated successfully");
            Navigate('/user/userProfile');
        }).catch((error) => {
            console.error("Error updating user details:", error);
            toast.error("Failed to update user details. Please try again.");
        })
    }


    return(
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
                <h2 className="text-2xl font-semibold mb-4">Update User Detailsss</h2>
                
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">User Name</label>
                    <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                {/* <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <input
                        type="email"
                        value={userEmail}
                        onChange={(e) => setUserEmail(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div> */}
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <input
                        type="text"
                        value={userPhone}
                        onChange={(e) => setUserPhone(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Address</label>
                    <input
                        type="text"
                        value={userAddress}
                        onChange={(e) => setUserAddress(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">Profile Picture URL</label>
                    <input
                        type="text"
                        value={profilePic}
                        onChange={(e) => setProfilePic(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                </div>
                <div className="flex justify-end space-x-2">
                    <button
                        onClick={() => Navigate('/user/userProfile')}
                        className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleUpdate}
                        className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 transition-colors"
                    >
                        Update
                    </button>
                </div>
            </div>
        </div> 
		)
	}