import { useEffect, useMemo, useState } from "react";
import {
  Alert, Box, Button, Card, CardContent, CircularProgress, Container, FormControl,
  InputLabel, MenuItem, Paper, Select, Stack, TextField, Typography
} from "@mui/material";

const formatNumber = (number) => new Intl.NumberFormat("fr-CA", { maximumFractionDigits: 8 }).format(number);

export default function App() {
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("length");
  const [from, setFrom] = useState("foot");
  const [to, setTo] = useState("meter");
  const [value, setValue] = useState("1");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/categories")
      .then((response) => response.ok ? response.json() : Promise.reject())
      .then((data) => setCategories(data))
      .catch(() => setError("Impossible de joindre le service de conversion."))
      .finally(() => setLoading(false));
  }, []);

  const category = useMemo(() => categories.find((item) => item.id === categoryId), [categories, categoryId]);
  const units = category?.units ?? [];

  async function handleConvert(event) {
    event.preventDefault();
    setError("");
    const numericValue = Number(value.replace(",", "."));
    if (!Number.isFinite(numericValue)) return setError("Saisissez une valeur numérique valide.");
    try {
      const response = await fetch("/api/convert", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ category: categoryId, from, to, value: numericValue })
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error);
      setResult(data);
    } catch (requestError) { setError(requestError.message || "La conversion a échoué."); }
  }

  function changeCategory(id) {
    const next = categories.find((item) => item.id === id);
    setCategoryId(id); setFrom(next.units[0].id); setTo(next.units[1]?.id ?? next.units[0].id); setResult(null);
  }

  function swapUnits() { setFrom(to); setTo(from); setResult(null); }

  return <Box minHeight="100vh" py={{ xs: 4, sm: 8 }}>
    <Container maxWidth="sm">
      <Stack spacing={3} alignItems="center" textAlign="center" mb={4}>
        <Box sx={{ color: "primary.main", bgcolor: "primary.50", p: 1.5, borderRadius: "50%", lineHeight: 1, fontSize: 30 }}>↔</Box>
        <Box><Typography variant="h3" component="h1">Convertisseur d’unités</Typography><Typography color="text.secondary" mt={1}>Des conversions simples, précises et instantanées.</Typography></Box>
      </Stack>
      <Card elevation={4}>
        <CardContent sx={{ p: { xs: 3, sm: 4 } }}>
          {loading ? <Box textAlign="center" py={5}><CircularProgress /></Box> : <Box component="form" onSubmit={handleConvert}>
            <Stack spacing={3}>
              {error && <Alert severity="error">{error}</Alert>}
              <FormControl fullWidth><InputLabel id="category-label">Type de mesure</InputLabel>
                <Select labelId="category-label" label="Type de mesure" value={categoryId} onChange={(event) => changeCategory(event.target.value)}>
                  {categories.map((item) => <MenuItem key={item.id} value={item.id}>{item.label}</MenuItem>)}
                </Select>
              </FormControl>
              <TextField fullWidth label="Valeur à convertir" value={value} onChange={(event) => { setValue(event.target.value); setResult(null); }} inputMode="decimal" />
              <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} alignItems="center">
                <FormControl fullWidth><InputLabel id="from-label">De</InputLabel><Select labelId="from-label" label="De" value={from} onChange={(event) => { setFrom(event.target.value); setResult(null); }}>{units.map((unit) => <MenuItem key={unit.id} value={unit.id}>{unit.label} ({unit.symbol})</MenuItem>)}</Select></FormControl>
                <Button aria-label="Inverser les unités" color="secondary" onClick={swapUnits} sx={{ minWidth: 48, borderRadius: "50%", p: 1.25, fontSize: 24 }}>⇄</Button>
                <FormControl fullWidth><InputLabel id="to-label">Vers</InputLabel><Select labelId="to-label" label="Vers" value={to} onChange={(event) => { setTo(event.target.value); setResult(null); }}>{units.map((unit) => <MenuItem key={unit.id} value={unit.id}>{unit.label} ({unit.symbol})</MenuItem>)}</Select></FormControl>
              </Stack>
              <Button type="submit" variant="contained" size="large">Convertir</Button>
            </Stack>
          </Box>}
        </CardContent>
      </Card>
      {result && <Paper elevation={0} sx={{ mt: 3, p: 3, textAlign: "center", bgcolor: "secondary.main", color: "secondary.contrastText" }}>
        <Typography variant="body2" sx={{ opacity: 0.85 }}>RÉSULTAT</Typography>
        <Typography variant="h4" fontWeight={700} mt={0.5}>{formatNumber(Number(value.replace(",", ".")))} {result.from.symbol} = {formatNumber(result.result)} {result.to.symbol}</Typography>
      </Paper>}
    </Container>
  </Box>;
}
