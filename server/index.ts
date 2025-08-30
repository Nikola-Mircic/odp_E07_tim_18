import express, { Request, Response } from 'express';

const app = express();
const PORT = 80;

// Osnovna ruta
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

// Pokretanje servera
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
