const fs = require("fs");
const path = require("path");
class ServiceTheme {
  activeThemeName;
  themes = fs
    .readFileSync(path.join(__dirname, "theme.json"), 'utf8')
  /*   .then(function (result) {      
      const arr = []
      arr.push(JSON.parse(result))
      console.log(arr)
      return arr;
    })
    .catch(function (error) {
      console.log(error);
    }); */
        theme = [
    { name: "default", active: true },
    { name: "mythema", active: false }, 
  ];     

  posts = [
    {
      title: "My First Blog Post",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      author: "John Doe",
      slug: "my-first-blog-post",
      excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia augue vel urna tristique, ac eleifend sapien ultricies.",
    },
    {
      title: "My Second Blog Post",
      content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      author: "Jane Smith",
      slug: "my-second-blog-post",
      excerpt:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    // ...
  ];
  async getAllTheme() {
    return await this.userRepository.getAll();
  }

  getActiveTheme() {
    
    const arr = []
    arr.push(JSON.parse(this.themes))
    console.log("theme", arr);
    this.activeThemeName = arr.filter(
      (theme) => theme.active === true
    )[0];
    return this.activeThemeName;
  }
  getDataTheme() {
    return this.posts;
  }
}

module.exports = ServiceTheme;
