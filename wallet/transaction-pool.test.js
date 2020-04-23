const TransactionPool = require('./transaction-pool')
const Transaction = require('./transaction')
const Wallet = require('./index')

describe("TransactionPool", ()=>{
    let tp, wallet, transaction;

    beforeEach(()=>{
        tp = new TransactionPool();
        wallet = new Wallet();
        transaction = Transaction.newTransaction(wallet, 'r4nd-4ddr355',90);
        tp.updateOrAddTransaction(transaction);
    });

    it('adds a transaction to the pool', ()=>{
        expect(tp.transactions.find(t => t.id===transaction.id)).toEqual(transaction);
    });

    it('update a transaction of the pool', ()=>{
        const oldTransaction = JSON.stringify(transaction);
        const newTransaction = transaction.update(wallet, 'dark-address', 37);
        tp.updateOrAddTransaction(newTransaction);
        expect(tp.transactions.find(t=>t.id===newTransaction.id)).not.toEqual(oldTransaction);
    });
})