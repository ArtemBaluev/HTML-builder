const fs = require('fs');
const promises = require('fs/promises');
const path = require('path');

const filesDir = path.join(__dirname, 'files');
const filesCopyDir = path.join(__dirname, 'files-copy');


async function copyDir(){
  await promises.rm(filesCopyDir, { recursive:true, force: true});
  promises.mkdir(filesCopyDir, { recursive:true });
  fs.readdir(filesDir, { withFileTypes: true }, (err, files) => {
    files.forEach(file => {
      if(! file.isDirectory()){
        promises.copyFile(
          path.join(filesDir, file['name']),
          path.join(filesCopyDir, file['name'])
        );
      }
    })
  });
}
copyDir();
