const router = require('express').Router();
const {addTask, getTaskByUser} = require('../controllers/tasks.controller');
//router.get('/', getAllTasks);
router.post('/add', addTask);
//router.put('/update/:id', updateBlog);
//router.get('/:id', getById);
//router.delete('/:id', deletedById);
router.get('/user/:email', getTaskByUser);
module.exports = router;