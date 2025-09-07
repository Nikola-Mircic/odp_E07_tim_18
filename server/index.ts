import express, { Request, Response } from "express";
import dotenv from 'dotenv';


dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 8080;

// Osnovna ruta
app.get('/', (req: any, res: any) => {
  res.send('Hello, World!');
});

// Pokretanje servera
app.listen(8080, "192.168.1.6", () => {
  console.log(`Server is running on http://192.168.1.6:${PORT}`);
});
