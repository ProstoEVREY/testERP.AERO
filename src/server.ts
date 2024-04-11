import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";
import cron from "node-cron";
import fileupload from "express-fileupload";

import { InfoRouter } from "./Routers/InfoRouter";
import { LatencyRouter } from "./Routers/LatencyRouter";
import { FileRouter } from "./Routers/FileRouter";
import { AuthRouter } from "./Routers/AuthRouter";

import { NotFoundMiddleware } from "./Middleware/NotFoundMiddleware";
import { AuthMiddleware } from "./Middleware/AuthMiddleware";

import { prisma } from "..";
import { InvalidatedMiddleware } from "./Middleware/InvalidatedMiddleware";

const app = express();

app.use(cors());
app.use(fileupload());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes

app.use(InfoRouter, LatencyRouter, AuthRouter);
app.use("/file", AuthMiddleware, InvalidatedMiddleware, FileRouter);

app.get("/", (req: Request, res: Response) => {
  res.redirect("/info");
});

app.use(express.static(path.join(__dirname, "public")));

app.use(NotFoundMiddleware);

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

export async function startServer() {
  try {
    // Schedule for tokens cleansing
    cron.schedule("0 0 * * *", async () => {
      await prisma.token.deleteMany();
      await prisma.invalidatedToken.deleteMany();
      console.log("Tokens cleaned up successfully");
    });

    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });

    process.on("SIGINT", async () => {
      console.log("Received SIGINT. Gracefully disconnecting Prisma...");
      await prisma.$disconnect();
      process.exit(0);
    });

    process.on("SIGTERM", async () => {
      console.log("Received SIGTERM. Gracefully disconnecting Prisma...");
      await prisma.$disconnect();
      process.exit(0);
    });
  } catch (e) {
    console.error("Could not start server!");
  }
}
