const express = require('express');
const next = require('next');
const devcert = require('devcert');
const { createServer } = require('https');

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  const server = express();

  server.get('*', handle);

  if (dev) {
    const { LOCALHOST } = process.env;
    devcert.certificateFor(LOCALHOST, { installCertutil: true }).then(ssl => {
      createServer(ssl, server).listen(port, err => {
        if (err) throw err;
        console.log(`> Ready on https://${LOCALHOST}:${port}`);
      });
    });
  } else {
    server.listen(port, err => {
      if (err) throw err;
      console.log(`> Ready on http://localhost:${port}`);
    });
  }
});
