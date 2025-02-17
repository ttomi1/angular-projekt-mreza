module.exports=function(express,pool) {

  const apiRouter = express.Router();



  apiRouter.route('/users/post/:id').post(async function(req, res){
    try{
      let conn = await pool.getConnection();
      let q = await conn.query('INSERT INTO posts(user_id, content, title) VALUES(?, ?, ?)', [req.body.id, req.body.content, req.body.title]);
      conn.release();
      res.json({status: "OK", message: "Posted post"});
    }
    catch (e) {
      console.log(e);
      res.json({status: "NOT OK", message: "Error with post query"});
    }
  }).get(async function(req, res){
    try {
      let conn = await pool.getConnection();
      let [rows] = await conn.query('SELECT posts.*, users.username, ' +
        '(SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id) AS like_count,  ' +
        '(SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id) AS comment_count' +
        ' FROM posts JOIN users ON posts.user_id = users.id WHERE posts.user_id = ? ORDER BY posts.created_at DESC', req.params.id);
      conn.release();
      res.json(rows);
    }
    catch (e){
      console.log("Error fetching posts", e);
      res.json({status: "NOT OK", message: "Error with get post"});
    }
  });


  apiRouter.route('/user/:id').get(async function(req,res){
    try{
      let conn = await pool.getConnection();
      let rows = await conn.query('SELECT * FROM USERS WHERE id = ?', req.params.id);
      conn.release();
      res.json(rows[0]);
      console.log(rows);

    }
    catch (e){
      console.log(e);
      res.json({status: "NOT OK", message: "Error with query"});
    }
  }).put(async function(req, res){
    try{

      const userId = req.params.id;
      const newBio = req.body.bio;

      console.log("Updating bio for user ID:", userId);
      console.log("New Bio:", newBio);

      let conn = await pool.getConnection();
      let q = await conn.query('UPDATE users SET bio = ? WHERE id = ?', [req.body.bio, req.params.id])
      conn.release();
      res.json({status: "OK", message: "Updates"})
    }
    catch (e) {
      console.log(e);
      res.json({status: "NOT OK", message: "Error with update query"});
    }
  });

  apiRouter.route('/posts').get(async function(req, res){
    try{
      let conn = await pool.getConnection();
      let [rows] = await conn.query('SELECT posts.*, users.username, ' +
        '(SELECT COUNT(*) FROM likes WHERE likes.post_id = posts.id) AS like_count, ' +
        '(SELECT COUNT(*) FROM comments WHERE comments.post_id = posts.id) AS comment_count' +
        ' FROM posts JOIN users ON posts.user_id = users.id ORDER BY posts.created_at DESC');
      conn.release();
      res.json(rows);
    }
    catch (e){
      console.log("Error fetching posts", e);
      res.json({status: "NOT OK", message: "Error with get post"});
  }
  });

  apiRouter.post('/like/:id', async function(req, res){
    try {
      let conn = await pool.getConnection();
      const postId = req.params.id;
      const userId = req.body.userId;

      let [existingLike] = await conn.query('SELECT * FROM likes WHERE post_id = ? AND user_id = ?', [postId, userId]);

      if (existingLike.length > 0) {
        await conn.query('DELETE FROM likes WHERE post_id = ? AND user_id = ?', [postId, userId]);
        conn.release();
        return res.json({ status: "OK", message: "Like removed!", liked: false });
      } else {
        await conn.query(
          'INSERT INTO likes (post_id, user_id) VALUES (?, ?)', [postId, userId]);
        conn.release();
        return res.json({ status: "OK", message: "Post liked!", liked: true });
      }
    } catch (e) {
      console.error("Error toggling like:", e);
      res.status(500).json({ status: "NOT OK", message: "Error toggling like" });
    }
  });

  apiRouter.route('/comments/:id').post(async function(req, res){
    try {
      let conn = await pool.getConnection();
      const postId = req.params.id;
      const userId = req.body.user_id;
      const content = req.body.content;

      if (!content) {
        return res.status(400).json({ status: "NOT OK", message: "Comment cannot be empty" });
      }

      await conn.query('INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)', [postId, userId, content]);
      conn.release();
      res.json({ status: "OK", message: "Comment added successfully!" });
    } catch (e) {
      console.error("Error adding comment:", e);
      res.status(500).json({ status: "NOT OK", message: "Error adding comment" });
    }
  }).get(async function(req, res){
    try{
      let conn = await pool.getConnection();
      const postId = req.params.id;
      let [comments] = await conn.query('SELECT comments.*, users.username FROM comments ' +
        'JOIN users ON comments.user_id = users.id WHERE comments.post_id = ? ' +
        'ORDER BY comments.created_at DESC', [postId]);
      conn.release();
      res.json(comments);
    }
    catch (e) {
      console.log("Error fetching comments", e);
      res.status(500).json({status: "NOT OK", message: "Error fetching comments"});
    }
  });

  return apiRouter;
}
