const fs = require('fs');
const path = require('path');

const { stdin, stdout } = process;

let file = path.join(__dirname, 'text.txt');

const output = fs.createWriteStream(file);

stdout.write('Привет! Напиши что-нибудь.\n');

stdin.on('data', chunk => {
  if(chunk.toString().trim() === 'exit') {
    process.exit();
  }
  output.write(chunk);
});

process.on('SIGINT', () => {
  stdout.write('\n');
  process.exit();
});

process.on('exit', () => stdout.write('Пока.\n'));
