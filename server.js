const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;

const DATA_FILE = path.join(__dirname, 'data.json');

app.use(cors()); // <- pozwala na dostęp z innego źródła (np. 127.0.0.1:5500)
app.use(express.json());
app.use(express.static('public')); // folder z plikami front-endu (np. index.html)

// Wczytaj dane z pliku
app.get('/load', (req, res) => {
  fs.readFile(DATA_FILE, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Nie udało się wczytać danych' });
    }
    res.json(JSON.parse(data || '{}'));
  });
});

// Zapisz dane do pliku
app.post('/save', (req, res) => {
  fs.writeFile(DATA_FILE, JSON.stringify(req.body, null, 2), (err) => {
    if (err) {
      console.error('Błąd zapisu:', err);
      return res.status(500).json({ error: 'Błąd przy zapisie danych' });
    }
    res.json({ message: 'Dane zostały zapisane pomyślnie!' });
  });
});

// Start serwera
app.listen(PORT, () => {
  console.log(`✅ Serwer działa na http://localhost:${PORT}`);
});
