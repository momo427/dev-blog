const router = require('express').Router();

const { User, Post } = require('../models');

const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req,res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
            include: [{ model: Post }],
        });
        const user = userData.get({ plain: true });
        res.render('dashboard', {
            ...user,
            logged_in: req.session.logged_in,
            logged_name: req.session.logged_name,
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

router.get('/create', withAuth, (req, res) => {
    try {
        if(req.session.logged_in) {
            res.render('create-post',{
                logged_in: req.session.logged_in
            });
            return;
        }
        res.redirect('/dashboard');
    } catch (error) {
        res.status(500).json(error);
    }
    
});


router.get("/posts/:id", withAuth, async (req, res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [{ model: User }],
        });
        const post = postData.get({ plain: true });
        res.render('edit-post', {
            post,
            logged_in: req.session.logged_in
        });
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;