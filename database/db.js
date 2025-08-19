// Mengimpor library yang dibutuhkan
const mysql = require('mysql2/promise');
const dotenv = require('dotenv');

// Memuat variabel dari file .env
dotenv.config();

// Membuat koneksi pool ke database
// Pool lebih efisien daripada koneksi tunggal karena dapat digunakan kembali
const pool = mysql.createPool({
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
pool.getConnection()
    .then(connection => {
        console.log('Berhasil terhubung ke database MySQL!');
        connection.release(); 
    })
    .catch(err => {
        console.error('Gagal terhubung ke database:', err.message);

        process.exit(1); 
    });

module.exports = pool;