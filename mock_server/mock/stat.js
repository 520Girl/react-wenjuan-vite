const Mock = require('mockjs')
const getStatList = require('../data/getStatList')
const Random = Mock.Random

module.exports = [
    //答卷列表
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
    },
    //获取单个组件的统计数据汇总
    {
        url:'/api/stat/:questionId/:componentId',
        method: 'get',
        response(){
            return{
                errno:0,
                data:{
                    stat:[
                        {name:'选项A',count:Random.integer(0,100)},
                        {name:'选项B',count:Random.integer(0,100)},
                        {name:'选项C',count:Random.integer(0,100)},
                    ]
                }
            }
        }
    }

]