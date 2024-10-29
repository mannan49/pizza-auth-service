import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Welcom to Auth Service",
  });
});

export default app;
