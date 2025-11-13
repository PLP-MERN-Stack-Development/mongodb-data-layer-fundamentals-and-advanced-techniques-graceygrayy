const { MongoClient } = require("mongodb");
const uri = "mongodb+srv://MERN-STACK:Tinaa11@cluster0.1iaujfx.mongodb.net/StudentDb";
const client = new MongoClient(uri);

async function run() {
  try {
    await client.connect();
    const db = client.db("plp_bookstore");
    const books = db.collection("books");

    // -------------------
    // Task 2: CRUD
    console.log("All Fantasy Books:", await books.find({ genre: "Fantasy" }).toArray());
    console.log("Books after 2010:", await books.find({ published_year: { $gt: 2010 } }).toArray());
    console.log("Books by Harper Lee:", await books.find({ author: "Harper Lee" }).toArray());

    await books.updateOne({ title: "Dune" }, { $set: { price: 18.00 } });
    console.log("Updated Dune price");

    await books.deleteOne({ title: "The Road" });
    console.log("Deleted 'The Road'");

    // -------------------
    // Task 3: Advanced Queries
    console.log("In-stock books after 2010:", await books.find({ in_stock: true, published_year: { $gt: 2010 } }).toArray());
    console.log("Projection (title, author, price):", await books.find({}, { projection: { title: 1, author: 1, price: 1, _id: 0 } }).toArray());
    console.log("Sorted by price ascending:", await books.find().sort({ price: 1 }).toArray());
    console.log("Sorted by price descending:", await books.find().sort({ price: -1 }).toArray());
    console.log("Page 1 (5 books):", await books.find().limit(5).toArray());
    console.log("Page 2 (5 books):", await books.find().skip(5).limit(5).toArray());

    // -------------------
    // Task 4: Aggregation
    console.log("Average price by genre:", await books.aggregate([{ $group: { _id: "$genre", avgPrice: { $avg: "$price" } } }]).toArray());
    console.log("Author with most books:", await books.aggregate([{ $group: { _id: "$author", count: { $sum: 1 } } }, { $sort: { count: -1 } }, { $limit: 1 }]).toArray());
    console.log("Books by decade:", await books.aggregate([
      { $group: { _id: { $floor: { $divide: ["$published_year", 10] } }, count: { $sum: 1 } } },
      { $project: { decade: { $concat: [{ $toString: { $multiply: ["$_id", 10] } }, "s"] }, count: 1, _id: 0 } }
    ]).toArray());

    // -------------------
    // Task 5: Indexing
    await books.createIndex({ title: 1 });
    await books.createIndex({ author: 1, published_year: 1 });
    console.log("Indexes created");
    console.log("Explain for 'Dune':", await books.find({ title: "Dune" }).explain("executionStats"));

  } finally {
    await client.close();
  }
}

run().catch(console.dir);
