const pool = require('../pool.js')

const checkAdmin = (routes) => (req, res, next) =>
{
  let session = req.session
  let authorized = !!session.authorized
  let admin = !!session.admin

  let skipAuthUrls = []
  for (let r in routes.admin) {
    if (routes.admin[r].skipAuth) {
      skipAuthUrls.push(routes.admin[r].url)
    }
  }

  if (!(skipAuthUrls.includes(req.originalUrl)) === (authorized && admin)) {
    return next()
  }
  res.redirect(authorized && admin ? routes.admin.admin.url : routes.admin.adminlogin.url)
}

const showLogin = routes => (req, res) =>
{
  (async _ =>
    {
      let session = req.session
      let authorized = session.authorized
      let admin = session.admin

      if (authorized && admin) {
        res.redirect(routes.admin.admin.url)
      }

      res.render('admin/login', {
        routes : routes,
        unauthorized : true
      })
    }
  )()
}

const processLogin = routes => (req, res) =>
{
  (async _ =>
    {
      const client = await pool.connect()

      let [login, password] = [req.body.login, req.body.password]

      const userCheck = await client.query({
        text : "SELECT * from users WHERE login = $1 AND password = crypt($2, password)",
        values : [login, password]
      })

      client.release()

      if (userCheck.rows.length > 0) {
        let session = req.session
        session.userId = userCheck.rows[0].id
        session.authorized = true
        session.admin = userCheck.rows[0].admin
        session.login = userCheck.rows[0].login
        res.redirect(routes.admin.admin.url)
      }
      else {
        res.redirect(routes.admin.adminlogin.url)
      }
    }
  )()
}

const logout = routes => (req, res) =>
{
  (async _ =>
    {
      let session = req.session
      if (session.authorized) {
        req.session.destroy(_ =>
          {
            res.redirect(routes.admin.adminlogin.url)
          }
        )
      }
    }
  )()
}

module.exports = { checkAdmin, showLogin, processLogin, logout }
