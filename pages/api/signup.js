import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import Cart from "../../models/Cart";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import isEmail from "validator/lib/isEmail";
import isLength from "validator/lib/isLength";

connectDb();

export default async (req, res) => {
  const { name, email, password } = req.body;

  try {
    if (!isLength(name, { min: 3, max: 25 })) {
      return res.status(422).send("Name must be 3-25 characters");
    } else if (!isLength(password, { min: 6 })) {
      return res
        .status(422)
        .send("Your password must be at least 6 characters long");
    } else if (!isEmail(email)) {
      return res.status(422).send("Email must be vaild");
    }

    let user = await User.findOne({ email });
    if (user) {
      return res.status(422).send("User already exists");
    }
    const hash = await bcrypt.hash(password, 10);
    user = await new User({ name, email, password: hash }).save();
    await new Cart({ user: user._id }).save();
    //create token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d"
    });
    res.status(201).json(token);
  } catch (error) {
    console.log(error);
    res.status(500).send("Error signing up user. Please try again later");
  }
};
