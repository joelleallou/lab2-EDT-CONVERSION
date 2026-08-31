# Convertisseur d’unités

Application web avec un frontend React + Material UI et une API Node.js/Express. Elle convertit des unités de longueur, volume, masse et température.

## Démarrage

```bash
npm install
npm run dev
```

Ouvrez ensuite `http://localhost:5173`. Le client transmet les requêtes d’API au serveur démarré sur le port `3001`.

## API

- `GET /api/categories` — unités disponibles
- `POST /api/convert` — corps : `{ "category": "length", "from": "foot", "to": "meter", "value": 10 }`
