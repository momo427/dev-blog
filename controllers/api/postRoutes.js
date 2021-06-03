const router = require('express').Router();
const { Post } = require('../../models');
// const withAuth = require('../../utils/auth');


router.post('/', async (req, res) => {
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