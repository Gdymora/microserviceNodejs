
        exports.up = function(knex, Promise) {
          return knex('posts').insert({
            name: 'John Doe', 
          });
        };
        
        exports.down = function(knex, Promise) {
          return knex('posts').where({
            name: 'John Doe', 
          }).del();
        };
  