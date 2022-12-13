const express = require("express");
const { connection } = require("./config/db");


const cors = require("cors")
const { emiRouter } = require("./routes/emi.routes");
const { authentication } = require("./middlewares/authentication");
const { userRouter } = require("./routes/user.routes");


const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

//HOME PAGE
app.get("/", (req, res) => {
  res.send("The Home Page of the Application");
});

app.use(cors())
//sign up

//user Routes
app.use("/user",userRouter)

//emi Routes
app.use("/emi",authentication,emiRouter)

//Listening port
app.listen(PORT, async () => {
  try {
    await connection;
    console.log("Connection to DB is Successful");
  } catch (err) {
    console.log("Connection to DB has failed");
    console.log(err);
  }
  console.log(`The port is listening on ${PORT}`);
});
