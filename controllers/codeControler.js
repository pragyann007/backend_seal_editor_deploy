import { Code } from "../models/codeModels.js";

import { User } from "../models/userModel.js";

export const createCodes = async (req, res) => {
  try {
    const { title, html, css, js } = req.body;

    if (!title) {
      return res.status(400).json({ message: "No title given..." });
    }

    // 1️⃣ Make sure you have user id from middleware or req.body
    const userId = req.userId; // assuming you set req.user in auth middleware
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // 2️⃣ Create code and attach user
    const create_code = await Code.create({
      title,
      html,
      css,
      js,
      user: userId,
    });

    // 3️⃣ Push the new code _id to user's codes array
    await User.findByIdAndUpdate(userId, { $push: { codes: create_code._id } });

    return res
      .status(201)
      .json({ message: "Code saved successfully", create_code });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error in code", error });
  }
};


// PATCH /save-code/:codeId
export const updateCode = async (req, res) => {
  try {
    const { codeId } = req.params; // get code id from URL
    const { title, html, css, js } = req.body;
    console.log(codeId)

    // Check if the code exists
    const code_exists = await Code.findById(codeId);
    if (!code_exists) {
      return res.status(400).json({ message: "Code doesn't exist." });
    }

    // Update the code
    code_exists.title = title;
    code_exists.html = html;
    code_exists.css = css;
    code_exists.js = js;

    await code_exists.save();

    return res.status(200).json({
      message: "Code updated successfully.",
      updated_code: code_exists,
    });
  } catch (error) {
    console.error("Error updating code:", error);
    return res.status(500).json({ message: "Server error", error });
  }
};




export const getCodeOfUser = async (req, res) => {
  try {
    // req.userId comes from verifyUser middleware
    const userId = req.userId;
    if (!userId) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    // Find codes created by this user
    const users_code = await Code.find({ user: userId }).populate("user", "name email");

    if (!users_code || users_code.length === 0) {
      return res.status(404).json({ message: "No codes found for this user.", codes: [] });
    }

    return res.status(200).json({
      message: "Codes fetched successfully.",
      codes: users_code,
    });

  } catch (error) {
    console.error("❌ Error fetching user codes:", error);
    return res.status(500).json({
      message: "Server error while fetching user codes.",
      error: error.message,
    });
  }
};


export const getOneCode = async (req,res)=>{
    try {
        const codeId = req.params.codeId ; 
    
        const code_exists = await Code.findById(codeId).populate("user","name email");
        if(!code_exists){
            return res.status(400).json({message:"no code exists.."})
        }
        return res.status(200).json({message:"code found",code_exists})
    } catch (error) {

        return res.status(400).json({message:"Error in getting code "},error)
        
    }
}  


export const deleteOneCode = async (req, res) => {
  try {
    const { codeId } = req.params;
    

    if (!codeId) {
      return res.status(400).json({ message: "No code ID provided." });
    }

    // Find and delete the code
    const deletedCode = await Code.findByIdAndDelete(codeId);

    if (!deletedCode) {
      return res.status(404).json({ message: "Code not found." });
    }

    return res.status(200).json({
      message: "Code deleted successfully!",
      code: deletedCode,
    });

  } catch (error) {
    console.error("❌ Error deleting code:", error);
    return res.status(500).json({
      message: "Server error while deleting code.",
      error: error.message,
    });
  }
};
