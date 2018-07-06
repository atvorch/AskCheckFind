/* Load question Data Access Object */
const QuestionDao = require('../dao/questionDao');

/* Load Controller Common function */
const ControllerCommon = require('./common/controllerCommon');

/* Load question entity */
const Question = require('../model/question');

/**
 * question Controller
 */
class questionController {

    constructor() {
        this.questionDao = new QuestionDao();
        this.common = new ControllerCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params req, res
     * @return entity
     */
    findById(req, res) {
        let id = req.params.id;

        this.questionDao.findById(id)
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll(res) {
        this.questionDao.findAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.findError(res));
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll(res) {

        this.questionDao.countAll()
            .then(this.common.findSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Updates the given entity in the database
     * @params req, res
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(req, res) {
        let question = new Question();
        question.id = req.body.id;
        question.question = req.body.question;
        question.answer = req.body.answer;
        question.number = req.body.number;
        question.status = req.body.status;
        question.complexity = req.body.complexity;

        return this.questionDao.update(question)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Creates the given entity in the database
     * @params req, res
     * returns database insertion status
     */
    create(req, res) {
        let question = new Question();
        if (req.body.id) {
            question.id = req.body.id;
        }
        question.question = req.body.question;
        question.answer = req.body.answer;
        question.number = req.body.number;
        question.status = req.body.status;
        question.complexity = req.body.complexity;

        if (req.body.id) {
            return this.questionDao.createWithId(question)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }
        else {
            return this.questionDao.create(question)
                .then(this.common.editSuccess(res))
                .catch(this.common.serverError(res));
        }

    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params req, res
     * returns database deletion status
     */
    deleteById(req, res) {
        let id = req.params.id;

        this.questionDao.deleteById(id)
            .then(this.common.editSuccess(res))
            .catch(this.common.serverError(res));
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params req, res
     * @return
     */
    exists(req, res) {
        let id = req.params.id;

        this.questionDao.exists(id)
            .then(this.common.existsSuccess(res))
            .catch(this.common.findError(res));
    };
}

module.exports = questionController;