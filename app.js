const express = require("express");
const morgan = require("morgan");
const app = express();

const errorMiddleware = require("./middleware/error");


app.use(express.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cookieParser());
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));       //* <-- Api hit detail Terminal Mein show karta hai



//* Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");


app.use("/api/v1", product);
app.use("/api/v1", user);

//* Middleware for Errors
app.use(errorMiddleware);





module.exports = app;