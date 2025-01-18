const fs = require('fs').promises;
const path = require('path');

const filesPath = path.join(__dirname, "files");

async function manageDirectory() {
    const dirPath = path.join(__dirname, 'files-copy');

    try {
        await fs.rm(dirPath, { recursive: true, force: true });
        await fs.mkdir(dirPath, { recursive: true });

        const files = await fs.readdir(filesPath, { withFileTypes: true });

        for (const dirent of files) {
            if (dirent.isFile()) {
                const src = path.join(filesPath, dirent.name);
                const dest = path.join(dirPath, dirent.name);
                await fs.copyFile(src, dest);
            }
        }
    } catch (err) {
        console.error('Error:', err);
    }
}

manageDirectory();