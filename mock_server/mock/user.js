const Mock = require('mockjs')
const getQuestion = require('../data/getQuestionList')

const Random = Mock.Random

module.exports = [
    {
        url: '/api/user/login',
        method: 'post',
        response: config => {
            return{
                errno: 0,
                data: {
                    token: Random.guid()
                }
            }
        }
    },
    {
        url: '/api/user/register',
        method: 'post',
        response: config => {
            return{
                errno: 0,
            }
        }
    },
    {
        url: '/api/user/info',
        method: 'get',
        response: config => {
            return{
                errno: 0,
                data: {
                    username: Random.title(),
                    nickname: Random.cname()
                }
            }
        }
    }
]