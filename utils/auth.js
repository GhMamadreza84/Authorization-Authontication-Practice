import { verify } from "jsonwebtoken";

const { hash, compare } = require("bcryptjs");

async function HashedPassword(password) {
  const HashedPassword = await hash(password, 12);
  console.log(HashedPassword);
  return HashedPassword;
}

async function veryfiPassword(password, hashPassword) {
  const isValid = await compare(password, hashPassword);
  return isValid;
  console.log(isValid);
}

function verifyToken(token, secretKey) {
  try {
    const result = verify(token, secretKey);
    return { email: result.email };
  } catch (error) {
    return false;
  }
}

export { HashedPassword, veryfiPassword, verifyToken };
