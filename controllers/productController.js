const Product = require("../models/productModel");
const ErrorHandler = require("../utils/errorhander");
const catchAsyncErrors = require("../middleware/catchAsyncErrors");
const ApiFeatures = require("../utils/apifeatures");



//* Create Product -- Admin
exports.createProduct = catchAsyncErrors( async (req, resp, next) => {

   req.body.user = req.user.id;
   
   const product = await Product.create(req.body);
   resp.status(201).json({
      success: true,
      product,
    });
});






//! Create Product -- Admin
// exports.createProduct = catchAsyncErrors(async (req, res, next) => {
//   let images = [];

//   if (typeof req.body.images === "string") {
//     images.push(req.body.images);
//   } else {
//     images = req.body.images;
//   }

//   const imagesLinks = [];

//   for (let i = 0; i < images.length; i++) {
//     const result = await cloudinary.v2.uploader.upload(images[i], {
//       folder: "products",
//     });

//     imagesLinks.push({
//       public_id: result.public_id,
//       url: result.secure_url,
//     });
//   }

//   req.body.images = imagesLinks;
//   req.body.user = req.user.id;

//   const product = await Product.create(req.body);

//   res.status(201).json({
//     success: true,
//     product,
//   });
// });






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















//TODO Delete Product
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

















//TODO Create New Review or Update the review
exports.createProductReview = catchAsyncErrors(async (req, res, next) => {
  const { rating, comment, productId } = req.body;

  const review = {
    user: req.user._id,
    name: req.user.name,
    rating: Number(rating),
    comment,
  };

  const product = await Product.findById(productId);

  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );

  if (isReviewed) {
    product.reviews.forEach((rev) => {
      if (rev.user.toString() === req.user._id.toString())
        (rev.rating = rating), (rev.comment = comment);
    });
  } else {
    product.reviews.push(review);
    product.numOfReviews = product.reviews.length;
  }

  let avg = 0;

  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });

  product.ratings = avg / product.reviews.length;

  await product.save({ validateBeforeSave: false });

  res.status(200).json({
    success: true,
  });
});

  





















//TODO Get All Reviews of a product
exports.getProductReviews = catchAsyncErrors(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
});

















//TODO Delete Review
exports.deleteReview = catchAsyncErrors(async (req, res, next) => {
  
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new ErrorHandler("Product not found", 404));
  }

  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );

  let avg = 0;

  reviews.forEach((rev) => {
    avg += rev.rating;
  });

  let ratings = 0;

  if (reviews.length === 0) {
    ratings = 0;
  } else {
    ratings = avg / reviews.length;
  }

  const numOfReviews = reviews.length;

  await Product.findByIdAndUpdate(
    req.query.productId,
    {
      reviews,
      ratings,
      numOfReviews,
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false,
    }
  );

  res.status(200).json({
    success: true,
  });

});