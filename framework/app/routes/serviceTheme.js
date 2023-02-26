class ServiceTheme {
  activeThemeName;
  theme = [
    { name: 'default', active: true },
    { name: 'mythema', active: false },
  ];
  posts = [
    {
      title: 'My First Blog Post',
      content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      author: 'John Doe',
      slug: 'my-first-blog-post',
      excerpt:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia augue vel urna tristique, ac eleifend sapien ultricies.',
    },
    {
      title: 'My Second Blog Post',
      content:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      author: 'Jane Smith',
      slug: 'my-second-blog-post',
      excerpt:
        'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    },
    // ...
  ];
  async getAllTheme() {
    return await this.userRepository.getAll();
  }

  getActiveTheme() {
    this.activeThemeName = this.theme.filter(
      (theme) => theme.active === true
    )[0];
    return this.activeThemeName;
  }
  getDataTheme() {
    return this.posts;
  }
}

module.exports = ServiceTheme;
