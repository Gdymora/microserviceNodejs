exports.up = function (knex) {
  return knex.schema.createTable("posts", function (table) {
    table.increments("id");
    table.bigInteger("post_author");
    table.timestamp("post_date").defaultTo(knex.fn.now());
    table.timestamp("post_date_gmt").defaultTo(knex.fn.now()); 
    table.text("post_content", "longtext");
    table.text("post_title").notNullable();
    table.text("post_excerpt");
    table.string("post_status", 20);
    table.string("coment_status", 20);
    table.string("ping_status", 20);
    table.string("post_password", 20);
    table.string("post_name", 200);
    table.text("to_ping");
    table.text("pinged");
    table.timestamp("post_modified").defaultTo(knex.fn.now());
    table.timestamp("post_modified_gmt").defaultTo(knex.fn.now());
    table.text("post_content_filtered", "longtext");
    table.bigInteger("post_parent");
    table.string("guid", 255);
    table.mediumint("menu_order");
    table.string("post_type", 20);
    table.string("post_mime_type", 100);
    table.mediumint("coment_count");
  })
};
exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts");
};
