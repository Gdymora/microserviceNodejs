exports.up = function (knex) {
  return knex.schema.createTable("terms", function (table) {
    table.increments("id");
    table.string("name", 20);
    table.string("slug", 20);
    table.bigInteger("term_group");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("terms");
};
