exports.up = function (knex) {
  return knex.schema.createTable("postmeta", function (table) {
    table.increments("id");
    table.bigInteger("post_id");
    table.string("meta_key", 255);
    table.text("meta_value", "longtext");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("postmeta");
};
