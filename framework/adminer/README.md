# 
Але оскільки Adminer є популярною ціллю для злому, вони запровадили функцію , яка не дозволяє запускати адміністратор без пароля.
База даних Sqlite зазвичай працює без пароля та біса, потрібне обхідне рішення!

Тому нам потрібно додати плагін до адміністратора, який дозволяє вхід без пароля, і розширити офіційний образ Adminer Docker, щоб включити плагін.

Ми додаємо сценарій, який завантажує офіційний плагін для входу без пароля, і копіюємо його в папку з підтримкою плагінів образу адміністратора

login-password-less.php:
log: admin pass: admin