## Вступ

Це приклад простого використання [http-proxy-middleware](https://www.npmjs.com/package/http-proxy-middleware) з логером winston аутентифікацією за допомогою сесії та обмеженням кількості запитів в певний проміжлк часу від одного користувача:

## - Як це працює?

Для старту виконайте команду

```Bash
npm run dev
```

Ця команда запустить два сервери на порту 3000 та 8000

## - Авторизація

Навігація до '/' буде працюватиб але поверне код статусу HTTP./protected 401 (Unauthorized)
Перехід до '/login' автоматично ввійде в обліковий запис із відображенням «Успішно автентифіковано».
Під час повторного переходу '/login' з’явиться повідомлення «Вже автентифіковано».

Коли ви отримаєте доступ, сторінка буде працюватиме. /protected
Перехід до '/logout' скидання сеансу та відображення «Вихід успішно завершено».
Потім знову стає недоступним, показуючи код стану. /protected 401
Перегляд '/logout' також поверне 401 код статусу.
Використовуючи protect проміжне програмне забезпечення перед обробником запитів, ми можемо захистити кінцеву точку, переконавшись, що користувач увійшов у систему. Крім того, у нас є кінцеві точки /login та /logout для посилення цих можливостей.

## - Використання з прокси

Використання конфігуратора прохі:
Перехід search/example перенаправить нас 'www.example.org'
Перехід /search перенаправить запит до 'localhost:8000/search/new-path' залишаючись при цьому на url http://localhost:3000/search

## - createProxyMiddleware()

Існують різні способи, якими відбувається зіставлення контексту для шляху:

Зіставлення шляху

```JavaScript
createProxyMiddleware({...})
```

відповідає всім шляхам. Це означає, що всі запити надсилатимуться через проксі.

```JavaScript
createProxyMiddleware('/', {...})
```

також відповідає всім шляхам.

```JavaScript
createProxyMiddleware('/api', {...})
```

відповідає лише шляхам, що починаються з /api.
Зіставлення кількох шляхів

```JavaScript
createProxyMiddleware(['/api', '/test', '/otherpath'], {...})
```

можна використовувати для зіставлення кількох шляхів із певною конфігурацією проксі
Відповідність шляху під символом підстановки
Для більш детального керування ви також можете використовувати символи підстановки для відповідності шляхів.

```JavaScript
createProxyMiddleware('\*\*', {...})
```

відповідає будь-якому шляху, і всі запити проксі.

```JavaScript
createProxyMiddleware('**/_.html', {...})
```

відповідає будь-якому шляху, який закінчується на .html.

```JavaScript
createProxyMiddleware('/api/\*\*/_.html', {...})
```

відповідає запитам, які закінчуються на .html в межах загального шляху /api.
Спеціальне зіставлення шляху Для ще більшого контролю ви також можете надати спеціальну функцію для відповідності шляху для проксі API. Дивіться приклад нижче:

```JavaScript
const filter = function (pathname, req) {
  return pathname.match('^/api') && req.method === 'GET'; };
  const apiProxy = createProxyMiddleware(filter,
  { target: '<https://example.com>', });
```

у наведеному вище прикладі проксі-сервером є лише запити GET до шляху /api.