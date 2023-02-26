class ServiceTheme {
  activeThemeName;
  theme = [
    { name: 'default', active: true },
    { name: 'mythema', active: false },
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
}

module.exports = ServiceTheme;
