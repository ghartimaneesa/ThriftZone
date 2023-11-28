const mongoose = require('mongoose');
const mongoURI = "mongodb://127.0.0.1:27017/ThriftZone";
mongoose.set("strictQuery", false);
const mongoDB = async () => {
  await mongoose.connect(mongoURI, { useNewUrlParser: true }, (err, result) => {
    if (err) console.log('---', err);
    else {
      console.log("Connected to database Successfully");
      async function fetchData() {
        const fetch_data = await mongoose.connection.db.collection("carts");
        const data = await fetch_data.find({}).toArray();
        const fetch_productcategory = await mongoose.connection.db.collection("category");
        productcategory = await fetch_productcategory.find({}).toArray();
          if (err) console.log(err);
          else {
            global.carts = data;
            global.category = productcategory;
            // console.log(global.carts);
          }
        
      }

      fetchData();
    }
  });
}

module.exports = mongoDB;
