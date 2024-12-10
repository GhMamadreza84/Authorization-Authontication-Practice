import { serialize } from "cookie";
import User from "../../../../models/User";
import { veryfiPassword } from "../../../../utils/auth";
import connectDB from "../../../../utils/connectDB";
import { sign } from "jsonwebtoken";
async function handler(req, res) {
  try {
    await connectDB();
  } catch (error) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  const { email, password } = req.body;
  const secretKey = process.env.SECRET_KEY;
  const expiration = 24 * 60 * 60;

  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "Invalid Data" });
  }

  const user = await User.findOne({ email: email });
  if (!user) {
    return res
      .status(404)
      .json({ status: "failed", message: "User doesnt exist!" });
  }

  const isValid = await veryfiPassword(password, user.password);

  if (!isValid) {
    return res
      .status(422)
      .json({ status: "failed", message: "Username or Password is incorrect" });
  }
  const token = sign({ email }, secretKey, { expiresIn: expiration });
  const serialized = serialize("tokene", token, {
    httpOnly: true,
    maxAge: expiration,
    path: "/",
  });
  res
    .status(200)
    .setHeader("Set-Cookie", serialized)
    .json({
      status: "success",
      message: "Logged in!",
      data: { email: user.email },
    });
}

export default handler;
