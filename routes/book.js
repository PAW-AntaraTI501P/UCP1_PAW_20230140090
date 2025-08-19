const express = require('express');
const router = express.Router();

const db = require('../database/db'); 

router.get('/', async (req, res) => {
    try {
        
        const [rows] = await db.query('SELECT * FROM book');

      
        res.render('books-page', { 
            books: rows,
            layout: 'layouts/main-layout', 
            title: 'Daftar Buku'
        });

    } catch (err) {
        console.error('Error saat mengambil data buku:', err);
        res.status(500).send('Terjadi kesalahan pada server');
    }
});

module.exports = router;