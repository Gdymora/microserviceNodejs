exports.up = function (knex) {
  return knex.schema.createTable("links", function (table) {
    table.increments("id");
    table.string("link_url", 255);
    table.string("link_name", 255);
    table.string("link_image", 255);
    table.string("link_description", 25);
    table.string("link_visible", 255);
    table.bigInteger("link_owner");
    table.mediumint("link_rating");
    table.timestamp("link_updated").defaultTo(knex.fn.now());
    table.string("link_rel", 255);
    table.text("link_notes", "mediumtext");
    table.string("link_rss", 255);
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("links");
};
