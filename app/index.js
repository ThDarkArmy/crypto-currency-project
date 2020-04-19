const express = require('express')
const bodyParser = require('body-parser')
const Blockchain = require('../blockchain/index')
const P2pServer = require('./p2p-server')

const HTTP_PORT = process.env.HTTP_PORT || 3001

const app = express()

app.use(bodyParser.json())

const blockchain = new Blockchain();
const p2pServer = new P2pServer(blockchain)

app.get("/blocks", (req, res)=>{
    res.json(blockchain.chain);
})

app.post("/mine", (req, res)=>{
    const block = blockchain.addBlock(req.body.data)
    console.log("New block added : ", block)

    p2pServer.syncChains();
    res.redirect('/blocks')
})

app.listen(HTTP_PORT, ()=>console.log("server is listening on port : "+ HTTP_PORT));
p2pServer.listen();