import cors from "cors";
import express from "express";
import { convert, getCategories } from "./conversions.js";

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.get("/api/categories", (_request, response) => response.json(getCategories()));

app.post("/api/convert", (request, response) => {
  try {
    const value = Number(request.body.value);
    const conversion = convert({ ...request.body, value });
    response.json(conversion);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

app.listen(port, () => console.log(`API disponible sur http://localhost:${port}`));
