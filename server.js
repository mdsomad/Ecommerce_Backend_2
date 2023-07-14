const app = require("./app");
const dotenv = require("dotenv");


dotenv.config({path:"config/.env"});

app.listen(process.env.PORT, () => {
    console.log(`Server is working on http://localhost:${process.env.PORT}`);
  });