import { Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

import { prisma } from "../..";
import { comparePassword, hashPassword } from "../Util/PasswordUtils";
import { generateJWT } from "../Util/JWTGeneration";

// Services for the Authentication Routes

export const signup = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.send("Provide id (email of number) or password");
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

      await prisma.token.createMany({
        data: [
          {
            userId: id,
            tokenstr: tokens.accessToken,
          },
          {
            userId: id,
            tokenstr: tokens.refreshToken,
          },
        ],
      });

      return res.send(tokens);
    } else {
      return res.send("User with this username already exists!");
    }
  } catch (e) {
    console.error(e);
  }
};

export const signin = async (req: Request, res: Response) => {
  try {
    const { id, password } = req.body;

    if (!id || !password) {
      return res.send("Provide id (email of number) or password");
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id,
      },
    });

    if (!user) {
      return res.send("No such user found!");
    }

    const passwordCheck = await comparePassword(password, user?.password || "");

    if (passwordCheck) {
      const tokens = generateJWT({ ...user }, "10m");

      await prisma.token.createMany({
        data: [
          {
            userId: id,
            tokenstr: tokens.accessToken,
          },
          {
            userId: id,
            tokenstr: tokens.refreshToken,
          },
        ],
      });

      return res.send(tokens);
    } else {
      return res.send("Password is incorrect!");
    }
  } catch (e) {
    console.error(e);
  }
};

export const getUsers = async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany();
    return res.send(users);
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
      jwt.verify(tokenBody, secret, async (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "Failed to authenticate token. Forbidden" });
        }
        const tokens = generateJWT(
          { id: (decoded as JwtPayload).userId, ...(decoded as {}) },
          "10m",
        );

        await prisma.token.createMany({
          data: [
            {
              userId: (decoded as JwtPayload).userId,
              tokenstr: tokens.accessToken,
            },
            {
              userId: (decoded as JwtPayload).userId,
              tokenstr: tokens.refreshToken,
            },
          ],
        });

        return res.status(200).send(tokens);
      });
    } else {
      return res.status(400).json({ message: "Unsupported token header" });
    }
  } catch (e) {
    console.error(e);
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(400).json({ message: "Provide a token" });
    }

    const secret = process.env.JWT_SECRET_KEY ?? "DEFAULT";

    const tokenBody = token.split(" ")[1];

    jwt.verify(tokenBody, secret, async (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Failed to authenticate token. Forbidden" });
      }

      if (!decoded) {
        return res.status(500).json({ message: "Problem with jwt decoding" });
      }

      const userId = (decoded as JwtPayload).userId;
      const tokens = await prisma.token.findMany({
        where: {
          userId: userId,
        },
      });

      await prisma.token.deleteMany({
        where: {
          userId: userId,
        },
      });

      tokens.forEach(async (token) => {
        await prisma.invalidatedToken.create({
          data: {
            ...token,
          },
        });
      });

      return res.status(200).json({ message: "You successfully logged out" });
    });
  } catch (e) {
    console.error(e);
  }
};
