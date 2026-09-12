const categories = {
  length: {
    label: "Longueur",
    units: {
      meter: { label: "Mètres", symbol: "m", factor: 1 },
      centimeter: { label: "Centimètres", symbol: "cm", factor: 0.01 },
      kilometer: { label: "Kilomètres", symbol: "km", factor: 1000 },
      foot: { label: "Pieds", symbol: "ft", factor: 0.3048 },
      inch: { label: "Pouces", symbol: "in", factor: 0.0254 },
      mile: { label: "Miles", symbol: "mi", factor: 1609.344 }
    }
  },
  volume: {
    label: "Volume",
    units: {
      liter: { label: "Litres", symbol: "L", factor: 1 },
      milliliter: { label: "Millilitres", symbol: "mL", factor: 0.001 },
      gallon: { label: "Gallons (US)", symbol: "gal", factor: 3.785411784 },
      cup: { label: "Tasses (US)", symbol: "cup", factor: 0.2365882365 }
    }
  },
  weight: {
    label: "Masse",
    units: {
      kilogram: { label: "Kilogrammes", symbol: "kg", factor: 1 },
      gram: { label: "Grammes", symbol: "g", factor: 0.001 },
      pound: { label: "Livres", symbol: "lb", factor: 0.45359237 },
      ounce: { label: "Onces", symbol: "oz", factor: 0.028349523125 }
    }
  },
  temperature: {
    label: "Température",
    units: {
      celsius: { label: "Celsius", symbol: "°C" },
      fahrenheit: { label: "Fahrenheit", symbol: "°F" },
      kelvin: { label: "Kelvin", symbol: "K" }
    }
  }
};

function convertTemperature(value, from, to) {
  let celsius = value;
  if (from === "fahrenheit") celsius = (value - 32) * 5 / 9;
  if (from === "kelvin") celsius = value - 273.15;
  if (to === "fahrenheit") return celsius * 9 / 5 + 32;
  if (to === "kelvin") return celsius + 273.15;
  return celsius;
}

export function getCategories() {
  return Object.entries(categories).map(([id, category]) => ({
    id,
    label: category.label,
    units: Object.entries(category.units).map(([unitId, unit]) => ({ id: unitId, label: unit.label, symbol: unit.symbol }))
  }));
}

export function convert({ category, from, to, value }) {
  const group = categories[category];
  if (!group || !group.units[from] || !group.units[to]) {
    throw new Error("Catégorie ou unité inconnue.");
  }
  if (!Number.isFinite(value)) throw new Error("La valeur doit être un nombre valide.");

  const result = category === "temperature"
    ? convertTemperature(value, from, to)
    : value * group.units[from].factor / group.units[to].factor;

  return { result, from: group.units[from], to: group.units[to] };
}
