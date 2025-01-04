import { verifyToken } from "../../../utils/auth";

async function handler(req, res) {
  if (req.method !== "GET") {
    return;
  }

  const secretKey = process.env.SECRET_KEY;

  const { token } = req.cookies;
  if (!token) {
    return res
      .status(401)
      .json({ status: "failed", message: "You are not logged in" });
  }

  const result = verifyToken(token, secretKey);
  if (result) {
    return res.status(200).json({ status: "success", data: result });
  } else {
    return res
      .status(401)
      .json({ status: "failed", message: "You are unauthorized" });
  }
}

export default handler;
