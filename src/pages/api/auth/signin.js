import User from "../../../../models/User";
import { veryfiPassword } from "../../../../utils/auth";
import connectDB from "../../../../utils/connectDB";

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

  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "Invalid Data" });
  }

  const user = await User.findeOne({ email: email });
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
}

export default handler;
