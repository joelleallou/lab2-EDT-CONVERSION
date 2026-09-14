# Convertisseur d’unités

Application web avec un frontend React + Material UI et une API Node.js/Express. Elle convertit des unités de longueur, volume, masse et température.

## Démarrage

```bash
npm install
npm run dev
```

Ouvrez ensuite `http://localhost:5173`. Le client transmet les requêtes d’API au serveur démarré sur le port `3001`.

## Fonctionnalités ajoutées au laboratoire 3

- **Ajout des centimètres** : ajout de l’unité centimètre (`cm`) dans la catégorie des longueurs afin de permettre les conversions depuis et vers les centimètres.

- **Validation du formulaire** : ajout d’une vérification du champ « Valeur à convertir ». Lorsque le champ est vide, la conversion n’est pas effectuée et le message « Veuillez saisir une valeur à convertir. » est affiché.

## API

- `GET /api/categories` — unités disponibles
- `POST /api/convert` — corps : `{ "category": "length", "from": "foot", "to": "meter", "value": 10 }`