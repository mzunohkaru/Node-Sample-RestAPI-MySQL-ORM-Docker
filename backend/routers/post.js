const router = require("express").Router();

const Post = require("../models").Post;
const checkJWT = require("../middleware/check_jwt");

router.post("/", (req, res) => {
  const { title, content, user_id } = req.body;
  Post.create({ title, content, user_id })
    .then((post) => {
      res.status(201).json(post);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.get("/", (req, res) => {
  Post.findAll()
    .then((posts) => {
      res.send(posts);
    })
    .catch((error) => {
      res.status(500).send({ error: "データの取得に失敗しました。" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Post.findOne({
    where: { id },
    // include : 投稿を検索する際に、関連するユーザー情報も一緒に取得する
    include: [
      {
        model: require("../models").User,
        as: "User",
      },
    ],
  })
    .then((post) => {
      if (!post) {
        return res.status(404).json({ error: "投稿が見つかりません。" });
      }
      res.json(post);
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

router.put("/:id", checkJWT, (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  Post.findByPk(id, {
    include: [
      {
        model: require("../models").User,
        as: "User",
      },
    ],
  })
    .then((post) => {
      if (!post) {
        return res
          .status(404)
          .json({ error: "指定されたIDの投稿が見つかりません。" });
      }
      if (post.User.email !== req.user) {
        return res
          .status(403)
          .json({ error: "この操作は許可されていません。" });
      }
      post
        .update({ title, content })
        .then((updatedPost) => {
          res.json(updatedPost);
        })
        .catch((updateError) => {
          res.status(500).json({ error: updateError.message });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: error.message });
    });
});

module.exports = router;
