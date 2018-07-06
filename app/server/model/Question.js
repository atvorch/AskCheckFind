/**
 * Question Entity (ES6 Class)
 */

class Question {
    constructor(id, question, answer, number, status, complexity) {
        this.id = id;
        this.question = question;
        this.answer = answer;
        this.number = number;
        this.status = status;
        this.complexity = complexity;
    }
}

module.exports = Question;