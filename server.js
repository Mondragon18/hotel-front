const express = requiere('express');
const path = requiere('path');

const app = express();

app.use(express.static('./dist/pruebaultra'));

app.get('/*', (req, res) =>
  res.sendFile('index.html', {root: 'dist/pruebaultra/'})
);

app.listen(process.env.PORT || 8080);