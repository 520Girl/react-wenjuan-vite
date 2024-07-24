const test = require('./test')
const question = require('./question')
const user = require('./user')
const stat = require('./stat')

const mockList = [
    ...test,
    ...user,
    ...stat,
   ...question
]

module.exports = mockList