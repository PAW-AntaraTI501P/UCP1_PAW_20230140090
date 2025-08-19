const express = require('express');
const router = express.Router();
const db = require('../database/db');

router.get('/', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM book ORDER BY id DESC');
        res.render('books-page', {
            books: rows,
            layout: 'layouts/main-layout',
            title: 'Daftar Buku'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/add', (req, res) => {
    res.render('add-book', {
        layout: 'layouts/main-layout',
        title: 'Tambah Buku Baru'
    });
});

router.post('/add', async (req, res) => {
    try {
        const { Name, completed } = req.body;
        const sql = 'INSERT INTO book (Name, completed) VALUES (?, ?)';
        await db.query(sql, [Name, completed || 0]);
        res.redirect('/book');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const [rows] = await db.query('SELECT * FROM book WHERE id = ?', [id]);
        res.render('edit-book', {
            book: rows[0],
            layout: 'layouts/main-layout',
            title: 'Edit Buku'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.post('/update/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { Name, completed } = req.body;
        const sql = 'UPDATE book SET Name = ?, completed = ? WHERE id = ?';
        await db.query(sql, [Name, completed || 0, id]);
        res.redirect('/book');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await db.query('DELETE FROM book WHERE id = ?', [id]);
        res.redirect('/book');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;