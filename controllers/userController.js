const ErrorHander = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const User = require("../models/userModel");
const sendToken = require("../utils/jwtToken");


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
    
    sendToken(user, 201, resp);
  
  });





//* Login User
exports.loginUser = catchAsyncErrors(async (req, resp, next) => {
  const { email, password } = req.body;

  //* checking if user has given password and email both

  if (!email || !password) {
    return next(new ErrorHander("Please Enter Email & Password", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHander("Invalid email or password", 401));
  }

  const isPasswordMatched = await user.comparePassword(password);

  if (!isPasswordMatched) {
    return next(new ErrorHander("Invalid email or password", 401));
  }
  


   sendToken(user, 200, resp);
});







//* Logout User
exports.logout = catchAsyncErrors(async (req, resp, next) => {
  resp.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  resp.status(200).json({
    success: true,
    message: "Logged Out",
  });
});
  