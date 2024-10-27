const express = require('express');
const { Worker } = require('worker_threads');

function setupExpressApp() {
  const app = express();

  // Heavy computation route
  app.get('/compute', async (req, res) => {
    try {
      const result = await runHeavyComputation();
      res.status(200).send(`Result: ${result}`);
    } catch (error) {
      res.status(500).send(`Error: ${error.message}`);
    }
  });

  app.get('/', (req, res) => {
    res.send('Hello world!');
  });

  app.listen(8000, () => {
    console.log(`Worker ${process.pid} is listening on port 8000`);
  });
}

function runHeavyComputation() {
  return new Promise((resolve, reject) => {
    const worker = new Worker('./compute.js');
    worker.on('message', resolve);
    worker.on('error', reject);
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker stopped with exit code ${code}`));
      }
    });
  });
}

module.exports = { setupExpressApp };
