import connectDb from "../../utils/connectDb";
import User from "../../models/User";
import jwt from "jsonwebtoken";

connectDb();
export default async (req, res) => {
  console.log("fired");
  if (!("authorization" in req.headers)) {
    return res.status(401).send("No authorization token");
  }

  try {
    const { userId } = jwt.verify(
      req.headers.authorization,
      process.env.JWT_SECRET
    );
    console.log(userId);
    const user = await User.findOne({ _id: userId });
    console.log(user);
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.json(user);
  } catch (error) {
    res.status(403).send("Invalid token");
  }
};
