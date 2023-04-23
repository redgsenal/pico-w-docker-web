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

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'))
app.use(cors());

const port = process.env.NODE_ENV === 'production' ? (process.env.PORT || 80) : 9001;

app.listen(port, () => {
    console.log("Server listening on port: ", port);
});

app.get('/', (req, res) => {
    page['title'] = "Pico W Web App";
    page['header'] = "Pico W Web App";
    dialog['message'] = "";
    res.render('home', { page: page, dialog: dialog });
});