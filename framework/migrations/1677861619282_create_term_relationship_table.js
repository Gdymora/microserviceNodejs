exports.up = function (knex) {
  return knex.schema.createTable("term_relationships", function (table) {
    table.increments("id");
    table.bigInteger("term_taxonomy_id");
    table.mediumint("term_order");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("term_relationships");
};
