const Mock = require('mockjs')

const Random = Mock.Random
module.exports =[
    {
        url: '/api/question/:id',
        method: 'get',
        response: (req, res) => {
            return{
                errno:0,
                data:{
                    id: Random.id(),
                    title: Random.ctitle(),
                }
                // errno: 1,
                // msg:'8888'
            }
        }
    }
]