const express = require('express')
const bodyParser = require('body-parser')
const Blockchain = require('../blockchain/index')

const HTTP_PORT = process.env.PORT | 3001

const app = express()

app.use(bodyParser.json())

const blockchain = new Blockchain();

app.get("/blocks", (req, res)=>{
    res.json(blockchain.chain);
})

app.post("/mine", (req, res)=>{
    const block = blockchain.addBlock(req.body.data)
    console.log("New block added : ", block)
    res.redirect('/blocks')
})

app.listen(HTTP_PORT, ()=>console.log("server is listening on port : "+ HTTP_PORT));