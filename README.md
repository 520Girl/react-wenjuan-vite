
# 理解问卷系统的设计

## 文件夹作用

- `hooks`：用于自定义的hooks
  > - 将需要使用的公共请求移到这里面并以`Data` 结尾的方式 与 组件中需要用到的redux数据进行使用`Info` 进行区分
  > - `Info` 

- `public`：静态资源目录
- `src`：源码目录

# API 设计

## 用户功能

### 获取用户信息

- method `get`
- path `/api/user/info`
- response `{ errno: 0, data: {...} }` 或 `{ errno: 10001, msg: 'xxx' }`

### 注册

- method `post`
- path `/api/user/register`
- request body `{ username, password, nickname }`
- response `{ errno: 0 }`

### 登录

- method `post`
- path `/api/user/login`
- request body `{ username, password }`
- response `{ errno: 0, data: { token } }` —— **JWT** 使用 token

## 问卷功能

### 创建问卷

- method `post`
- path `/api/question`
- request body - 无 （点击一个按钮即可创建，title 自动生成）
- response `{ errno: 0, data: { id } }`

### 获取单个问卷

- method `get`
- path `/api/question/:id`
- response `{ errno: 0, data: { id, title ... } }`

### 获取问卷列表

- method `get`
- path `/api/question`
- response: `{ errno: 0, data: { list: [ ... ], total } }`

### 更新问卷信息

- method `patch`
- path `/api/question/:id`
- request body `{ title, isStar ... }` （之前忘记了，现补上）
- response: `{ errno: 0 }`

PS：删除是`假删除`，实际是更新 `isDeleted` 属性

### 批量彻底删除问卷

- method `delete`
- path `/api/question`
- request body `{ ids: [ ... ] }`
- response: `{ errno: 0 }`

### 复制问卷

- method `post`
- path `/api/question/duplicate/:id`
- response: `{ errno: 0, data: { id } }`

## 小结

- 使用 Restful API
- 用户验证使用 JWT （后面再讲）
- 统一返回格式 `{ errno, data, msg }`

# 答卷数据

## 数据结构设计

回顾：问卷 vs 答卷

（使用演示的“前端工程师就业调研”例子）

一个问卷发布了，用户提交的一份**答卷**，数据结构如下：

```js
{
    questionId: '63a51dd42ef26594341e2aff',
    answerList: [
        { componentId: 'c1', value: undefined }, // 标题 info
        { componentId: 'c2', value: '张三' }, // input
        { componentId: 'c3', value: '13987650099' }, // input
        { componentId: 'c4', value: '1-3年' }, // 单选
        { componentId: 'c5', value: 'Vue2,Vue3' }, // 多选
        { componentId: 'c6', value: '大于20k' }, // 单选
        { componentId: 'c7', value: '备注xx' } // textarea
    ]
}
```

**一个问卷对应多个答卷**，所以一个问卷的所有答卷列表如下：

```js
[
    // 用户A
    {
        _id: 'xx',
        c2: '张三',
        c3: '13987650099',
        c4: '1-3年', // 单选
        c5: 'Vue2,Vue3', // 多选
        c6: '大于20k',
        c7: '备注xx'
    },
    // 用户B
    {
        _id: 'y',
        c2: '李四',
        c3: 'lisi@163.com',
        c4: '3-5年',
        c5: 'Vue2,React',
        c6: '10-20k',
        c7: '备注yy'
    },
    // 更多用户...
]
```

## 完善 mock

根据上面的分析，可以设置 mock

```js
// url `/api/stat/:questionId`
// method `get`
{
    errno: 0,
    data: {
        total: 100, // 分页
        list: [ /* 上面的答卷列表 */ ]
    }
}
```
