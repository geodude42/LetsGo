const db = require('../models/LetsGoModel');

const postController = {};

// Create a postController as middleware to pass it postRouter:
postController.addPost = (req, res, next) => {
  // safety feature: VALUES ($1, $2, $3, $4, $5)
  // sanitizes i.e. saves from hackers...
  const query = `INSERT INTO "public"."Posts" (id_creator, activity_name)
    VALUES ($1, $2) RETURNING *`;
  // Deconstruct column names from req.body:
  const {
    idCreator,
    activityName,
  } = req.body;
  const values = [
    idCreator,
    activityName,
  ];
  db.query(query, values)
    .then((data) => {
      res.locals.post = data.rows;
      return next();
    })
    .catch((err) => next({
      log: 'error in addPost controller',
      status: 500,
      message: { err },
    }));
};

postController.getPosts = (req, res, next) => {
  const query = `SELECT p.id, p.id_creator, p.activity_name, COUNT(l.id_post) AS likes_count
    FROM "public"."Posts" p
    LEFT JOIN "public"."Likes" l ON l.id_post = p.id
    GROUP BY 1`;
  db.query(query)
    .then((data) => {
      res.locals.posts = data.rows;
      return next();
    })
    .catch((err) => next({
      log: 'error in getPosts controller',
      status: 500,
      message: { err },
    }));
};

postController.getUserLikes = (req, res, next) => {
  const { idUser } = req.body;
  const query = `SELECT id_post
    FROM "public"."Likes"
    where id_user = ${idUser}`;
  db.query(query)
    .then((data) => {
      console.log('USERLIKE: ', data);
      res.locals.likes = data.rows;
      return next();
    })
    .catch((err) => next({
      log: 'error in getUserLikes controller',
      status: 500,
      message: { err },
    }));
};

postController.deletePost = (req, res, next) => {
  const { id, idCreator } = req.body;

  const query = `DELETE FROM "public"."Posts" WHERE id = ${id} AND id_creator = ${idCreator}`;
  db.query(query)
    .then(() => {
      res.locals.deletePost = true;
      next();
    })
    .catch((err) => next({
      log: 'error in deletePost controller',
      status: 500,
      message: { err },
    }));
};

// Like post
postController.likePost = (req, res, next) => {
  // Deconstruct column names from req.body:
  const { idPost, idUser } = req.body;
  // safety feature: VALUES ($1, $2, $3, $4, $5)
  // sanitizes i.e. saves from hackers...
  const query = `INSERT INTO "public"."Likes" (id_post, id_user)
    VALUES ($1, $2) RETURNING *`;
  const values = [
    idPost,
    idUser,
  ];
  db.query(query, values)
    .then((data) => {
      res.locals.likes = data.rows;
      return next();
    })
    .catch((err) => next({
      log: 'error in likePost controller',
      status: 500,
      message: { err },
    }));
};
// Unlike post
postController.unlikePost = (req, res, next) => {
  const { idPost, idUser } = req.body;

  const query = `DELETE FROM "public"."Likes" WHERE id_post = ${idPost} AND id_user = ${idUser}`;
  db.query(query)
    .then((data) => {
      res.locals.likes = data.rows;
      next();
    })
    .catch((err) => next({
      log: 'error in deletePost controller',
      status: 500,
      message: { err },
    }));
};

// get all user likes for each post
postController.getLikesUser = (req, res, next) => {
  const { idPost } = req.body;

  const query = `SELECT u.first_name, u.last_name
  FROM "public"."Users" u
  INNER JOIN "public"."Likes" l ON l.id_user =  u.id AND l.id_post = ${idPost}`;
  db.query(query)
    .then((data) => {
      res.locals.likesUser = data.rows;
      next();
    })
    .catch((err) => next({
      log: 'error in getLikesUser controller',
      status: 500,
      message: { err },
    }));
};
/*
postController.updatePost = (req, res, next) => {
  unless we add commenting or additional text from user about these posts
  there's no need for update
}
*/

module.exports = postController;
