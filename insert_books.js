const { MongoClient } = require("mongodb");

const uri = "mongodb+srv://MERN-STACK:Tinaa11@cluster0.1iaujfx.mongodb.net/StudentDb"
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    const bookList = [
      {
        title: "The Great Gatsby",
        author: "F. Scott Fitzgerald",
        genre: "Classic",
        published_year: 1925,
        price: 12.99,
        in_stock: true,
        pages: 218,
        publisher: "Scribner"
      },
      {
        title: "Atomic Habits",
        author: "James Clear",
        genre: "Self-help",
        published_year: 2018,
        price: 18.5,
        in_stock: true,
        pages: 320,
        publisher: "Penguin"
      },
      // Add the 7 additional books you inserted in Compass here
    ];

    const result = await books.insertMany(bookList);
    console.log(`${result.insertedCount} books inserted`);
  } finally {
    await client.close();
  }
}

run().catch(console.dir);
