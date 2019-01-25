const express = require('express') // Request express
const hbs = require('hbs') // Require handle bars
const fs = require('fs')

const port = process.env.PORT || 3000

const app = express() // Initiate the server

hbs.registerPartials(__dirname+'/views/partials') // Calling partials
app.set('view engine', 'hbs') // Set the handle bars as the view engine


app.use((req, res, next)=>{
    const now = new Date().toString()
    const log = `${now}: ${req.method} ${req.url}`

    console.log(log)

    fs.appendFile('server.log', log + '\n', (err)=> {
        if(err){
            console.log('Unable to append to server.log')
        }
    })
    next()
})

// app.use((req, res, next)=>{
//     res.render('maintnance.hbs', {
//         pageTitle: 'Under maintnance'
//     })
// })

app.use(express.static(__dirname+'/public')) // Order to server to server the public directory

hbs.registerHelper('getCurrentYear', () => { // Sample of exporting current year
    return new Date().getFullYear()
})

hbs.registerHelper('screamIt', (text) => { // Sample of taking text and manipulate to uppercase
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome'
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    })
})

app.get('/bad', (req, res) => {
    res.send({
        error: 'Bad request'
    })
})

app.listen(port, ()=> {
    console.log('Server is up on port 3000') // Show a message when server is up
}) // Listen to port 3000