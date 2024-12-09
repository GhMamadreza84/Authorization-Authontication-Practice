const { hash } = require("bcryptjs");

async function HashedPassword(password) {
  const HashedPassword = await hash(password, 12);
  console.log(HashedPassword);
  return HashedPassword;
}

export { HashedPassword };
