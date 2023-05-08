const promises = require('fs/promises');
const path = require('path');

const projectDir = path.join(__dirname, 'project-dist');
const stylesDir = path.join(__dirname, 'styles');

const cssFile = path.join(projectDir, 'bundle.css');

async function buildCssFile(filename){
  const cssData = await promises.readFile(
    path.join(stylesDir, filename), 'utf-8'
  );
  promises.appendFile(cssFile, cssData);
};

async function main(){
  promises.rm(cssFile, { force: true });
  const cssFiles = await promises.readdir(stylesDir, { withFileTypes: true });
  for(let file of cssFiles) {
    let fileext = file['name'].split('.')[1];
    if(! file.isDirectory() && fileext === 'css'){
      await buildCssFile(file['name'])
    }
  }
}

main();
