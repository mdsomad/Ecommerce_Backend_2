const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");


// Register a User
exports.registerUser = catchAsyncErrors(async (req, resp, next) => {

    // const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
    //   folder: "avatars",
    //   width: 150,
    //   crop: "scale",
    // });
  
    const { name, email, password } = req.body;
  
    const user = await User.create({
      name,
      email,
      password,
      avatar: {
        // public_id: myCloud.public_id,
        // url: myCloud.secure_url,
        public_id:"this is a sample public id",
        url: "profileurl",
      },
    });
     
    resp.status(200).json({
        success: true,
        user,
      });
    // sendToken(user, 201, res);
  });
  