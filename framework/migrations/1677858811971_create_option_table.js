exports.up = function (knex) {
  return knex.schema.createTable("options", function (table) {
    table.increments("id");
    table.string("option_name", 191).notNullable();
    table.text("option_value", "longtext");
    table.string("autoload", 20);
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("options");
};
