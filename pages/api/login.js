import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectDb();

export default async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(404).send("User doesn'texists");
    }
    const passwordsMatch = await bcrypt.compare(password, user.password);
    if (passwordsMatch) {
      //create token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: "7d"
      });
      res.status(200).json(token);
    } else {
      res.status(401).send("Incorrect Password");
    }
  } catch (error) {
    console.log(error);
    res.status(500).send("Error logging in user");
  }
};
