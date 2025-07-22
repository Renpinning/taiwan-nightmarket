const next = require('next')
const http = require('http')

const dev = process.env.NODE_ENV !== 'production'
const port = process.env.PORT || process.env.IIS_NODE_PORT || 3000
const app = next({ dev })
const handle = app.getRequestHandler()

app.prepare().then(() => {
  http
    .createServer(async (req, res) => {
      try {
        await handle(req, res)
      } catch (err) {
        console.error('Error occurred handling', req.url, err)
        res.statusCode = 500
        res.end('Internal Server Error')
      }
    })
    .listen(port, (err) => {
      // 移除 hostname
      if (err) throw err
      console.log(`> Ready on port ${port}`)
    })
})
