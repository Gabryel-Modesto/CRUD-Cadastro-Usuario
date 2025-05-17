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


router.post('/users/insertusers/', (req, res) => {
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


router.put('/users/updateusers/:id_user', (req, res) => {
    const id_user = parseInt(req.params.id_user);
    const {name_user, email_user} = req.body;

    const sql = `UPDATE users SET name_user = COALESCE(?, name_user),
                email_user = COALESCE(?, email_user)
                WHERE id_user = ?`;

    db.query(sql, [name_user, email_user, id_user], (err, result) => {
        if(err){
            console.error(err);
            return res.status(500).send('Erro ao atulizar o usuário');
        };

        if(result.affectedRows === 0) {
            return res.status(400).json({mensagem: 'Usuário não encontrado'});
        };
        
        res.status(200).json({mensagem: 'Usuário atualizado com sucesso!'});
    });
});

router.delete('/users/deleteusers/:id_user', (req, res) => {
    const id_user = parseInt(req.params.id_user);

    const sql = `DELETE FROM users WHERE id_user = ?`;
    
    db.query(sql, [id_user], (err, result) => {
        if(err ) {
            console.error(err);
            return res.status(500).json({mensagem: 'Erro ao deletar usuário'});
        };

        if(result.affectedRows === 0) {
           return res.status(400).json({mensagem: 'Usuário não encontrado'});
        };

        res.status(200).json({mensagem: 'Usuário deletado com sucesso!'});
    });
});

export default router;