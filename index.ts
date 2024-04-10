import dotenv from "dotenv";
dotenv.config();

import { PrismaClient } from "@prisma/client";

import { startServer } from "./src/server";

export const prisma = new PrismaClient();

startServer();
