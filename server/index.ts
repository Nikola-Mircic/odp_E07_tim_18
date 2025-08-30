import express from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.SERVER_PORT || 8080;

// Osnovna ruta
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Pokretanje servera
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
