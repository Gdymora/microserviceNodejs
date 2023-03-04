const express = require('express');
class postController {
  constructor(postService, logger) {
    this.postService = postService;
    this.logger = logger;
  }

  async getAllPosts(req, res) {
 /*    const sql = 'SELECT * FROM posts';
    req.db.all(sql,(err, rows ) => {
      console.log(rows)  
  }); */
    try {
      const post = await this.postService.getAllPosts(req.db);
      res.status(200).json(post);
    } catch (err) {
      this.logger.error(err);
      res.status(500).send('An error occurred while retrieving the post.');
    }
  }

  async createPost(req, res) {
    try {
      console.log(req.body);
      const post = await this.postService.createPost(req.db, req.body);

      res.status(201).json(post);
    } catch (err) {
      this.logger.error(err);
      res.status(500).send('An error occurred while creating the post.');
    }
  }

  async getPost(req, res) {
    try {
      const post = await this.postService.getPostById(req.db, req.params.id);
      res.status(200).json(post);
    } catch (err) {
      this.logger.error(err);
      res.status(500).send('An error occurred while retrieving the post.');
    }
  }

  async updatePost(req, res) {
    try {
      const post = await this.postService.updatePost(req.db, req.params.id, req.body);
      res.status(200).json(post);
    } catch (err) {
      this.logger.error(err);
      res.status(500).send('An error occurred while updating the post.');
    }
  }

  async deletePost(req, res) {
    try {
      await this.postService.deletePost(req.db, req.params.id);
      res.status(204).send();
    } catch (err) {
      this.logger.error(err);
      res.status(500).send('An error occurred while deleting the post.');
    }
  }

  init() {
    const router = express.Router();
    router.get('/', this.getAllPosts.bind(this));
    router.post('/', this.createPost.bind(this));
    router.get('/:id', this.getPost.bind(this));
    router.put('/:id', this.updatePost.bind(this));
    router.delete('/:id', this.deletePost.bind(this));
    return router;
  }
}

module.exports = (postService, logger) => {
  return new postController(postService, logger);
};
