import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import axios from "axios";

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
    { id: 1, title: "Blackout", author: "Marc Elsberg", rating: "2/10", content: "Morgen ist es zu spät ist der Titel eines im Jahr 2012 veröffentlichten Technik-Thrillers des österreichischen Autors Marc Elsberg. Der in der Gegenwart spielende Roman erzählt über einen Zeitraum von zwei Wochen die katastrophalen Auswirkungen eines großflächigen Stromausfalls in Europa."},
    { id: 2, title: "Space", author: "Einstein", rating: "8/10", content: "About stars"},
];

let input = [];


app.get("/", async (req, res) => {
  try {

    //const response = await axios.get(`https://covers.openlibrary.org/b/isbn/${input[0]}-M.jpg`)
    //console.log(book.request);
    
    //console.log(pictureUrl);
    
    
    res.render("index.ejs");
  } catch (error) {
    
  }
});

app.post("/add", async(req,res) => {
  try {
    const newBook = req.body.isbn;
    const pictureResponse = await axios.get(`https://covers.openlibrary.org/b/isbn/${newBook}-M.jpg`);
    const picture = pictureResponse.request.res.responseUrl;
    const book = await axios.get(`https://openlibrary.org/search.json?q=${newBook}`);
    const isbn = book.data.docs[0].isbn[0];
    const title = book.data.docs[0].title;
    const author = book.data.docs[0].author_name[0];

    console.log(title, author, picture, isbn);
    

    // await db.query(
    //   'INSERT INTO books (title, picture, isbn, author) VALUES($1, $2, $3, $4)', 
    //   [title, picture, isbn, author]
    // )
    //console.log(newBook);
    
    res.redirect("/");
  } catch (error) {
    
  }
})

app.listen(port, () => {
  console.log(`Server running on port http://localhost:${port}`);
});
