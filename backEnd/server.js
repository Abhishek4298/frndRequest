const express = require("express");
const cors = require("cors");
const app = express();
const router = require("./routes/index");
const dbConnect = require('./dbConnection')
require("dotenv").config();
const port = process.env.PORT || 3000;

// connection with database
dbConnect();

app.use(cors());
app.use(express.json());
// router
app.use("/", router);

app.listen(port, () => {
  console.log(`app listening at http://localhost:${port}`);
});
