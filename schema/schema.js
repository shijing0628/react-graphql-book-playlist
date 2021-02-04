const graphql = require('graphql')
//lodash loop through an array easier
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt,
 GraphQLList } = graphql

//data
var books = [
 { name: "Wind", genre: "Fantasy", id: "1", authorId: '1' },
 { name: "Empire", genre: "Fantasy", id: "2", authorId: '2' },
 { name: "Long Earth", genre: "Sci-Fi", id: "3", authorId: '3' },
 { name: "Color", genre: "Fantasy", id: "4", authorId: '2' },
 { name: "Garden", genre: "Fantasy", id: "5", authorId: '3' },
 { name: "Smile", genre: "Sci-Fi", id: "6", authorId: '3' }
];

var authors = [
 { name: "Jeo", age: "48", id: "1" },
 { name: "Leo", age: "47", id: "2" },
 { name: "John", age: "46", id: "3" }
];

const BookType = new GraphQLObjectType({
 name: 'Book',
 fields: () => ({
  id: { type: GraphQLID },
  name: { type: GraphQLString },
  genre: { type: GraphQLString },
  author: {
   type: AuthorType,
   resolve(parent, args) {
    return _.find(authors, { id: parent.authorId })
   }
  }
 })
})

const AuthorType = new GraphQLObjectType({
 name: 'Author',
 fields: () => ({
  id: { type: GraphQLID },
  name: { type: GraphQLString },
  age: { type: GraphQLInt },
  books: {
   type: new GraphQLList(BookType),
   resolve(parent, args) {
    return _.filter(books, { authorId: parent.id })
   }
  }
 })
})

const RootQuery = new GraphQLObjectType({
 name: 'RootQuery',
 fields: {
  book: {
   type: BookType,
   args: { id: { type: GraphQLID } },
   resolve(parent, args) {
    //get data from db
    return _.find(books, { id: args.id })
   }
  },
  author: {
   type: AuthorType,
   args: { id: { type: GraphQLID } },
   resolve(parent, args) {
    //get data from db
    return _.find(authors, { id: args.id })
   }
  },
  books: {
   type: new GraphQLList(BookType),
   resolve(parent, args) {
    return books
   }
  },
  authors: {
   type: new GraphQLList(AuthorType),
   resolve(parent, args) {
    return authors
   }
  },
 }
})


module.exports = new GraphQLSchema({
 query: RootQuery
})