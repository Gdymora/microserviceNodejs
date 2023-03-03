exports.up = function (knex) {
  return knex.schema.createTable("term_taxonomy", function (table) {
    table.increments("id");
    table.bigInteger("term_id");
    table.string("taxonomy", 32);
    table.text("description", "longtext");
    table.bigInteger("parent");
    table.bigInteger("count");
 });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("term_taxonomy");
};
