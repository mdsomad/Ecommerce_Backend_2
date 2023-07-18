const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const CartModel = require("../models/cartModel");











//TODO: Create getCartForUser function
exports.getCartForUser = catchAsyncErrors(async (req, resp, next) => {

    const foundCart = await CartModel.findOne({ user: req.user._id }).populate("items.product");

    if(!foundCart) {
        return resp.status(200).json({ success: true, data: [] });
    }

    return resp.status(200).json({ success: true, data: foundCart.items });
}

);










//TODO: Create addToCart function
exports.addToCart = catchAsyncErrors(async (req, resp, next) => {
    console.log(req.user._id);

    const { product, quantity } = req.body;

        const foundCart = await CartModel.findOne({ user: req.user._id});

        //* If cart does not exist
        if(!foundCart) {
            const newCart = new CartModel({ user: req.user._id });
            newCart.items.push({
                product: product,
                quantity: quantity
            });

            await newCart.save();
            return resp.status(200).json({ success: true, data: newCart, message: "Product added to cart" });
        }

        //* Deleting the item if it already exists
        const deletedItem = await CartModel.findOneAndUpdate(
            { user: req.user._id, "items.product": product },
            { $pull: { items: { product: product } } },
            { new: true }
        );


        //* If cart already exists
        const updatedCart = await CartModel.findOneAndUpdate(
            { user: req.user._id },
            { $push: { items: { product: product, quantity: quantity } } },
            { new: true }
        ).populate("items.product");

        return resp.status(200).json({ success: true, data: updatedCart.items, message: "Product added to cart" });
}

);











//TODO: Create removeFromCart function
exports.removeFromCart = catchAsyncErrors(async (req, resp, next) => {

    const { product } = req.body;
    const updatedCart = await CartModel.findOneAndUpdate(
        { user:req.user._id },
        { $pull: { items: { product: product } } },
        { new: true }
    ).populate("items.product");

    return resp.status(200).json({ success: true, data: updatedCart.items, message: "Product removed from cart" });

}

);



