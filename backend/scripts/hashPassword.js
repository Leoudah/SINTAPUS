import bcrypt from "bcryptjs";

const password = "1234567890";

const run = async () => {
  const hash = await bcrypt.hash(password, 10);
  console.log(hash);
};

run();
