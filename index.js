const express = require('express');
const app = express();
app.get('/', (req, res) => res.send('Hello from CI/CD!'));
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Running on ${PORT}`));