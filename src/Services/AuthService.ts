import { Request, Response } from "express";
import jwt from "jsonwebtoken";

import { prisma } from "../..";
import { comparePassword, hashPassword } from "../Util/PasswordUtils";
import { generateJWT } from "../Util/JWTGeneration";

export const signup = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      res.send("Provide id (email of number) or password");
      return;
    }

    const potentialUser = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    const hashedPassword = await hashPassword(password);

    if (!potentialUser) {
      const user = await prisma.user.create({
        data: {
          id: id,
          password: hashedPassword,
        },
      });

      const tokens = generateJWT({ ...user }, "10m");

      res.send(tokens);
    } else {
      res.send("User with this username already exists!");
    }
  } catch (e) {
    console.error(e);
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      res.send("Provide id (email of number) or password");
      return;
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      res.send("No such user found!");
      return;
    }

    const passwordCheck = await comparePassword(password, user?.password || "");

    if (passwordCheck) {
      res.send(generateJWT({ ...user }, "10m"));
    } else {
      res.send("Password is incorrect!");
      return;
    }
  } catch (e) {
    console.error(e);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    res.send(users);
  } catch (e) {
    console.error(e);
  }
};

export const refreshToken = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ message: "Provide a refresh token" });
    }

    const secret = process.env.JWT_SECRET_KEY ?? "DEFAULT";

    const tokenHeader = token.split(" ")[0];
    const tokenBody = token.split(" ")[1];

    if (tokenHeader == "Bearer") {
      return res.status(400).json({ message: "Provide a refresh token!" });
    } else if (tokenHeader == "Refresh") {
      jwt.verify(tokenBody, secret, (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "Failed to authenticate token. Forbidden" });
        }
        return res.status(200).send(generateJWT(decoded, "10m"));
      });
    } else {
      return res.status(400).json({ message: "Unsupported token header" });
    }
  } catch (e) {
    console.error(e);
  }
};
