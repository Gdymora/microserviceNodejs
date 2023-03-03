exports.up = function (knex) {
  return knex.schema.createTable("usermeta", function (table) {
    table.increments("id");
    table.bigInteger("user_id");
    table.string("meta_key", 20);
    table.text("meta_value", "longtext");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("usermeta");
};
