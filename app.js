const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const app = express();

const errorMiddleware = require("./middleware/error");


app.use(express.json());
app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));       //* <-- Api hit detail Terminal Mein show karta hai
app.use(fileUpload());
app.use(cors())



//* Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const cart = require("./routes/cartRoutes");


app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", cart);

//* Middleware for Errors
app.use(errorMiddleware);





module.exports = app;