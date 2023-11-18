const express = require("express");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");

const cors = require("cors");

const app = express();
app.use(express.json());
dotenv.config();
app.use(
  cors({
    origin: "*",
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  })
);
const jwt = require("jsonwebtoken");

const prisma = require("./libs/prisma");

let tokenPrin = null;
let userP = null;

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user){
    console.log("user not found");
    return res.status(400).json({ error: "Invalid email or password" });
  }
    

  const validPassword = await bcrypt.compare(password, user.hashedPassword);

  if (!validPassword)
    return res.status(400).json({ error: "Invalid email or password" });

  const uId = user.id;
  const uName = user.name;

  const token = jwt.sign(
    { uId, uName, exp: Date.now() + 60 * 1000 },
    process.env.NEXTAUTH_JWT_SECRET
  );
  tokenPrin = token;
  userP = user;
  res.json({ token, user: user });
});

app.get("/current", (req, res) => {
  if (tokenPrin) return res.status(200).json(userP);
});

app.delete("/logout", (req, res) => {
  tokenPrin = null;
  userP = null;
  res.status(200).json({ message: "Logout successfully" });
});

app.listen(3002, () => {
  console.log("Server is running on port 3002.");
});
