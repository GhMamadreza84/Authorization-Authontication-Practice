import connectDB from "../../../../utils/connectDB";
import hashPassword, { HashedPassword } from "../../../../utils/auth";
import User from "../../../../models/User";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }
  try {
    await connectDB();
  } catch (err) {
    console.log(err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error in connecting to DB" });
  }

  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(422).json({ status: "failed", message: "Invalid Data" });
  }

  const exitingUser = await User.findOne({ email: email });
  if (exitingUser) {
    return res
      .status(422)
      .json({ status: "failed", message: "User exists already !" });
  }

  const hashPassword = await HashedPassword(password);

  const newUser = await User.create({ email, password: hashPassword });
  console.log(newUser);

  res.status(201).json({ status: "succes", message: "User created" });
}

export default handler;
