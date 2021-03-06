const Transaction = require('./transaction')
const Wallet = require('./index')

describe("Transaction", ()=>{
    let transaction, wallet, recipient, amount;
    beforeEach(()=>{
        wallet = new Wallet();
        recipient = "r3c1p13nt";
        amount = 50;
        transaction = Transaction.newTransaction(wallet, recipient, amount);
    });

    it('Outputs the `amount` subtracted from the wallet balance', ()=>{
        expect(transaction.outputs.find(output => output.address === wallet.publicKey).amount).toEqual(wallet.balance - amount);
    });

    it('Outputs the `amount` which recieved', ()=>{
        expect(transaction.outputs.find(output => output.address===recipient).amount).toEqual(amount);
    });

    it('inputs the balance of the wallet', ()=>{
        expect(transaction.input.amount).toEqual(wallet.balance);
    });

    it('validates a valid transaction', ()=>{
        expect(Transaction.verifyTransaction(transaction)).toBe(true);
    });

    it('invalidates a corrupt transaction', ()=>{
        transaction.outputs[0].amount = 50000;
        expect(Transaction.verifyTransaction(transaction)).toBe(false);

    })

    describe("Transaction with an amoutn that exceeds the balance", ()=>{
        beforeEach(()=>{
            amount = 5000;
            transaction = Transaction.newTransaction(wallet, recipient, amount);
        });

        it("Doesnot create the transaction", ()=>{
            expect(transaction).toEqual(undefined);
        });
    });

    describe("Updating a transaction", ()=>{
        let nextAmount, nextRecipient;
        beforeEach(()=>{
            nextAmount = 20;
            nextRecipient = 'n3xt_r3c1p13nt';
            transaction = transaction.update(wallet, nextRecipient, nextAmount);
        });

        it("subtracts the next amount from senders output", ()=>{
            expect(transaction.outputs.find(output => output.address===wallet.publicKey).amount).toEqual(wallet.balance-amount-nextAmount);
        });

        it("outputs the amount for the next recipient", ()=>{
            expect(transaction.outputs.find(output => output.address===nextRecipient).amount).toEqual(nextAmount);
        });
    })
})