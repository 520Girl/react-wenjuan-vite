const Mock = require('mockjs')
const getQuestion = require('../data/getQuestionList')

const Random = Mock.Random
module.exports =[
    { //获取单个问卷文 件信息
        url: '/api/question/:id',
        method: 'get',
        response: (req, res) => {
            return{
                errno:0,
                data:{
                    id: Random.id(),
                    title: Random.ctitle(),
                    componentList:[
                        { //title
                            fe_id: Random.id(),
                            type:'questionTitle', //组件类型不能重复，前后端一致
                            title:'标题',
                            isHidden:false,
                            isLocked:false,
                            props:{title:'个人信息调研',level:1,isCenter:false }
                        },
                        { //Input
                            fe_id: Random.id(),
                            type: 'questionInput',
                            title: '单行文本框',
                            isHidden: false,
                            isLocked: false,
                            props: { title: '你的姓名',placeholder:'请输入姓名...' }

                        },
                        { //Input
                            fe_id: Random.id(),
                            type: 'questionInput',
                            title: '单行文本框2',
                            isHidden: false,
                            isLocked: false,
                            props: { title: '你的电话', placeholder: '请输入电话...' }

                        },
                    ]
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
           
            const {url = '',query = {}} = ctx
            const isDeleted = url.includes('isDeleted=true')
            const isStar = url.includes('isStar=true')
            const pageSize = parseInt(query.pageSize) || 10
            return {
                errno: 0,
                data: {
                    list: getQuestion({ len: pageSize, isDeleted, isStar }), //当前页
                    total:100 
                }
                // errno: 1,
                // msg:'8888'
            }
        }
    },
    { // 更新问卷
        url: '/api/question/:id',
        method: 'patch',
        response: () => {
            return{
                errno:0
            }
        }

    },
    { //  复制问卷
        url: '/api/question/duplicate/:id',
        method: 'post',
        response: () => {
            return {
                errno: 0,
                data:{
                    id: Random.id(),
                }
            }
        }

    },
    { //  批量测定删除问卷
        url: '/api/question',
        method: 'delete',
        response: () => {
            return {
                errno: 0,
            }
        }

    }
]