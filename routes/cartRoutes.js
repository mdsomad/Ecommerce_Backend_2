const express = require("express");

const { getCartForUser, addToCart, removeFromCart } = require("../controllers/cartController");

const router = express.Router();

const { isAuthenticatedUser, authorizeRoles } = require("../middleware/auth");





router.route("/get/cart").get(isAuthenticatedUser,getCartForUser);
router.route("/add/tocart").post(isAuthenticatedUser,addToCart).delete(isAuthenticatedUser,removeFromCart);

module.exports = router;