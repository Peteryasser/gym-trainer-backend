const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function updateImports(filePath) {
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const updatedContent = fileContent.replace(/from 'src\//g, (match) => {
    const relativePath = path
      .relative(path.dirname(filePath), path.join(__dirname, 'src'))
      .replace(/\\/g, '/');
    return `from '${relativePath}/`;
  });
  fs.writeFileSync(filePath, updatedContent, 'utf-8');
}

function walkDirectory(directory) {
  const files = fs.readdirSync(directory);
  files.forEach((file) => {
    const fullPath = path.join(directory, file);
    if (fs.statSync(fullPath).isDirectory()) {
      walkDirectory(fullPath);
    } else if (fullPath.endsWith('.ts')) {
      updateImports(fullPath);
    }
  });
}

walkDirectory(directoryPath);
