import { genSalt, hash, compare } from "bcrypt";
import { validateNewUser, validateUser } from "../model/User.js";
import { validateForm, Contact } from "../model/Contact.js";
import { User } from "../model/User.js";
import jwtPkg from "jsonwebtoken";
const { verify } = jwtPkg;

export const register = async (req, res) => {
  const { error } = validateNewUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  // Check For if user already exist
  let checkEmail = await User.findOne({
    email: req.body.email,
  });

  if (checkEmail) {
    return res.status(400).send("Email Id already exists.");
  }

  let user = new User(req.body);

  // generating Hashed Password
  genSalt(10, function (err, salt) {
    hash(user.password, salt, async (err, hashedPassword) => {
      user.password = hashedPassword;
      const result = await user.save();

      if (!result) {
        return res.status(400).send("Account not Created..");
      }
    });
  });

  const token = user.generateToken();

  res
    .header("x-auth-token", token)
    .header("access-control-expose-headers", "x-auth-token")
    .send("Account created Successfully");
};

export const login = async (req, res) => {
  const { error } = validateUser(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send("User not Exist.");

  compare(req.body.password, user.password, function (err, result) {
    if (result !== true) {
      return res.status(400).send("Incorrect Password");
    }

    const token = user.generateToken();

    return res
      .status(200)
      .header("x-auth-token", token)
      .header("access-control-expose-headers", "x-auth-token")
      .send("Logged In Successfully.");
  });
};

export const contact = async (req, res) => {
  console.log(req.body);
  const { error } = validateForm(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  let contact = new Contact(req.body);

  const result = await contact.save();

  if (!result) {
    return res.status(400).send("Try again later...");
  }
  res.status(200).send("Form Submitted..");
};
