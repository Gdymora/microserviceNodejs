exports.up = function (knex) {
  return knex.schema.createTable("commentmeta", function (table) {
    table.increments("id");
    table.bigInteger("comment_id");
    table.string("meta_key", 255);
    table.text("meta_value", "longtext");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("commentmeta");
};
