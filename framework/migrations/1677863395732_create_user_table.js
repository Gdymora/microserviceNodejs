exports.up = function (knex, Promise) {
  return knex("users").insert({
    user_login: "JohnDoe",
    user_pass: "JohnDoe",
    user_nicename: "johnDoe",
    user_email: "johnDoe@com",
    display_name: "Джоні",
  });
};

exports.down = function (knex, Promise) {
  return knex("users")
    .where({
      user_login: "JohnDoe",
      user_pass: "JohnDoe",
      user_nicename: "johnDoe",
      user_email: "johnDoe@com",
      display_name: "Джоні",
    })
    .del();
};
