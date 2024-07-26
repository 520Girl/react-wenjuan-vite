const test = require('./test')
const question = require('./question')
const user = require('./user')
const stat = require('./stat')
const answer = require('./answer')

const mockList = [
    ...test,
    ...user,
    ...stat,
   ...question,
    ...answer
]

module.exports = mockList