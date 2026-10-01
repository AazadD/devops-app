const express = require('express');
const app = express();
const port = process.env.PORT || 8080;
const env = process.env.ENVIRONMENT || 'development';

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy', environment: env, timestamp: new Date().toISOString() });
});

app.get('/metrics', (req, res) => {
  res.set('Content-Type', 'text/plain');
  res.send(`# HELP http_requests_total Total number of HTTP requests\n# TYPE http_requests_total counter\nhttp_requests_total{handler="/"} 1\n`);
});

app.get('/', (req, res) => {
  console.log(`[${new Date().toISOString()}] Request received in ${env}`);
  res.send(`<h1>Enterprise GitOps Microservice</h1><p>Environment: <b>${env}</b></p>`);
});

app.listen(port, () => {
  console.log(`Application running on port ${port} in ${env} mode`);
});
// Production deployment build
