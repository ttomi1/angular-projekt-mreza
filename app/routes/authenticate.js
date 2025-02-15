module.exports=function (express, pool){

    let authRouter = express.Router();

  authRouter.post('/register', async function (req, res) {
    try {
      console.log(req.body);

      const user = {
        username : req.body.username,
        password : req.body.password,
        email : req.body.email
      };

      if (!user.username || !user.email || !user.password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      let conn = await pool.getConnection();

      let [rows] = await conn.query(
        "SELECT * FROM users WHERE username = ? OR email = ?",
        [user.username, user.email]
      );
      console.log("Existing User Query Result:", rows);
      if (rows.length > 0) {
        conn.release();
        return res.status(400).json({ message: 'Username or email already exists' });
      }

      let result = await conn.query(
        "INSERT INTO users (username, email, password_hash) VALUES (?, ?, ?)",
        [user.username, user.email, user.password]
      );
      console.log("Insert Query Result:", result[0].insertId);

      conn.release();

      res.status(201).json({ message: 'User registered successfully!', id: result[0].insertId});

    } catch (e) {
      console.error("Error during registration:", e);
      res.status(500).json({ message: 'Internal server error' });
    }
  });

  authRouter.post('/login', async function (req, res) {
    try {
      console.log(req.body);

      const user = {
        username : req.body.username,
        password : req.body.password
      };

      if (!user.username || !user.password) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      let conn = await pool.getConnection();

      let [rows] = await conn.query("SELECT * FROM users WHERE username = ?", [user.username]);
      console.log("Existing User Query Result:", rows);
      if (rows.length === 0) {
        conn.release();
        return res.status(400).json({ message: 'Username does not exist'});
      }

      const logInUser = rows[0];

      if (user.password !== logInUser.password_hash) {
        conn.release();
        return res.status(400).json({ message: 'Incorrect password' });
      }

      conn.release();

      res.status(200).json({
        message: 'OK',
        user: rows[0]});

    } catch (e) {
      console.error("Error during signing up:", e);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


    return authRouter;
}
