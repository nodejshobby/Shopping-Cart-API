require("dotenv").config();
require("../config/connectMongo");
const Product = require("../model/productModel");
const dataProducts = [
  { name: "Brush", price: 20, image: "http://localhost:3000" },
  { name: "Packer", price: 60, image: "http://localhost:3000" },
  { name: "Handkerchief", price: 100, image: "http://localhost:3000" },
  { name: "Backpack", price: 2600, image: "http://localhost:3000" },
  { name: "Chair", price: 5000, image: "http://localhost:3000" },
  { name: "Mini Laptop", price: 60000, image: "http://localhost:3000" },
  { name: "Smartphone", price: 40000, image: "http://localhost:3000" },
];
const insert = () => {
  dataProducts.forEach((product) => {
    Product(product)
      .save()
      .then((data) => {
        console.log(`${data.name} was sucesfully inserted`);
      })
      .catch((error) => {
        console.log(error.message);
      });
  });
  console.log("Products seeding was sucessful!");
};

insert();
