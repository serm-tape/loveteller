require("babel-core").transform("code");

import express from 'express'
import path from 'path'

const api = express.Router()

const app = express();
app.use('/favicon.ico', express.static(path.resolve(__dirname, '../frontend/public/img/favicon.ico')))
app.use('/img/', express.static(path.resolve(__dirname, '../frontend/public/img')))
app.use('/font-awesome/', express.static(path.resolve(__dirname, '../node_modules/font-awesome')))

app.get('/bundle.js', (req, res, next) => {
	res.sendFile(path.resolve(__dirname, '../frontend', 'built', 'bundle.js'))
})

app.get('*', (req, res, next) => {
	res.sendFile(path.resolve(__dirname, '../frontend', 'index.html'))
})

app.listen(3004, function () {
	console.log('Example app listening on port 3004!');
})