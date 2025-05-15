import express from 'express';

const jsonMiddleware = [
    express.json(),
    express.urlencoded({extended: true})
];

export default jsonMiddleware;