const userSchema = require("../models/userSchema");
const bcrypt = require("bcryptjs");
const salt = 10;
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const path = require("path");
const fs = require("fs");

const userRegister = async (req, resp) => {
  try {
    let user = new userSchema({
      fullName: req.body.fullName,
      email: req.body.email,
      passwordHash: bcrypt.hashSync(req.body.password, salt),
      phone: req.body.phone,
      dob: req.body.dob,
      isAdmin: req.body.isAdmin,
      activeState: req.body.activeState,
    });

    user = await user.save();

    if (!user) {
      return resp.status(400).send("User registration was unsuccessful!");
    }

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "choicematch.hello@gmail.com",
        pass: "iupk lezp eqxe nuvu",
      },
    });

    const htmlFilePath = path.join(__dirname, "../../views/email-template.html");
    const htmlTemplate = fs.readFileSync(htmlFilePath, "utf8");
    const mailOptions = {
      from: '"ChoiceMatch Support" <choicematch.hello@gmail.com>',
      to: req.body.email,
      subject: "Welcome to ChoiceMatch",
      html: htmlTemplate,
    };

    transporter.sendMail(mailOptions, function (error) {
      if (error) {
        console.error("Error sending email:", error);
        return resp.status(500).json({ error: error });
      } else {
        return resp.status(201).json({ message: "User registered successfully and email sent!" });
      }
    });
  } catch (error) {
    console.error("Error registering user:", error);
    return resp.status(500).json({ error: error.message });
  }
};

module.exports = userRegister;

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
    resp.status(200).send({ user: user.email, token: token });
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
