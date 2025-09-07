import app from './app';

const PORT = process.env.SERVER_PORT || 8080;

// Osnovna ruta
app.get("/", (req: any, res: any) => {
	res.send("Ovde nema nista, idi na /api/v1....");
});

// Pokretanje servera
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
