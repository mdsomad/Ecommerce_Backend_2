const mongoose = require('mongoose');
const colors = require('colors');


const connectDatabase = async () => {

     mongoose.connect(process.env.MONGO_URL, 
        {
          useNewUrlParser: true,
          useUnifiedTopology: true
        }
      )
      .then((data) => {
        console.log(
          `Conneted To Mongodb Databse Successfully... ${data.connection.host}`.bgMagenta.white
        );
      });
      
  
  
  };


  module.exports = connectDatabase;