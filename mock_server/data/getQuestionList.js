const Mock = require('mockjs')

const Random = Mock.Random

function getQuestionList(opt) {
    const { len = 10, isDeleted = false, isStar = false, page = 1 } = opt || {}

    const list = []
    for (let i = 0; i < len; i++) {
        list.push({
            _id:Random.id(),
            title:Random.ctitle(5, 10),
            isPublished:Random.boolean(),
            isStar,
            answerCount:Random.integer(0, 100),
            createdAt:Random.datetime(),
            isDeleted,
        })
    }
    return list
}

module.exports = getQuestionList