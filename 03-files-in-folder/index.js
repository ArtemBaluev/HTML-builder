const fs = require('fs');
const path = require('path');

const { stdout } = process;

const directoryPath = path.join(__dirname, 'secret-folder');

fs.readdir(directoryPath,
  { withFileTypes: true },
  (err, files) => {
    files.forEach(file => {
      if(! file.isDirectory()){
        fs.stat(path.join(directoryPath, file['name']), (err, stats) => {
          let [filename, fileext] = file['name'].split('.');
          let filesize = stats['size'];
          stdout.write(filename + ' - ' + fileext + ' - ' + filesize + '\n');
        });
      }
    })
});
