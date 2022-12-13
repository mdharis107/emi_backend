const express = require("express");
const { connection } = require("./config/db");

const  bcrypt  = require("bcrypt");
const jwt = require("jsonwebtoken");
const cors = require("cors")
const { emiRouter } = require("./routes/emi.routes");
const { authentication } = require("./middlewares/authentication");
// const { UserModel } = require("./models/user.model");

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 8000;

//HOME PAGE
app.get("/", (req, res) => {
  res.send("The Home Page of the Application");
});

app.use(cors())
//sign up

app.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;

//   console.log(username)

  const isUser = await UserModel.findOne({ email });

  if (isUser) {
    res.send({ "msg": "User already exist try logging in" });
  } else {
    bcrypt.hash(password, 4, async function (err, hash) {
      if (err) {
        res.send({ "msg": "Something went wrong sign Later" });
      }
      try {
        const new_user = new UserModel({
          username,
          email,
          password: hash,
        });
        await new_user.save();
        res.send({ "msg": "Signup Successful" });
      } catch (err) {
        res.send({ "msg": "Sign up not Successful" });
        console.log(err);
      }
    });
  }
});

//login port
app.post("/login",async(req,res)=>{
    const { email,password } = req.body;
    const user = await UserModel.findOne({email})

    const hashed_pass = user.password;
    // console.log(hashed_pass)
    const user_email= email

    bcrypt.compare(password,hashed_pass,function(err,result){
        if(err){
            res.send({"msg":"Something went wrong try again later"})
        }
        if(result){
            const token = jwt.sign({user_email},process.env.PRIVATE_KEY);
            res.send({token:token, msg:"Login Successful"})
        }
        else{
            res.send({"msg":"Login failed"})
        }
    })
})

//Routes
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
