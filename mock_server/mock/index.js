const test = require('./test')
const question = require('./question')
const user = require('./user')

const mockList = [
    ...test,
    ...user,
   ...question
]

module.exports = mockList