'use strict';
const express = require('express');
const request = require('request');
const cors = require('cors');
const handlebars = require('express-handlebars');

const app = express();

const hbs = handlebars.create({
    defaultLayout: 'page',
    layoutsDir: __dirname + '/views/layouts',
    extname: '.hbs'
});

const page = [];
const dialog = [];
var swv = '';

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(cors());

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 9001;

function isEmpty(v) {
    console.log(v);
    return !isNotEmpty(v)
}

function isNotEmpty(v) {
    console.log(v);
    return (typeof v !== 'undefined' && v.length > 0);
}

function sendSwitchValue(res, swv) {
    const message = {
        switch: swv
    };
    return res.send(message);
}

app.listen(port, () => {
    console.log("Server listening on port: ", port);
});

app.get('/', (req, res) => {
    page['title'] = "Pico W Web App";
    page['header'] = "Pico W Web App";
    page['swv'] = swv;
    dialog['message'] = "";
    res.render('home', { page: page, dialog: dialog });
});

app.get('/api/v1/switch', (req, res) => {
    console.log('switch here');
    swv = req.query.v;
    if (isEmpty(swv)) {
        swv = 0;
    }
    sendSwitchValue(res, swv);
});

app.get('/api/v1/switch/:v', (req, res) => {
    console.log('switch here');
    swv = req.params.v;
    if (isEmpty(swv)) {
        swv = 0;
    }
    sendSwitchValue(res, swv);
});

