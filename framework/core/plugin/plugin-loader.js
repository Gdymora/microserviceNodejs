const fs = require("fs");
const path = require("path");
const util = require("util");
const readdir = util.promisify(fs.readdir);
/**
 * динамічно завантажує та вивантажує плагіни під час виконання
 */
class PluginLoader {
  constructor(pluginDir) {
    this.pluginDir = pluginDir;
    this.plugins = {};
    this.loadPlugins();
    this.watchPlugins();
  }

  async loadPlugins() {
    // const plugins = fs.readdirSync(this.pluginDir);
    const plugins = await readdir(this.pluginDir);
    plugins.forEach((plugin) => {
      const pluginPath = path.join(this.pluginDir, plugin);
      const pluginModule = require(pluginPath);
      this.plugins[plugin] = pluginModule;
    });
  }

  /**
   * спостереження за файлами представляє метод fs.watch
   */
  watchPlugins() {
    fs.watch(this.pluginDir, (event, filename) => {
      if (event === "change" || event === "rename") {
        const pluginPath = path.join(this.pluginDir, filename);
        delete require.cache[require.resolve(pluginPath)];
        const pluginModule = require(pluginPath);
        this.plugins[filename] = pluginModule;
      }
    });
  }

  getPlugin(pluginName) {
    return this.plugins[pluginName];
  }

  getPlugins() {
    return Object.values(this.plugins);
  }

  initPlugin(app) {  
      // Loop through each file and import the plugin
      this.plugins.forEach(async (file) => {
        if (path.extname(file) === ".js") {
          const plugin = require(path.join(pluginDir, file));
          if (plugin.init) {
            await plugin.init(app);
            console.log(`Initialized plugin: ${file}`);
          }
        }
      });
  }
}

module.exports = PluginLoader;
