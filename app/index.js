const express = require('express')
const bodyParser = require('body-parser')
const Blockchain = require('../blockchain/index')
const P2pServer = require('./p2p-server')
const Wallet = require('../wallet')
const TransactionPool = require('../wallet/transaction-pool')

const HTTP_PORT = process.env.HTTP_PORT || 3001

const app = express()

app.use(bodyParser.json())

const wallet = new Wallet()
const tp = new TransactionPool()

const blockchain = new Blockchain();
const p2pServer = new P2pServer(blockchain, tp);

app.get("/blocks", (req, res)=>{
    res.json(blockchain.chain);
})

app.get('/transactions', (req, res)=>{
    res.json(tp.transactions)
})

app.get('/public-key', (req, res)=>{
    res.json({publicKey : wallet.publicKey});
})

app.post('/transact', (req, res)=>{
    const {recipient, amount} = req.body;
    const transaction = wallet.createTransaction(recipient, amount, tp)
    p2pServer.brodcastTransaction(transaction);
    res.redirect('/transactions')
})

app.post("/mine", (req, res)=>{
    const block = blockchain.addBlock(req.body.data)
    console.log("New block added : ", block)

    p2pServer.syncChains();
    res.redirect('/blocks')
})

app.listen(HTTP_PORT, ()=>console.log("server is listening on port : "+ HTTP_PORT));
p2pServer.listen();