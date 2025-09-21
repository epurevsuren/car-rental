const express = require('express');
const path = require('path');
const jsonServer = require('json-server');

const app = express();
const PORT = process.env.PORT || 5001;

// JSON Server setup
const router = jsonServer.router('db.json');
const middlewares = jsonServer.defaults();
app.use('/api', middlewares, router);

// Serve static files from the Vite build
app.use(express.static(path.join(__dirname, 'dist')));

// Fallback for client-side routing
app.get('*', (req, res) => {
  if (req.originalUrl.startsWith('/api')) {
    res.status(404).json({ error: 'API route not found' });
  } else {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
