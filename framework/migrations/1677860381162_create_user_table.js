exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id");
    table.string("user_login", 60).notNullable();
    table.string("user_pass", 255).notNullable();
    table.string("user_nicename", 50);
    table.string("user_email", 100);
    table.string("user_url", 100);
    table.timestamp("user_registered").defaultTo(knex.fn.now());   
    table.string("user_activation_key", 255);
    table.mediumint("user_status");
    table.string("display_name", 250);
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("users");
};
