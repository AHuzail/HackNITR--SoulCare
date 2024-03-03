const exp = require("express");
const path = require("path");
const app = exp();
const port = process.env.PORT || 8000;
require("./db/conn"); //connection with db conn.js

const Usr_data = require("./models/register");
const { assert } = require("console");
const static_path = path.join(__dirname, "../src/public");
console.log(static_path);
app.use(exp.static(static_path));
app.set("view engine", "hbs"); //view engine ko aach se likhna
app.use(exp.urlencoded({ extended: false })); //most imp frontend se data ko extract iss se kaare hai
app.get("/", (req, res) => {
  res.render("index");
});
// below for login

// app.post is very important to get data from user
app.get("/login", (req, res) => {
  res.render("login");
});

app.get("/register", (req, res) => {
  //in form tag o fhistorg in action write /register
  // console.log("data got");
  res.render("register");
});

// app.post("/register", async (req, res) => {
//   try {
//     app.render("register", res);
//     //

//     //
//     const data_new = new Usr_data({
//       usr_id: req.body.usr_loggedid,
//       usr_pass: req.body.usr_loggedpass,
//     });

//     const reg = await data_new.save();

//     setTimeout(() => {
//       res.render("user_successreg");
//     }, 1000);
//   } catch (err) {
//     console.log("Error:", err);
//     res.status(500).send("Internal Server Error");
//   }
// });

app.post("/register", async (req, res) => {
  try {
    // Validate if the required fields are present in the request body
    if (!req.body.usr_loggedid || !req.body.usr_loggedpass) {
      return res.status(400).send("Invalid input data");
    }

    // Check if the user already exists with the given usr_id
    const existingUser = await Usr_data.findOne({
      usr_id: req.body.usr_loggedid,
    });

    if (existingUser) {
      // Handle duplicate user case (usr_id already exists)
      return res.status(409).send("User with this usr_id already exists");
    }

    // Create a new user
    const newUser = new Usr_data({
      usr_id: req.body.usr_loggedid,
      usr_pass: req.body.usr_loggedpass,
    });

    // Save the new user to the database
    const reg = await newUser.save();

    // Render the success page after a short delay
    setTimeout(() => {
      res.render("user_successreg");
    }, 1000);
  } catch (err) {
    console.error("Error:", err);

    // Check if the error is a duplicate key error (E11000)
    if (err.code === 11000) {
      return res
        .status(409)
        .send("Duplicate key error. User with this usr_id already exists");
    }

    // Handle other MongoDB errors or internal server errors
    res.status(500).send("Internal Server Error");
  }
});

// app.post("/register", async (req, res) => {
//   try {
//     app.render("register")
//     // console.log(req.body.usr_loggedid);
//     // console.log(req.body.usr_loggedpass);

//     //pushing data into db

//     const data_new = await new Usr_data({
//       usr_id: req.body.usr_loggedid,
//       usr_pass: req.body.usr_loggedpass,
//     });
//     const reg = await data_new.save(); //to save data in db

//     // reg.status(201).render("user_logged")

//     setTimeout(() => {
//       res.render("user_successreg"); //after the reg of user is completed the logged page is shown
//     }, 1000);
//     // res.send(req.body.usr_name)
//   } catch {
//     // res.status(400).send(err)
//     console.log("errorr");
//   }
// });

app.post("/login", async (req, res) => {
  // console.log("okko");
  try {
    // app.render("login")
    const id = req.body.usr_loggedid;
    const pass = req.body.usr_loggedpass;
    const check_resid = await Usr_data.findOne({ usr_id: id });
    if (check_resid.usr_pass === pass) {
      // res.send("true");
      console.log("true");
      res.render("user_successreg");
    } else {
      console.log("invalid user name and password");
      // res.send("");
    }
  } catch {
    console.log("lol");
  }
});

app.listen(port, () => {
  console.log("listening");
});
