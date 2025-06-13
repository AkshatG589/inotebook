const connectToMongo = require('./db');
connectToMongo();

const express = require('express');
const cors = require('cors'); // ✅ Import cors

const app = express();
const port = 5000;

// ✅ Enable CORS for all origins (or configure it)
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Available routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));
app.use("/api/admin", require("./routes/admin"));
// Test route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start server
app.listen(port, () => {
  console.log(`iNotebook backend listening on port ${port}`);
});