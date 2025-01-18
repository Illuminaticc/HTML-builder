const fs = require('fs').promises;
const path = require('path');

const filesPath = path.join(__dirname, 'styles');

async function createBundle() {
    const bundleFilePath = path.join(__dirname, 'project-dist', 'bundle.css');
    let stylesArr = [];
    
    try {
        const files = await fs.readdir(filesPath, { withFileTypes: true });

        for (const dirent of files) {
            if (dirent.isFile() && path.extname(dirent.name) === '.css') {
                const filePath = path.join(filesPath, dirent.name);
                const content = await fs.readFile(filePath, 'utf-8');
                stylesArr.push(content);
            }
        }
        const data = stylesArr.join('\n');
        await fs.writeFile(bundleFilePath, data);
        console.log('Файл bundle.css успешно создан и записан!');
    } catch (err) {
        console.error('Error:', err);
    }
}

createBundle();