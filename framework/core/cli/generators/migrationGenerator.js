/**
 * knex Schema Builder
 */
class MigrationGenerator {
    static generate(name) {
      return `
      exports.up = function(knex) {
        return knex.schema.createTable('${name}s', function(table) {
          table.increments('id');
          table.string('name').notNullable();
          table.timestamp('created_at').defaultTo(knex.fn.now());
          table.timestamp('updated_at').defaultTo(knex.fn.now());
        }).then(function() {
          // run the migration to create the "users" table in the database
          return knex.migrate.latest();
        })
        .then(function() {
          // insert some sample data into the "users" table
          return knex('users').insert([
            {name: 'NameOne'},
            {name: 'NameTwo'}
          ]);;
      };
      
      exports.down = function(knex) {
        return knex.schema.dropTableIfExists('${name}s');
      };
  `;
    }
  }
  module.exports = MigrationGenerator;
  