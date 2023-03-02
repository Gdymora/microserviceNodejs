exports.up = function (knex) {
  return knex.schema
    .createTable("posts1", function (table) {
      table.increments("id");
      table.string("name").notNullable();
      table.timestamps(false, true);
    })
    .then(function () {
      // run the migration to create the "users" table in the database
      return knex.migrate.latest();
    })
    .then(function () {
      // insert some sample data into the "users" table
      return knex("users").insert([
        { name: "John Doe", email: "john.doe@example.com" },
        { name: "Jane Smith", email: "jane.smith@example.com" },
      ]);
    });
};

exports.down = function (knex) {
  return knex.schema.dropTableIfExists("posts");
};
