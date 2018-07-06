/* Load Modules */
const express = require('express');
const router = express.Router();

/* Load controller */
const QuestionController = require('../../controller/questionController');
const questionController = new QuestionController();

/**
 * Car Entity routes
 */
router.get('/count', function (req, res) {
    questionController.countAll(res);
});

router.get('/exists/:id', function (req, res) {
    questionController.exists(req, res);
});

router.get('/:id', function (req, res) {
    questionController.findById(req, res);
});

router.get('/', function (req, res) {
    questionController.findAll(res);
});

router.put('/:id', function (req, res) {
    questionController.update(req, res);
});

router.post('/create', function (req, res) {
    questionController.create(req, res);
});

router.delete('/:id', function (req, res) {
    questionController.deleteById(req, res);
});

module.exports = router;