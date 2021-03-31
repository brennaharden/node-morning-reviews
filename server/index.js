const express = require('express')
const port = 4242
const users = require('../users.json')
const app = express()

app.get('/api/users', (req, res) => {
    res.status(200).send(users)
})

app.get('/api/users/:id', (req, res) => {
    // const { id } = req.params
    let id
    if(!id) {
        return res.status(404).send('Unable to execute request.')
    }
    const user = users.find(user => {
        return user.id === +id
    })
    if(!user) {
        return res.status(500).send('Unable to find user.')
        // using return in these conditions will escape the function and prevent the rest of the logic from executing
    }

    res.status(200).send(user)
})

// QUERY

// app.get('/api/users', (req,res) => {
//     const { id } = req.query
//     if(!id) {
//         return res.status(404).send('Unable to execute request.')
//     }
//     const user = users.find(user => {
//         return user.id === +id
//     })
//     if(!user) {
//         return res.status(500).send('Unable to find user.')
//     }

//     res.status(200).send(user)
// })

// Notice how the endpoint does not indicate that we expect a query... the axios call is where the magic happens where queries are concerned. This is what that call might look like:

// axios.get(`/api/users?id=5`)


app.listen(port, () => console.log(`server is crushing it on ${port}`))
