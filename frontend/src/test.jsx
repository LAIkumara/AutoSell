export function getUserData(req, res) {
  if (req.user == null) {
      return res.status(403).json({
          message: "Unauthorized"
      }); 
  }else{
      res.json(req.user);
  }

}

export async function updateUser(req, res) {
  const userId = req.params.userID;
  const updatedData = req.body;

  try{
      await User.updateOne({
          userID: userId
      }, updatedData)
      res.json({
          message: "User data updated successfully",
          user: updatedData
      });
  }catch (error) {
      res.status(500).json({
          message: "Error updating user data",
          error: error.message
      });
  }
}