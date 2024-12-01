import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "bookNotes",
  password: "19Soeren.",
  port: 5433,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let books = [
    { id: 1, title: "Blackout", author: "Marc Elsberg", review: "Really good", content: "Morgen ist es zu spät ist der Titel eines im Jahr 2012 veröffentlichten Technik-Thrillers des österreichischen Autors Marc Elsberg. Der in der Gegenwart spielende Roman erzählt über einen Zeitraum von zwei Wochen die katastrophalen Auswirkungen eines großflächigen Stromausfalls in Europa."},
    { id: 2, title: "Space", author: "Einstein", review: "spacy", content: "About stars"},
];

app.get("/", async (req, res) => {
  res.render("index.ejs");
});

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
