const fs = require('fs').promises;

class DirectoryTraversal {
  async traverseDirectory(path, level = 0) {
    const prefix = '  '.repeat(level);

    console.log(`${prefix}Directory: ${path}`);

    try {
      const files = await fs.readdir(path, { withFileTypes: true });

      for (const file of files) {
        const filePath = `${path}/${file.name}`;
        const stats = await fs.stat(filePath);

        if (stats.isDirectory()) {
          await this.traverseDirectory(filePath, level + 1);
        } else {
          console.log(`${prefix}${file.name}`);
        }
      }
    } catch (error) {
      console.error(`Error reading directory: ${path}\n${error}`);
    }
  }
}

// Example usage
const traversal = new DirectoryTraversal();
traversal.traverseDirectory('.');
