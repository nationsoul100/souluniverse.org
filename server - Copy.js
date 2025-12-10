const express = require("express");
const sql = require("mssql");
const app = express();
app.use(express.json());

// Your SQL Server connection config
const config = {
  user: "sa",
  password: "123456",
  server: "LAPTOP-0BE17S18\SQLEXPRESS",   // or your server name
  database: "LikeSystem",
  options: {
    trustServerCertificate: true
  }
};

// POST route to add or update reaction
app.post("/react", async (req, res) => {
  const { userId, postId, reactionType } = req.body;
  try {
    await sql.connect(config);
    await sql.query`
      EXEC AddReaction @UserID=${userId}, @PostID=${postId}, @ReactionType=${reactionType}
    `;
    res.send("Reaction saved successfully");
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.get("/reactions", async (req, res) => {
  try {
    await sql.connect(config);
    const result = await sql.query`SELECT * FROM UserReactions`;
    res.json(result.recordset);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(3000, () => console.log("Server running on http://localhost:3000"));
