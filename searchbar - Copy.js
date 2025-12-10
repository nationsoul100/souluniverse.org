const soulDocuments = [
  { title: "Citizenship Code", content: "Strictly vegetarian food, no alcohol, ethical living..." },
  { title: "Diplomatic Dispatch", content: "SOUL Nation's outreach to embassies and scientific bodies..." },
  { title: "Scientific Charter", content: "Mapping Bir Tawil and Antarctica with solar orientation..." },
  { title: "Ethical Manifesto", content: "Justice, equality, and environmental stewardship..." },
  // Add more documents here
];

function searchSoulContent() {
  const query = document.getElementById("soulSearch").value.toLowerCase();
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = "";

  if (!query) return;

  const results = soulDocuments.filter(doc =>
    doc.title.toLowerCase().includes(query) ||
    doc.content.toLowerCase().includes(query)
  );

  if (results.length === 0) {
    resultsContainer.innerHTML = "<p>No matches found within SOUL Nation’s archives.</p>";
    return;
  }

  results.forEach(doc => {
    const resultItem = document.createElement("div");
    resultItem.innerHTML = `<strong>${doc.title}</strong><p>${doc.content}</p><hr>`;
    resultsContainer.appendChild(resultItem);
  });
}

const express = require("express");
const sql = require("mssql");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

// SQL Server configuration
const dbConfig = {
  user: "sa",
  password: "123456",
  server: "LAPTOP-0BE17S18\SQLEXPRESS", // e.g. "localhost"
  database: "SearchBarOption",
  options: {
    encrypt: false, // for Azure
    trustServerCertificate: true // for local dev
  }
};

// API endpoint for search
app.post("/search", async (req, res) => {
  const query = req.body.query;

  try {
    await sql.connect(dbConfig);
    const result = await sql.query`
      SELECT Title, Content 
      FROM SoulDocuments 
      WHERE Title LIKE ${'%' + query + '%'} 
         OR Content LIKE ${'%' + query + '%'}
    `;
    res.json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).send("Database error");
  }
});

app.listen(3000, () => {
  console.log("SOUL Nation search API running on port 3000");
});
document.getElementById("soulSearch").addEventListener("keydown", async function(event) {
  if (event.key === "Enter") {
    event.preventDefault(); // prevent form submission if inside a form
    await searchSoulContent();
  }
});

async function searchSoulContent() {
  const query = document.getElementById("soulSearch").value;
  const resultsContainer = document.getElementById("searchResults");
  resultsContainer.innerHTML = "";

  if (!query) return;

  try {
    const response = await fetch("/search", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query })
    });

    const results = await response.json();

    if (results.length === 0) {
      resultsContainer.innerHTML = "<p>No matches found in SOUL Nation’s archives.</p>";
      return;
    }

    results.forEach(doc => {
      const resultItem = document.createElement("div");
      resultItem.innerHTML = `<strong>${doc.Title}</strong><p>${doc.Content}</p><hr>`;
      resultsContainer.appendChild(resultItem);
    });
  } catch (err) {
    resultsContainer.innerHTML = "<p>Error connecting to database.</p>";
  }
}