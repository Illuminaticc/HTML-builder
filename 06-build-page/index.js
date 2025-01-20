const fs = require('fs').promises;
const path = require('path');

const componentsPath = path.join(__dirname, 'components');
const templatePath = path.join(__dirname, 'template.html');
const projectDist = path.join(__dirname, 'project-dist');

async function createIndex() {
    let template = (await fs.readFile(templatePath, 'utf-8')).toString();
    await fs.mkdir(projectDist, { recursive: true });

    try {
        const components = await fs.readdir(componentsPath, { withFileTypes: true });

        for (const component of components) {
            if (component.isFile() && path.extname(component.name) === '.html') {
                const content = await fs.readFile(componentsPath + '/' + `${component.name}`, 'utf-8');
                replacement = component.name.slice(0, -5);
                template = template.replace(`{{${replacement}}}`, content.toString());
            }
        }
        await fs.writeFile(projectDist + '/' + 'index.html', template);
        console.log('Файл index.html успешно создан и записан.');
    } catch (err) {
        console.error('Error:', err);
    }
}

createIndex();

async function createBundle() {
    const bundleFilePath = path.join(__dirname, 'project-dist', 'style.css');
    const filesPath = path.join(__dirname, 'styles');
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
        console.log('Файл bundle.css успешно создан и записан.');
    } catch (err) {
        console.error('Error:', err);
    }
}

createBundle();


async function manageDirectory(src, dest) {
    try {
        await fs.rm(dest, { recursive: true, force: true });

        await fs.mkdir(dest, { recursive: true });

        const items = await fs.readdir(src, { withFileTypes: true });

        for (let item of items) {
            const sourcePath = path.join(src, item.name);
            const targetPath = path.join(dest, item.name);

            if (item.isDirectory()) {
                await manageDirectory(sourcePath, targetPath); 
            } else {
                await fs.copyFile(sourcePath, targetPath);
            }
        }
    } catch (error) {
        console.error('Ошибка при копировании папки:', error);
    }
}

const dirPath = path.join(__dirname, 'project-dist', 'assets');
const filesPath = path.join(__dirname, 'assets');


manageDirectory(filesPath, dirPath);