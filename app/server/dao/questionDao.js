/* Load Question entity */
const Question = require('../model/question');

/* Load DAO Common functions */
const daoCommon = require('./commons/daoCommon');

/**
 * Question Data Access Object
 */
class QuestionDao {

    constructor() {
        this.common = new daoCommon();
    }

    /**
     * Tries to find an entity using its Id / Primary Key
     * @params id
     * @return entity
     */
    findById(id) {
        let sqlRequest = "SELECT id, question, answer, number, status, complexity FROM question WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.findOne(sqlRequest, sqlParams).then(row =>
            new Question(row.id, row.question, row.answer, row.number, row.status, row.complexity));
    };

    /**
     * Finds all entities.
     * @return all entities
     */
    findAll() {
        let sqlRequest = "SELECT * FROM question";
        return this.common.findAll(sqlRequest).then(rows => {
            let questions = [];
            for (const row of rows) {
                questions.push(new Question(row.id, row.question, row.answer, row.number, row.status, row.complexity));
            }
            return questions;
        });
    };

    /**
     * Counts all the records present in the database
     * @return count
     */
    countAll() {
        let sqlRequest = "SELECT COUNT(*) AS count FROM question";
        return this.common.findOne(sqlRequest);
    };

    /**
     * Updates the given entity in the database
     * @params Question
     * @return true if the entity has been updated, false if not found and not updated
     */
    update(Question) {
        let sqlRequest = "UPDATE question SET " +
            "question=$question, " +
            "answer=$answer, " +
            "number=$number, " +
            "status=$status " +
            "complexity=$complexity " +
            "WHERE id=$id";

        let sqlParams = {
            $question: Question.question,
            $answer: Question.answer,
            $number: Question.number,
            $status: Question.status,
            $complexity: Question.complexity,
            $id: Question.id
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity in the database
     * @params Question
     * returns database insertion status
     */
    create(Question) {
        let sqlRequest = "INSERT into question (question, answer, number, status, complexity) " +
            "VALUES ($question, $answer, $number, $status, $complexity)";
        let sqlParams = {
            $question: Question.question,
            $answer: Question.answer,
            $number: Question.number,
            $status: Question.status,
            $complexity: Question.complexity,
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Creates the given entity with a provided id in the database
     * @params Question
     * returns database insertion status
     */
    createWithId(Question) {
        let sqlRequest = "INSERT into question (id, question, answer, number, status, complexity) " +
            "VALUES ($id, $question, $answer, $number, $status, $complexity)";
        let sqlParams = {
            $id: Question.id,
            $question: Question.question,
            $answer: Question.answer,
            $number: Question.number,
            $status: Question.status,
            $complexity: Question.complexity
        };
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Deletes an entity using its Id / Primary Key
     * @params id
     * returns database deletion status
     */
    deleteById(id) {
        let sqlRequest = "DELETE FROM question WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };

    /**
     * Returns true if an entity exists with the given Id / Primary Key
     * @params id
     * returns database entry existence status (true/false)
     */
    exists(id) {
        let sqlRequest = "SELECT (count(*) > 0) as found FROM question WHERE id=$id";
        let sqlParams = {$id: id};
        return this.common.run(sqlRequest, sqlParams);
    };
}

module.exports = QuestionDao;