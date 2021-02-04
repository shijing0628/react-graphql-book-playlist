const graphql = require('graphql')
//lodash loop through an array easier
const _ = require('lodash')
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt,
 GraphQLList, GraphQLNonNull } = graphql
const Book = require('../../server/models/book')
const Author = require('../../server/models/author')


//test data
// var books = [
//  { name: "Wind", genre: "Fantasy", id: "1", authorId: '1' },
//  { name: "Empire", genre: "Fantasy", id: "2", authorId: '2' },
//  { name: "Long Earth", genre: "Sci-Fi", id: "3", authorId: '3' },
//  { name: "Color", genre: "Fantasy", id: "4", authorId: '2' },
//  { name: "Garden", genre: "Fantasy", id: "5", authorId: '3' },
//  { name: "Smile", genre: "Sci-Fi", id: "6", authorId: '3' }
// ];

// var authors = [
//  { name: "Jeo", age: "48", id: "1" },
//  { name: "Leo", age: "47", id: "2" },
//  { name: "John", age: "46", id: "3" }
// ];

const BookType = new GraphQLObjectType({
 name: 'Book',
 fields: () => ({
  id: { type: GraphQLID },
  name: { type: GraphQLString },
  genre: { type: GraphQLString },
  author: {
   type: AuthorType,
   resolve(parent, args) {
    //test code before connect DB
    // return _.find(authors, { id: parent.authorId })
    return Author.findById(parent.authorId)
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
    // return _.filter(books, { authorId: parent.id })
    return Book.find({ authorId: parent.id })
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
    // return _.find(books, { id: args.id })
    return Book.findById(args.id);
   }
  },
  author: {
   type: AuthorType,
   args: { id: { type: GraphQLID } },
   resolve(parent, args) {
    //get data from db
    // return _.find(authors, { id: args.id })
    return Author.findById(args.id)
   }
  },
  books: {
   type: new GraphQLList(BookType),
   resolve(parent, args) {
    return Book.find({})
   }
  },
  authors: {
   type: new GraphQLList(AuthorType),
   resolve(parent, args) {
    return Author.find({})
   }
  },
 }
})

const Mutation = new GraphQLObjectType({
 name: 'Mutation',
 fields: {
  // add author to database
  addAuthor: {
   type: AuthorType,
   args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    age: { type: new GraphQLNonNull(GraphQLInt) }
   },
   resolve(parent, args) {
    let author = new Author({
     name: args.name,
     age: args.age
    });
    return author.save()
   }
  },

  addBook: {
   type: BookType,
   args: {
    name: { type: new GraphQLNonNull(GraphQLString) },
    genre: { type: new GraphQLNonNull(GraphQLString) },
    authorId: { type: new GraphQLNonNull(GraphQLID) }
   },
   resolve(parent, args) {
    let book = new Book({
     name: args.name,
     genre: args.genre,
     authorId: args.authorId
    });
    return book.save()
   }
  },
 }
})


module.exports = new GraphQLSchema({
 query: RootQuery,
 mutation: Mutation
})