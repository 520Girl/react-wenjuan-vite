const Koa = require('koa');
const Route = require('koa-router');
const mockList = require('./mock');

const app = new Koa();
const router = new Route();

//手动延迟
const handleTime = (fn, ctx)=>{
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(fn(ctx))
        }, 500)
    })
}

mockList.forEach((item) => {
    const { url, method, response } = item

    router[method](url, async (ctx) => {
        ctx.body = await handleTime(response, ctx)
    })
})

app.use(router.routes());
const server = app.listen(3001,()=>{
    const address = server.address();
    const host = address.address === '::' ? 'localhost' : address.address;
    const port = address.port;
    console.log(`Mock server is running at http://${host}:${port}`);
})