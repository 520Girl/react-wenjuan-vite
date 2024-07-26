import {get} from './ajax'


export async function getQuestion(id: number) {
    return await get('/api/question/' + id)
}