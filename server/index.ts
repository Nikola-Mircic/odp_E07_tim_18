import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";

import authRoutes from "./src/Routes/Auth";
import userRoutes from "./src/Routes/User";
import commentRoutes from "./src/Routes/Comments";

dotenv.config();

const app = express();
const PORT = Number(process.env.SERVER_PORT) || 8080;
const HOST = process.env.SERVER_HOST || "192.168.1.6";

app.use(
  cors({
    origin: ["http://localhost:5173", `http://${HOST}:5173`],
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (_req: Request, res: Response) => res.send("OK"));

app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", commentRoutes);

app.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`);
});
