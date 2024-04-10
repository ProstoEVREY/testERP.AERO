import express, { Request, Response, NextFunction } from "express";
import bodyParser from "body-parser";
import path from "path";
import cors from "cors";

import { InfoRouter } from "./Routers/InfoRouter";
import { LatencyRouter } from "./Routers/LatencyRouter";
import { FileRouter } from "./Routers/FileRouter";
import { AuthRouter } from "./Routers/AuthRouter";

const app = express();

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/", (req: Request, res: Response) => {
  res.redirect("/info");
});

app.use(express.static(path.join(__dirname, "public")));

app.use(InfoRouter, LatencyRouter, AuthRouter);
app.use("/file", FileRouter);

app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(404).send("404.Sorry can't find that!");
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

export function startServer() {
  try {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  } catch (e) {
    console.error("Could not start server!");
  }
}
