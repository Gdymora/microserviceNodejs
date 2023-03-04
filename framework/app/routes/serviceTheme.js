const PostService = require("../components/post/postService");
const fs = require("fs");
const path = require("path");
class ServiceTheme {
  activeThemeName;

  themes = fs.readFileSync(path.join(__dirname, "theme.json"), "utf8");
  

 
  async getAllTheme() {
    return await this.userRepository.getAll();
  }

  getActiveTheme() {
    const arr = [];
    arr.push(JSON.parse(this.themes));
    console.log("theme", arr);
    this.activeThemeName = arr.filter((theme) => theme.active === true)[0];
    return this.activeThemeName;
  }

  async getDataTheme(db) {
    const postService = PostService();
    const letr = await postService.getAllPosts(db);
    return letr; //this.posts;
  }
}

module.exports = ServiceTheme;
