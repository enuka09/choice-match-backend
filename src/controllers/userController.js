const userSchema = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const salt = 10;
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");
const handlebars = require("handlebars");

// user Signup
const userRegister = async (req, resp) => {
  try {
    let user = new userSchema({
      fullName: req.body.fullName,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, salt),
      phone: req.body.phone,
      dob: req.body.dob,
      gender: req.body.gender,
      isAdmin: req.body.isAdmin || false,
      activeState: req.body.activeState || true,
    });

    user = await user.save();

    if (!user) {
      return resp.status(400).send("User registration was unsuccessful!");
    }

    // Setup email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "choicematch.hello@gmail.com",
        pass: "iupk lezp eqxe nuvu",
      },
    });

    const templatePath = path.join(__dirname, "../../views/email-template.hbs");
    const templateSource = fs.readFileSync(templatePath, "utf8");
    const template = handlebars.compile(templateSource);

    const htmlToSend = template({
      name: req.body.fullName,
    });

    const mailOptions = {
      from: '"ChoiceMatch Support" <choicematch.hello@gmail.com>',
      to: req.body.email,
      subject: "Welcome to ChoiceMatch",
      html: htmlToSend,
    };

    transporter
      .sendMail(mailOptions)
      .then(() => {
        console.log("Email sent successfully!");
      })
      .catch(error => {
        console.error("Error sending email:", error);
      });

    resp.status(201).json({ message: "User registered successfully!" });
  } catch (error) {
    console.error("Error registering user:", error);
    resp.status(500).json({ error: error.message });
  }
};

// User Login
const userLogin = async (req, resp) => {
  const user = await userSchema.findOne({ email: req.body.email });
  const secret = process.env.SECRET_KEY;
  if (!user) {
    return resp.status(400).send("User Not Found!");
  }

  if (user && bcrypt.compareSync(req.body.password, user.passwordHash)) {
    const token = jwt.sign(
      {
        userId: user.id,
      },
      secret,
      { expiresIn: "1d" },
    );
    console.log("Generated token:", token); // Check the output of this
    resp.status(200).send({ user: user.email, isAdmin: user.isAdmin, token: token });
  } else {
    resp.status(400).send("Invalid Password!");
  }
};

// Find by Id
// const findUserById = (req, resp) => {
//   userSchema
//     .findOne({ _id: req.params.id })
//     .select("-passwordHash")
//     .then(selectedObj => {
//       if (selectedObj != null) {
//         return resp.status(200).json(selectedObj);
//       }
//       return resp.status(404).json({ message: `User with Id ${req.params.id} Not Found!` });
//     });
// };

const findUserById = async (req, resp) => {
  try {
    const selectedObj = await userSchema.findOne({ _id: req.params.id }).select("-passwordHash");

    if (selectedObj) {
      return resp.status(200).json(selectedObj);
    } else {
      return resp.status(404).json({ message: `User with Id ${req.params.id} Not Found!` });
    }
  } catch (error) {
    console.error("Error finding user by ID:", error);
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Delete User
const deleteUser = async (req, resp) => {
  const deleteData = await userSchema.findByIdAndDelete({ _id: req.params.id });
  if (deleteData) {
    resp.status(204).json({ message: "User Deleted successfully!" });
  } else {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Find all Users
const findAllUsers = (req, resp) => {
  try {
    const { searchText, page = 1, size = 10 } = req.query;
    const pageNumber = parseInt(page);
    const pageSize = parseInt(size);

    const query = {};
    if (searchText) {
      query.$text = { $search: searchText };
    }

    const skip = (pageNumber - 1) * pageSize;

    userSchema
      .find(query)
      .select("-passwordHash")
      .limit(pageSize)
      .skip(skip)
      .then(response => {
        return resp.status(200).json(response);
      });
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

// Find all Users Count
const findUserCount = (req, resp) => {
  try {
    userSchema.countDocuments().then(response => {
      return resp.status(200).json(response);
    });
  } catch (error) {
    return resp.status(500).json({ message: "Internal Server Error" });
  }
};

module.exports = {
  userRegister,
  userLogin,
  findUserById,
  deleteUser,
  findAllUsers,
  findUserCount,
};
