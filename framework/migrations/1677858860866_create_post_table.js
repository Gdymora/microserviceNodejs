exports.up = function (knex, Promise) {
  return knex("posts").insert([
    {
      post_author: "1",
      post_content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      post_title: "My First Blog Post",
      post_excerpt:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia augue vel urna tristique, ac eleifend sapien ultricies.",
      ping_status: "open",
      ping_status: "open",
      post_name: "my-first-blog-post",
      post_type: "post",
    },
    {
      post_author: "1",
      post_content:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      post_title: "My Second Blog Post",
      post_excerpt:
        "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
      ping_status: "open",
      ping_status: "open",
      post_name: "my-first-blog-post",
      post_type: "post",
    },
  ]);
};

exports.down = function (knex, Promise) {
  return knex("posts")
    .where([
      {
        post_author: "1",
        post_content:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        post_title: "My First Blog Post",
        post_excerpt:
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus lacinia augue vel urna tristique, ac eleifend sapien ultricies.",
        ping_status: "open",
        ping_status: "open",
        post_name: "my-first-blog-post",
        post_type: "post",
      },
      {
        post_author: "1",
        post_content:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
        post_title: "My Second Blog Post",
        post_excerpt:
          "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        ping_status: "open",
        ping_status: "open",
        post_name: "my-first-blog-post",
        post_type: "post",
      },
    ])
    .del();
};
