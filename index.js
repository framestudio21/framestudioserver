const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
require('dotenv').config()
app.listen(process.env.PORT);

app.use(express.json());
app.use(cors());

//mongoose database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(function () {
    console.log("connection: " + mongoose.connection.readyState);
  });

// mongoose insert data to database
const Image = require("./model");
app.post("/upload", async (req, res) => {
  const {
    designtype,
    name,
    height,
    width,
    thumbnail,
    text1,
    text2,
    text3,
    imagelink,
    imagelink1,
    imagelink2,
    imagelink3,
    imagelink4,
    imagelink5,
    author,
  } = req.body;
  const img = new Image({
    designtype,
    name,
    height,
    width,
    thumbnail,
    text1,
    text2,
    text3,
    imagelink,
    imagelink1,
    imagelink2,
    imagelink3,
    imagelink4,
    imagelink5,
    author,
  });
  await img
    .save()
    .then(() => res.status(200).json({ success: "success" }))
    .catch((error) => console.log(error));
});

// admin loging and pass

const Admin = require("./admin");
const bcrypt = require("bcryptjs");
app.post("/admin", async (req, res) => {
  let { email, pass } = req.body;
  const isAdmin = await Admin.findOne({ email: email });
  if(!isAdmin) return res.json({status: 400, failed: "Invalid credentials..."})
  bcrypt.compare(pass, isAdmin.pass, async function (err, result) {
    if(result) return res.json({status: 200, success: "Logged in"})
    else return res.json({status: 400, failed: "Invalid credentials..."})
});
});


// feedback router
const Feedback = require("./feedbackmodule");
app.post("/feedback", async (req, res) => {
  const { name, email, text } =
    req.body;
  const feedback = new Feedback({
    name,
    email,
    text,
  });
  feedback
    .save()
    .then(() => res.status(200).json({ success: "success" }))
    .catch((error) => console.log(error));

  const nodemailer = require("nodemailer");
  const sub =
    "Thank You For Your Support."

  const transporter = await nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.USER,
      pass: process.env.PASS,
    },
  });

  await transporter.sendMail({
    from: '"Frame Studio" <info.framestudio21@gmail.com>',
    to: email.toLowerCase() + ", info.framestudio21@gmail.com",
    subject: sub,
    html:
      "<div>Name: <strong>" +
      name +
      "</strong><br>Your Feedback: <strong>" +
      text +
      "</div>",
  },function(err){
    console.log(err)
  })
});


// contact module page
const Contact = require("./contactmodule");
app.post("/contact", async (req, res) => {
  const { name, email, imagereference, subject, designtype, designfor, description } =
    req.body;
  const contact = new Contact({
    name,
    email,
    imagereference,
    subject,
    designtype,
designfor,
    description,
  });
  await contact
    .save()
    .then(() => res.status(200).json({ success: "success" }))
    .catch((error) => console.log(error));

  const nodemailer = require("nodemailer");
  const sub =
    "Thank You For Your Order Of " + designfor

    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      auth: {
        user: process.env.USER,
        pass: process.env.PASS,
      },
    });

  transporter.sendMail({
    from: '"Frame Studio" <info.framestudio21@gmail.com>',
    to: email.toLowerCase() + ", info.framestudio21@gmail.com",
    subject: sub.toUpperCase(),
    html:
      "<p style='text-align:center;font-size:1.3rem;'>New Request</p><br><div>Design Type: <strong>" +
      designtype +
      "</strong><br>Design For: <strong>" +
designfor + 
"</strong><br>Description: <strong>" +
      description +
      "</div>",
  });
});

// advertisement image upload section
const Addvertisement = require("./addmodule");
app.post("/advertisement", async (req, res) => {
  const {
    designtype,
    name,
    thumbnail,
  } = req.body;
  const add = new Addvertisement({
    designtype,
    name,
    thumbnail,
  });
  await add
    .save()
    .then(() => res.status(200).json({ success: "success" }))
    .catch((error) => console.log(error));
});

app.get("/home", (req, res) => {
  Image.find({designtype: ["graphic","website"]})
    .sort({ createdAt: -1 })
    .then((data) => {
      res.json(data);
    });
});

app.get("/graphic", (req, res) => {
  Image.find({ designtype: "graphic" })
    // .pretty()
    .sort({ createdAt: -1 })
    .then((data) => {
      res.json(data);
    });
});

app.get("/website", (req, res) => {
  Image.find({ designtype: "website" })
    .sort({ createdAt: -1 })
    .then((data) => {
      res.json(data);
    });
});

app.get("/digitalart", (req, res) => {
  Image.find({ designtype: "digitalart" })
    .sort({ createdAt: -1 })
    .then((data) => {
      res.json(data);
    });
});

app.get("/aiart", (req, res) => {
  Image.find({ designtype: "aiart" })
    .sort({ createdAt: -1 })
    .then((data) => {
      res.json(data);
    });
});

app.get("/photography", (req, res) => {
  Image.find({ designtype: "photography" })
    .sort({ createdAt: -1 })
    .then((data) => {
      res.json(data);
    });
});

app.get("/:path/:id", (req, res) => {
  const { id } = req.params;
  const { path } = req.params;
  Image.find({ _id: id, designtype: path }).then((data) => {
    res.send(data);
  });
});

app.get("/contact", (req, res) => {
  Contact.find()
    .sort({ createdAt: -1 })
    .then((data) => {
      res.send(data);
    });
});

app.get("/feedback", (req, res) => {
  Feedback.find()
    .sort({ createdAt: -1 })
    .then((data) => {
      res.send(data);
    });
});

app.get("/advertisement", (req, res) => {
  Addvertisement.find()
    .sort({ createdAt: -1 })
    .then((data) => {
      res.send(data);
    });
});

app.get("/feedback", (req, res) => {
  Feedback.find()
    .sort({ createdAt: -1 })
    .then((data) => {
      res.send(data);
    });
});

app.delete("/image/:id", (req, res) => {
  const { id } = req.params;
  Image.findByIdAndDelete({_id:id}).then(()=>res.send({status:'ok'}))
});
app.delete("/adv/:id", (req, res) => {
  const { id } = req.params;
  Addvertisement.findByIdAndDelete({_id:id}).then(()=>res.send({status:'ok'}))
});
module.exports = app
