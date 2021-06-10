const router = require('express').Router();
const { Post, User, Comment } = require('../../models');

// get all users
router.get('/', (req, res) => {
    console.log('======================');
    Post.findAll({
        attributes: [
            'id',
            'title'
        ],
      include: [
        // Comment model here -- attached username to comment
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username']
          }
        },
        {
          model: User,
          attributes: ['username', 'twitter', 'github']
        },
      ]
    })
      .then(dbPostData => res.json(dbPostData))
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

  router.get('/:id', (req, res) => {
    Post.findOne({
      where: {
        id: req.params.id
      },
      attributes: [
        'id',
        'title',
        'created_at',
        'post_content'
      ],
      include: [
        // include the Comment model here:
        {
          model: User,
          attributes: ['username', 'twitter', 'github']
        },
        {
          model: Comment,
          attributes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
          include: {
            model: User,
            attributes: ['username', 'twitter', 'github']
          }
        }
      ]
    })
      .then(dbPostData => {
        if (!dbPostData) {
          res.status(404).json({ message: 'No post found with this id' });
          return;
        }
        res.json(dbPostData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });

router.post('/create', async (req, res) => {
    try {
        const newPost = await Post.create({
            ...req.body,
            user_id: req.session.user_id,
        });
        res.redirect('/dashboard');
    } catch (error) {
        res.status(400).json(error);
    }
});

router.put('/:id',async (req,res) => {
    try {
        const postUpdate = await Post.update(
            {
            ...req.body,
            user_id: req.session.user_id
            },
            {
                where: {
                    id: req.params.id
                }
            });
            res.json(postUpdate)
    } catch (error) {
        res.status(400).json(error);
    }
});

router.delete('/:id',async (req,res) => {
    try {
        const deletePost = await Post.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json(deletePost);
    } catch (error) {
        res.status(400).json(error);
    }
});


module.exports = router;