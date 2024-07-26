//定义请求的git 和 post

const HOST = 'http://localhost:3001'

export async function get(url: string): Promise<any> {
    const response = await fetch(`${HOST}${url}`, {
        method: 'GET',
    })
    return response.json()
}

export async function post(url: string, params: any = {}): Promise<any> {
    const response = await fetch(`${HOST}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(params)
    })
    return response.json()
}