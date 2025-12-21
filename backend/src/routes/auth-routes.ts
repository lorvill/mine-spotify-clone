import express from "express"
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import { pool } from '../database.js'
import prisma from '../prisma-client.js'

const router = express.Router()

router.post("/login", async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send("Email and password is required")
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  // try {
  //   // const user = prisma.
  // } catch (err) {
  //   return res.status(503)
  // }
})

router.post("/register", async (req, res) => {
  const { email, password } = req.body
  if (!email || !password) {
    return res.status(400).send("Email and password is required")
  }

  const hashedPassword = bcrypt.hashSync(password, 12);

  try {
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
      }
    })


  } catch (err) {

  }
})

export default router
