import Koa from 'koa'
import Router from 'koa-router'
import Path from 'path'
import fs from 'fs'
import mime from 'mime'
const app = new Koa()
const router = new Router()
router.get(/(^\/index(.html)?$)|(^\/$)/, async(ctx, next) => {
  console.log('here')
  ctx.type = 'text/html'
  fs.readFile(Path.join(__dirname, './static/index.html'), async (err, data) => {
    if(err) console.log('读取文件失败')
    ctx.body = data
    await next()
  })
  
})
// 处理图片
router.get(/\S*\.(jpe?g|png)$/, async (ctx, next) => {
  const { path } = ctx;
  ctx.type = mime.getType(path) || 'image/jpg'

 fs.readFile(Path.join(__dirname, `.${path}`), (err, data) => {
    if(err) console.log('读取文件失败')
    ctx.body = data
  });

  await next();
});
app.use(router.routes()).use(router.allowedMethods());
// app.use(async ctx => {
//   ctx.body = 'hello'
// })
app.listen(3000)
process.on('unhandledRejection', err => {
  console.error('有 promise 没有 catch', err);
});