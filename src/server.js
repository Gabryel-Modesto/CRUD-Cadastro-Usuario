import express from 'express';
import jsonMiddleware from './middlewares/json.js';
import router from './routes/routes-users.js';

const app = express();
const PORT = 3333;

app.use(jsonMiddleware);
app.use(router);


app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});