exports.up = function (knex) {
  return knex.schema.createTable("comments", function (table) {
    table.increments("id");
    table.bigInteger("comment_post");
    table.text("comment_author", "tinytext");
    table.string("comment_author_email", 100);
    table.string("comment_author_url", 200);
    table.string("comment_author_IP", 100);
    table.timestamp("comment_date").defaultTo(knex.fn.now());
    table.timestamp("comment_date_gmt").defaultTo(knex.fn.now()); 
    table.text("comment_content");
    table.mediumint("coment_karma");
    table.string("comment_approved", 20);
    table.string("comment_agent", 255);
    table.string("comment_type", 20);
    table.bigInteger("comment_parent");
    table.bigInteger("user_id");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.timestamp("updated_at").defaultTo(knex.fn.now());
  });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("comments");
};
