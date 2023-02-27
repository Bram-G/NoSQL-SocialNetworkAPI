const router = require('express').Router();

const {
    getUsers,
    getSingleUser,
    createUser,
    deleteUser,
    updateUser,
    addFriend,
    deleteFriend
}  = require('../../controllers/userController');

router.route('/').get(getUsers).post(createUser);

router.route('/:userId').get(getSingleUser).post(updateUser).delete(deleteUser);

router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router