const express = require('express');
const app = express();
const { spawn } = require('child_process');

let npmStart;

app.post('/___reload', (req, res) => {
  console.log('reaload');
  start();
  res.send('Ok');
});

function start() {
  if (npmStart) {
    npmStart.kill();
  }
  npmStart = spawn('npm', ['run', 'start'], {
    stdio: ['pipe', 'pipe', 'pipe']
  });
  npmStart.stdout.pipe(process.stdout);
  npmStart.stderr.pipe(process.stderr);
}

start();

app.listen(3000, () => console.log('Server started at http://localhost:3000'));