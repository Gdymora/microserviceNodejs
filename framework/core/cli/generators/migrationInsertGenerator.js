/**
 * knex Schema Builder
 */

/* 
*/
/* 
Функція upмає використовувати метод Knex insertдля вставлення даних 
у таблицю. Наприклад, щоб вставити нового користувача в usersтаблицю 
з полями name,... можна використати наступний код:
 */
class MigrationInsertGenerator {
    static generate(name) {
      return `
        exports.up = function(knex, Promise) {
          return knex('${name}s').insert({
            name: 'John Doe', 
          });
        };
        
        exports.down = function(knex, Promise) {
          return knex('${name}s').where({
            name: 'John Doe', 
          }).del();
        };
  `;
    }
  }
  module.exports = MigrationInsertGenerator;
  