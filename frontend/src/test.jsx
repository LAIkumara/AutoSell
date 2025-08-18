const handleProfilePicChange = async (e) => {
  const file = e.target.files[0];
  if (file) {
    // Show loading spinner
    setIsUploading(true);

    // Set the file to the state (temporary, before submission)
    setEditFormData(prev => ({
      ...prev,
      profilePic: file
    }));

    try {
      // Assuming uploadUserProfileFile is a function that uploads the image
      const uploadedProfilePicUrl = await uploadUserProfileFile(file);

      // Now update the profile with the new image URL
      const updatedData = { profilePic: uploadedProfilePicUrl };

      // Here, you can send the updated data to your backend API for saving
      const token = localStorage.getItem("token");
      if (token) {
        await axios.put(
          import.meta.env.VITE_BACKEND_URL + '/api/auth/user/updateUserData/' + userData.userID, 
          updatedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json'
            }
          }
        );

        // Successfully updated profile picture
        toast.success("Profile picture updated successfully!");
      }
    } catch (error) {
      console.error("Error uploading profile picture:", error.message);
      toast.error("Failed to upload profile picture. Please try again.");
    } finally {
      // Hide loading spinner once the process is complete
      setIsUploading(false);
    }
  }
};