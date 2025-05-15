import express from 'express';
import db from '../db/db.js'


const router = express.Router();

router.get('/', (req, res) => {
    res.send("Olaaaaa");
});

router.get('/users', (req, res) => {
    const sql = `SELECT * FROM users`

    db.query(sql, (err, results) => {
        if(err) {
            console.log(err);
            return res.status(500).send('Erro ao buscar dados');
        };
        res.json(results);
    });
});


router.post('/users/insertusers', (req, res) => {
    const {name_user, email_user} = req.body;

    const sql = `INSERT INTO users (name_user, email_user) VALUES (?, ?)`;

    db.query(sql, [name_user, email_user], (err) => {
        if(err) {
            console.error(err)
            return res.status(500).send('Erro ao enviar os dados');
        };

        res.redirect('/');
    });

});

export default router;