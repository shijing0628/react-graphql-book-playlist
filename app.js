const express = require('express')
const app = express()
const { graphqlHTTP } = require('express-graphql')

//middleware
app.use(express.json());

app.use('/graphql', graphqlHTTP({

}))


app.listen(4000, () => {
 console.log("Now listening on the port 4000...")
})