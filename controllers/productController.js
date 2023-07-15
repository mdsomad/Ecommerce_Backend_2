const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");



//* Create Product -- Admin
exports.createProduct = catchAsyncErrors( async (req, resp, next) => {
   const product = await Product.create(req.body);
   resp.status(201).json({
      success: true,
      product,
    });
});



//* Get All Products
exports.getAllProducts = catchAsyncErrors( async(req,resp)=>{


      const resultPerPage = 5;
      const productsCount = await Product.countDocuments();
      
      const apiFeature = new ApiFeatures(Product.find(), req.query).search().filter().pagination(resultPerPage)

      let products = await apiFeature.query;
      resp.status(200).json({
          success: true,
          products,
          productsCount
        });
    }

)



//* Update Product -- Admin
exports.updateProduct = catchAsyncErrors( async (req, resp, next) => {
   let product = await Product.findById(req.params.id);

   if (!product) {
     return next(new ErrorHandler("Product not found", 404));
   }

   product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    });
  
    resp.status(200).json({
      success: true,
      product,
    });
 
});




//TODO: Get Product Details

exports.getProductDetails = catchAsyncErrors(async(req,resp)=>{
   const product = await Product.findById(req.params.id);

   
    if (!product) {
      return next(new ErrorHandler("Product not found", 404));
  }
   
   resp.status(200).json({
      success: true,
      product,
    });
});




//* Delete Product
exports.deleteProduct = catchAsyncErrors(async(req,resp,next)=>{

    
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  //! await product.remove();   //! <-- yah Tarika Kam Nahin Karta hai
   await product.deleteOne();

  resp.status(200).json({
    success: true,
    message: "Product Delete Successfully",
  });
    
 
  }
);

  
