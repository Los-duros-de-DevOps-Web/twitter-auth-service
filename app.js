const express = require("express");
const bcrypt = require("bcrypt");

const app = express();
app.use(express.json());

const jwt = require("jsonwebtoken");

const prisma = require("./libs/prisma");

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user)
    return res.status(400).json({ error: "Invalid email or password" });

  const validPassword = await bcrypt.compare(password, user.hashedPassword);
  if (!validPassword)
    return res.status(400).json({ error: "Invalid email or password" });

  const uId = user.id;
  const uName = user.name;

  const token = jwt.sign(
    { uId, uName, exp: Date.now() + 60 * 1000 },
    process.env.NEXTAUTH_JWT_SECRET
  );
  res.json({ token, email: user.email, name: user.name });
});

app.listen(3002, () => {
  console.log("Server is running on port 3002.");
});
