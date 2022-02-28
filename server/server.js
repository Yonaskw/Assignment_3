const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

const productsDB = [
  {
    id: 1, 
    Category: 'Shirts', 
    Name: 'Blue Shirt', 
    Price:25.99, 
    Image: 'https://tinyurl.com/5ajt3n69',
  },
  {
    id: 2, 
    Category: 'Jeans', 
    Name: 'Brown Denim', 
    Price:77.99, 
    Image: 'https://tinyurl.com/3evtk3pu',
  },
  {
    id: 3, 
    Category: 'Accessories', 
    Name: 'Sunglass', 
    Price:100.05, 
    Image: 'https://tinyurl.com/mub6afuh',
  },
  {
    id: 4, 
    Category: 'Jackets', 
    Name: 'Sports Coat', 
    Price:209.88, 
    Image: 'https://tinyurl.com/mub6afuh',
  },
  {
    id: 5, 
    Category: 'Sweaters', 
    Name: 'Cardigan', 
    Price:78.88, 
    Image: 'https://tinyurl.com/mub6afuh',
  },
 
];

const resolvers = {
  Query: {
    productList,
  },
  Mutation: {
    addProduct,
  },
};

function addProduct(_, { product }) {
  product.id = productsDB.length + 1;
  productsDB.push(product);
  return product;
}

function productList() {
  return productsDB;
}
const server = new ApolloServer({
  typeDefs: fs.readFileSync('./server/schema.graphql', 'utf-8'),
  resolvers,
});

const app = express();
app.use(express.static('public'));
server.applyMiddleware({ app, path: '/graphql' });
app.listen(3000, function () {
  console.log('App started on port 3000');
});