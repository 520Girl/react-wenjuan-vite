const Mock = require('mockjs')
const getQuestion = require('../data/getQuestionList')

const Random = Mock.Random
module.exports = [
    { //获取单个问卷文 件信息
        url: '/api/question/:id',
        method: 'get',
        response: (req, res) => {
            return {
                errno: 0,
                data: {
                    id: Random.id(),
                    title: Random.ctitle(),
                    desc:'描述',
                    js:'console.log("hello world")',
                    css:'',
                    componentList: [
                        { //info
                            fe_id: Random.id(),
                            type: 'questionInfo', //组件类型不能重复，前后端一致
                            title: '问卷信息',
                            isHidden: false,
                            isLocked: false,
                            props: { title: '问卷标题', desc: '问卷描述' }
                        },
                        { //title
                            fe_id: Random.id(),
                            type: 'questionTitle', //组件类型不能重复，前后端一致
                            title: '标题',
                            isHidden: false,
                            isLocked: false,
                            props: { title: '个人信息调研', level: 1, isCenter: false }
                        },
                        { //Input
                            fe_id: Random.id(),
                            type: 'questionInput',
                            title: '单行文本框',
                            isHidden: false,
                            isLocked: false,
                            props: { title: '你的姓名', placeholder: '请输入姓名...' }

                        },
                        { //多行输入
                            fe_id: Random.id(),
                            type: 'questionTextarea',
                            title: '多行输入框',
                            isHidden: false,
                            isLocked: false,
                            props: { title: '多行输入', placeholder: '请输入更多内容...' }

                        },
                        { //段落
                            fe_id: Random.id(),
                            type: 'questionParagraph',
                            title: '段落',
                            isHidden: false,
                            isLocked: false,
                            props: { text: '一个段落', isCenter: false }

                        },
                        { //单选
                            fe_id: Random.id(),
                            type: 'questionRadio',
                            title: '单选',
                            isHidden: false,
                            isLocked: false,
                            props: {
                                title: '单选标题',
                                isVertical: false,
                                options: [
                                    { value: '1', text: '选项1' },
                                    { value: '2', text: '选项2' },
                                    { value: '3', text: '选项3' },
                                ],
                                value: ''
                            }

                        },
                        { //多选
                            fe_id: Random.id(),
                            type: 'questionCheckbox',
                            title: '多选',
                            isHidden: false,
                            isLocked: false,
                            props: {
                                title: '多选标题',
                                isVertical: false,
                                list: [
                                    { value: '1', text: '选项1',checked:false },
                                    { value: '2', text: '选项2', checked: false },
                                    { value: '3', text: '选项3', checked: false },
                                ],
                            }

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

            const { url = '', query = {} } = ctx
            const isDeleted = url.includes('isDeleted=true')
            const isStar = url.includes('isStar=true')
            const pageSize = parseInt(query.pageSize) || 10
            return {
                errno: 0,
                data: {
                    list: getQuestion({ len: pageSize, isDeleted, isStar }), //当前页
                    total: 100
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
            return {
                errno: 0
            }
        }

    },
    { //  复制问卷
        url: '/api/question/duplicate/:id',
        method: 'post',
        response: () => {
            return {
                errno: 0,
                data: {
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