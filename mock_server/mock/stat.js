const Mock = require('mockjs')
const getStatList = require('../data/getStatList')
const Random = Mock.Random

module.exports = [
    {
        url: '/api/stat/:questionId',
        method: 'get',
        response: () => {
            return {
                errno: 0,
                data: {
                    total: 100,
                    list: getStatList()
                }
            }
        }
    }
]