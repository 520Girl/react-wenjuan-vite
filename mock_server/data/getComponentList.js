/**
 * @description: 获取组件数据
 * @param {string} componentName 组件名称
 * @return {object} 组件数据
 */
const Mock = require('mockjs')
const Random = Mock.Random
function getComponentList(){
    return [
        { //info
            fe_id: 'c1', //todo  统计页面 左侧和中间需要id一致所以需要写死
            type: 'questionInfo', //组件类型不能重复，前后端一致
            title: '问卷信息',
            isHidden: false,
            isLocked: false,
            props: { title: '问卷标题', desc: '问卷描述' }
        },
        { //title
            fe_id: 'c2',
            type: 'questionTitle', //组件类型不能重复，前后端一致
            title: '标题',
            isHidden: false,
            isLocked: false,
            props: { title: '个人信息调研', level: 1, isCenter: false }
        },
        { //Input
            fe_id: 'c3',
            type: 'questionInput',
            title: '单行文本框',
            isHidden: false,
            isLocked: false,
            props: { title: '你的姓名', placeholder: '请输入姓名...' }

        },
        { //Input
            fe_id: 'c8',
            type: 'questionInput',
            title: '单行文本框',
            isHidden: false,
            isLocked: false,
            props: { title: '你的电话', placeholder: '请输入你的电话...' }

        },
        { //多行输入
            fe_id: 'c4',
            type: 'questionTextarea',
            title: '多行输入框',
            isHidden: false,
            isLocked: false,
            props: { title: '多行输入', placeholder: '请输入更多内容...' }

        },
        { //段落
            fe_id: 'c5',
            type: 'questionParagraph',
            title: '段落',
            isHidden: false,
            isLocked: false,
            props: { text: '一个段落', isCenter: false }

        },
        { //单选
            fe_id: 'c6',
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
            fe_id: 'c7',
            type: 'questionCheckbox',
            title: '多选',
            isHidden: false,
            isLocked: false,
            props: {
                title: '多选标题',
                isVertical: false,
                list: [
                    { value: '1', text: '选项1', checked: false },
                    { value: '2', text: '选项2', checked: false },
                    { value: '3', text: '选项3', checked: false },
                ],
            }

        },
    ]
}

module.exports = getComponentList