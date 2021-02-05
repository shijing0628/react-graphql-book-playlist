const express = require('express')
const app = express()
const { graphqlHTTP } = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const cors = require('cors')
dotenv.config()

//middleware
app.use(express.json());
app.use(cors())


//connect mongoose
mongoose.connect(`mongodb+srv://root:${process.env.MONGODB_PASSWORD}@cluster0.rxgaf.mongodb.net/graphQL-playlist`, {
 useUnifiedTopology: true,
 useNewUrlParser: true
})

mongoose.connection.once('open', () => {
 console.log('connect to mongodb database..')
})

app.use('/graphql', graphqlHTTP({
 schema,
 graphiql: true

}))


app.listen(4000, () => {
 console.log("Now listening on the port 4000...")
})