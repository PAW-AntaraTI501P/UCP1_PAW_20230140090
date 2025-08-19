const express = require('express');
const expressEjsLayouts = require('express-ejs-layouts');
const bookRouter = require('./routes/bookdb');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.use(expressEjsLayouts);
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', {
        layout: 'layouts/main-layout',
        title: 'Halaman Utama'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        layout: 'layouts/main-layout',
        title: 'Halaman Kontak'
    });
});

app.use('/book', bookRouter);

app.use((req, res) => {
    res.status(404);
    res.send('<h1>404: Halaman tidak ditemukan</h1>');
});

app.listen(port, () => {
    console.log(`Aplikasi berjalan di http://localhost:${port}`);
});
