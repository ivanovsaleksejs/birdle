const express = require('express')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser")
const sessions = require('express-session')
const connectRedis = require('connect-redis')
const Redis = require("ioredis")
const crypto = require('crypto')
const ws = require('ws')
const config = require('config')

const app = express()
const port = 3000

const wsServer = new ws.Server(
  {
    noServer : true,
    path : '/ws'
  }
)

const RedisStore = connectRedis(sessions)

const redisClient = new Redis(6379, 'localhost')

const router = express.Router()
const { routes } = require('./routes.js')
const { checkAdmin } = require('./admin/admin.js')

const session = sessions(
  {
    store: new RedisStore(
      {
        client: redisClient
      }
    ),
    name : 'birdle',
    secret : config.get('session_secret'),
    credentials : true,
    saveUninitialized : false,
    cookie :
    {
      maxAge : 1000 * 60 * 60 * 24 * 7 * 365
    },
    resave : false
  }
)

app.set('view engine', 'pug')
app.set('views', __dirname + '/views')

app.use(express.static('public/'))
app.use(cookieParser())

app.use(bodyParser.json(
  {
    limit : '150mb'
  }
))

app.use(bodyParser.urlencoded(
  {
    limit : '150mb',
    extended : true
  }
))

app.use(session)

router.use('/admin', checkAdmin(routes))

for (let entry in {admin : routes.admin, public : routes.public}) {
  for (let route in routes[entry]) {
    route = routes[entry][route]
    router[route.method](route.url, route.action(routes))
  }
}

app.use('/', router)

wsServer.on('connection', (socket, req) =>
  {
    session(req, {}, _ => {})
    socket.on('error', console.error)
    socket.on('message', async message =>
      {
        let msg = message.toString()

        for (let route in routes.ws) {
          if (msg.indexOf(routes.ws[route].command) === 0) {
            let arg = msg.split(' ')[1] ?? null
            let res = await routes.ws[route].action(arg, req)

            socket.send(res)
          }
        }
      }
    )
  }
)

const server = app.listen(port)

server.on('upgrade', (request, socket, head) =>
  {
    wsServer.handleUpgrade(request, socket, head, socket =>
      {
        wsServer.emit('connection', socket, request)
      }
    )
  }
)
