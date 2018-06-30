const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

let app = express();

hbs.registerPartials(__dirname + '/views/partials');

app.set('view engine', 'hbs');

app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    const now = new Date().toString();
    let log = `${now} : ${req.method} ${req.url} \n`;
    fs.appendFile('server.log', log, (err) => {
        if(err) {
            log('unable to write to server.log file');
        }
    });
    next();
})

/* app.use((req, res, next) => {
    res.render('maintenance');
}); */

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home',
        welcomeMessage: 'Welcome to my demo application'
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res) => {
    res.send({
        errorMessage: 'Unable to handle request..'
    })
});

app.listen(port, () => {
   console.log(`app listering in port ${port}`);
});

