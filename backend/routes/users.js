const router = require('express').Router();

const controllers = require('../controllers/users');

router.get('/', controllers.getUsers);
router.get('/:userId', controllers.getUser);
router.post('/', controllers.createUser);
router.patch('/me', controllers.updateUser);
router.patch('/me/avatar', controllers.updateAvatar);

module.exports = router;
