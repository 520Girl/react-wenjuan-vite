
import {post} from './ajax'


export async function setAnswer(params: any) {
    return await post('/api/answer',params)
}