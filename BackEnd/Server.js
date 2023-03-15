const express = require('express');
const app = express();
const mysql = require('mysql');
require('dotenv').config(); // requiring dotenv

const cors = require('cors');

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 10;

const jwt = require('jsonwebtoken');

app.use(express.json());

app.use(cors({
  origin: ['http://localhost:3000'],
  methods: ['GET', 'POST'],
  credentials: true,
}));

app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

// Session info
const Session_secret = process.env.session_secret;

app.use(
    session({
      key: 'userId',
      secret: Session_secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        expires: 60 * 60 * 24, // expires date for the cookie is 24h
      },
    }),
);

// Server info
const Server_port = process.env.Server_port;
const Server_host = process.env.Server_Host;

// Database info
const host = process.env.Database_host;
const user = process.env.Database_user;
const password = process.env.Database_password;
const DB_port = process.env.Database_DB_port;
const database = process.env.Database_database;

// JWT info
const Jwt_key = process.env.JWT_Key;

const db = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  port: DB_port,
  database: database,
});

db.connect(function(err) {
  if (err) throw err;
  console.log('Connected to MySQL!');
});

app.post('/register', (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) {
      console.log(err);
    }
    db.query(
        'INSERT INTO User (UserName, Password) VALUES (?,?)',
        [username, hash],
        (err, result) => {
          console.log(err);
        },
        console.log('inserted successfully'),
    );
  });
});

const verifyJWT = (req, res, next) => {
  const head = req.headers.authorization;
  const token = head && head.split(' ')[1];
  if (!token) {
    res.send('You need a token');
  } else {
    jwt.verify(token, Jwt_key, (err, decoded) => {
      if (err) {
        res.sendStatus(403);
      } else {
        req.userId = decoded.id;
        next();
      }
    });
  }
};

function getID(req) {

  const head = req.headers.authorization;
  let token = head && head.split(' ')[1];

  if (!token) {
    token = null;
  } else {
    jwt.verify(token, Jwt_key, (err, decoded) => {
      if (err) {
        token = null;
      } else {
        token = decoded.id;
      }
    });

  }
  return token;
}

app.get('/isUserAuth', verifyJWT, (req, res) => {
  res.send(true);
});

// checks the user is loggedIn
app.get('/login', (req, res) => {
  if (req.session.user) {
    res.send({loggedIn: true, user: req.session.user});
  } else {
    res.send({loggedIn: false});
  }
});

app.post('/login', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  db.query('SELECT * FROM User WHERE UserName = ?;',
      username,
      (err, result) => {
        if (err) {
          res.send({err: err});
        }

        if (result.length > 0) {
          bcrypt.compare(password, result[0].Password, (error, response) => {
            if (response) {
              const id = result[0].Id; // gets the Id from the database
              const token = jwt.sign({id}, Jwt_key, {
                expiresIn: 300, // token expires in 5 minutes
              });
              req.session.user = result;

              const sql = `UPDATE User SET Token =? WHERE Id = ?`;
              db.query(
                  sql,
                  [token, id],
                  (err, result) => {
                    console.log(err);
                  },
                  console.log('inserted successfully'),
              );

              res.json({auth: true, token: token, result: result});
            } else {
              res.json({auth: false, message: 'wrong email/password'});
            }
          });
        } else {
          res.json({auth: false, message: 'No user exists'});
        }
      },
  );
});

app.get('/data', (req, res) => {

  const head = req.headers.authorization;
  const token = head && head.split(' ')[1];

  if (!token) {
    res.send(403);
  } else {
    jwt.verify(token, Jwt_key, (err, decoded) => {
      if (err) {
        res.sendStatus(403);
      } else {
        const id = decoded.id;
        try {
          let sql = `SELECT * FROM Task WHERE user_Id=?`;
          db.query(sql, [id], (error, results, fields) => {
            if (error) {
              return console.error(error.message);
            }
            res.json(results);
          });
        } catch (e) {
          console.log(e);
        }

      }
    });
  }

});

app.post('/InsertData', verifyJWT, (req, res) => {

  let id = getID(req);
  const title = req.body.title;
  const date = req.body.date;
  const description = req.body.description;
  const completed = req.body.completed;

  db.query(
      'INSERT INTO Task (user_Id,Title, Date, Description, Completed) VALUES (?,?,?,?,?)',
      [id, title, date, description, completed],
      (err, result) => {
        console.log(err);
      },
      console.log('inserted the data successfully'),
      res.send(true),
  );
});

app.post('/UpdateData', verifyJWT, (req, res) => {

  const title = req.body.title;
  const date = req.body.date;
  const description = req.body.description;
  const completed = req.body.completed;
  const id = req.body.id;

  db.query(
      'UPDATE Task SET Title=?, Date=?, Description=?, Completed=? WHERE id = ?',
      [title, date, description, completed, id],
      (err, result) => {
        console.log(err);
      },
      console.log('inserted the data successfully'),
      res.send(true),
  );
});

app.post('/Delete', verifyJWT, (req, res) => {

  const id = req.body.id;

  db.query('DELETE FROM Task WHERE id=?',
      [id],
      (err, result) => {
        console.log(err);
      },
      console.log('Deleted the data successfully'),
      res.send(true),
  );
});
app.listen(Server_port,
    () =>
        console.log('The server is listening at http://%s:%s', Server_host,
            Server_port));


