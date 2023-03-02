/**
 * knex Schema Builder
 */

/* У цьому прикладі ми додаємо новий стовпець fullnameдо наявної 
таблиці під назвою users. Потім ми заповнюємо fullnameстовпець 
комбінацією стовпців first_nameі last_nameдля всіх наявних рядків 
у usersтаблиці. Нарешті, ми видаляємо fullnameстовпець, якщо нам 
потрібно відкотити міграцію.

Зверніть увагу, що в цьому прикладі припускається, що в таблиці 
вже є стовпці first_nameі . Крім того, важливо пам’ятати, що міграції
 мають бути ідемпотентними, тобто їх можна запускати кілька разів, не 
 створюючи проблем. У цьому прикладі ми перевіряємо, чи вже існує стовпець,
  перш ніж додати його до таблиці, і ми не вставляємо 
жодних дублікатів даних у стовпець.last_nameusersfullname 
*/
class MigrationUpdateGenerator {
    static generate(name) {
      return `
        exports.up = async function(knex) {
          await knex.schema.alterTable('${name}s', function(table) {
            table.string('fullname').notNullable().defaultTo('');
          });
        
          const users = await knex.select().from('${name}s');
          const updates = users.map(user => {
            return knex('${name}s').where({id: user.id}).update({fullname: \`\${user.first_name} \${user.last_name}\`});
          });
          await Promise.all(updates);
        };
        
        exports.down = async function(knex) {
          await knex.schema.alterTable('${name}s', function(table) {
            table.dropColumn('fullname');
          });
        };
  `;
    }
  }
  module.exports = MigrationUpdateGenerator;
  