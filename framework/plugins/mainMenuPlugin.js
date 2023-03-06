 class MainMenuPlugin {
    init(app){      
      // Add route for plugin
      app.get('/my-plugin', (req, res) => {
        res.render('my-plugin', { title: 'My Plugin' });
      });
    }

  };
  
  module.exports = MainMenuPlugin 