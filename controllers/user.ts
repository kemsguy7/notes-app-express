// controllers/user.ts
import { RequestHandler } from "express";
import User, { IUser } from "../models/user";
import Note from "../models/notes";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/*

const generateToken = (userId: string) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET_KEY || '', {
      expiresIn: "1h", // Token expires in 1 hour
    });
};
*/

const secret: any = process.env.JWT_SECRET_KEY;

export const signup: RequestHandler = async (req, res) => {
  const { fullname, email, gender, phone, address, password }: IUser = req.body;

  //password = req.body.password;

  try {
    //check if user already exists by checking to see if the email exists in our database already
    const existingUser = await User.findOne({ where: { email } });

    if (existingUser) {
      return res.status(400).json({
        status: "failed",
        message: "Email is already in use, try another email",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10); //  salt round (10)

    const newUser = await User.create({
      fullname,
      email,
      gender,
      phone,
      address,
      password: hashedPassword,
    });

    if (!newUser) {
      return res.status(400).json({
        status: "failed",
        message: "Invalid details, account cannot be created",
      });
    }

    return res.status(201).json({
      status: "success",
      message: "Account has been created",
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const login: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "email", "password"],
    });
    // If the user is not found, return an error
    if (!user) {
      return res
        .status(404)
        .json({ status: "failed", message: "User not found" });
    }
    // Compare the provided password with the hashed password in the database, If passwords match, the login is successful
    if (
      user &&
      bcrypt.compareSync(password, user.dataValues.password as string)
    ) {
      const secret: any = process.env.secret;
      // create secret token for authenticated users

      const token = jwt.sign(
        {
          loginkey: user.dataValues.id,
        },
        secret,
        { expiresIn: "1d" }
      );
      return res.status(200).json({ status: "successful", token: token });
    } else {
      // If passwords don't match, return an error
      return res
        .status(401)
        .json({ status: "failed", message: "Invalid password" });
    }
  } catch (error) {
    console.error("Error during login:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Internal server error" });
  }
};

export const findAll: RequestHandler<any, any, any, any> = async (
  req,
  res,
  next
) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ status: "success", users });
  } catch (error) {
    res.status(500).json({ message: "Failed", error });
  }
};

export const findSingle: RequestHandler<any, any, any, any> = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;
    // const user = await User.findByPk(id);
    const user = await User.findByPk(id, {
      include: [{ model: Note }],
    });

    res.status(200).json({ status: "success", user });
  } catch (error) {
    res.status(500).json({ message: "Failed", error });
  }
};

export const updateUser: RequestHandler<any, any, any, any> = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "Use Not Found" });
    }

    await user.update({ ...req.body });
    await user.save();

    res.status(201).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: "Failed", error });
  }
};

export const deleteUser: RequestHandler<any, any, any, any> = async (
  req,
  res,
  next
) => {
  try {
    const id = req.params.id;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ message: "User Not Found" });
    }

    await user.destroy();

    res.status(204).json({ user: user });
  } catch (error) {
    res.status(500).json({ message: "Failed", error });
  }
};
