require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.API_PORT || 'localhost:2022';
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");

const userRouter = require('./src/routers/users')
const transactionDetailsRouter = require('./src/routers/transactionDetails')
const transactionRouter = require('./src/routers/transaction')
const productsRouter = require('./src/routers/products')
const categoryRouter = require('./src/routers/categories')
const stocksRotuer = require('./src/routers/stocks')

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));
app.use(express.static(path.join(__dirname, "public")));


app.use("/users", userRouter);
app.use("/transactiondetails", transactionDetailsRouter)
app.use("/products", productsRouter)
app.use("/transaction", transactionRouter)
app.use("/categories", categoryRouter )
app.use('/stocks', stocksRotuer)


app.get("/", (req, res) => {
    res.status(200).send("API IS RUNNING woohoo");
  });

  app.use((error, req, res, next) => {
    console.log(error);
    res.status(500).send({
      status: "ERROR",
      message: error.message,
      data: error,
    });
  });
  
  app.listen(port, (err) => {
    if (err) return cosole.log({ err });
  
    console.log(`API IS RUNNING AT PORT ${port}`);
  });