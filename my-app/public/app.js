const express = require('express');
const expressHandlebars = require('express-handlebars')
const app = express();
const fortune = require('./lib/fortune')

app.engine('handlebars', expressHandlebars.engine({
    defaultLayout: 'main',
}))

app.set('view engine', 'handlebars');

app.use(express.static(__dirname + '/pablic'))

const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.render('home'))

app.get('/about', (req, res) => {
    res.render('about', {fortune: fortune.getFortune})
})


app.use((req, res) => {
    res.status(404)
    res.render('404')
})

app.use((req, res, next) => {
    console.error(err.message)
    res.status(500)
    res.render('500')
})

app.listen(port, () => console.log(`Express було запущено на http://localhost:${port} `))