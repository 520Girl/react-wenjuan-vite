const Mock = require('mockjs')
const getQuestion = require('../data/getQuestionList')

const Random = Mock.Random
module.exports =[
    { //获取单个问卷文件信息
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
    },
    { // 新增问卷
        url: '/api/question',
        method: 'post',
        response: () => {
            return {
                errno: 0,
                data: {
                    id: Random.id(),
                }
                // errno: 1,
                // msg:'8888'
            }
        }
    },
    { // 获取问卷（查询）列表
        url: '/api/question',
        method: 'get',
        response: (ctx) => {
           
            const {url = ''} = ctx
            const isDeleted = url.includes('isDeleted=true')
            const isStar = url.includes('isStar=true')
            return {
                errno: 0,
                data: {
                    list: getQuestion({ len:10, isDeleted, isStar }), //当前页
                    total:100 
                }
                // errno: 1,
                // msg:'8888'
            }
        }
    },
]