require('dotenv').config();
const API_URL = 'http://localhost:8000';
exports.serverPort = process.env.PORT | 3000;
exports.sessionSecret = process.env.SESSION_SECRET;
exports.rate = {
  windowMs: 5 * 60 * 1000,
  max: 10000,
};
/* об’єкт конфігурації для нашого проксі API. Опис властивостей 
target– Визначає цільовий хост, на який потрібно надсилати запити
 проксі. У нашому випадку це https://jsonplaceholder.typicode.com
changeOrigin – Для цього встановлено значення true, оскільки ми використовуємо проксі-сервер до іншого джерела.
pathRewrite – Це дуже важлива властивість, де ви визначаєте правила для перезапису шляху. Наприклад, вираз [ ^/api/posts]: '/posts' спрямовує всі вхідні запити /api/postsлише на /posts. Іншими словами, це видалить /apiпрефікс зі шляху.
*/
exports.proxies = {
  '/search': {
    protected: true,
    target: API_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/search`]: '/search/new-path',
    },
  },
  '/example': {
    protected: true,
    target: API_URL,
    changeOrigin: true,
    pathRewrite: {
      [`^/example`]: 'http://www.example.org',
    },
    router: {
      'dev.localhost:3000': 'http://www.example.org',
    },
  },
};
