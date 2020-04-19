const Block = require('./block')

class Blockchain{
    constructor(){
        this.chain = [Block.genesis()];
    }

    addBlock(data){
        const block = Block.mineBlock(this.chain[this.chain.length-1], data);
        this.chain.push(block);

        return block;
    }

    isValidChain(chain){
        if(JSON.stringify(chain[0])!==JSON.stringify(Block.genesis())) return false;

        for(let i=1;i<chain.length;i++){
            const block = chain[i];
            const lastBlock = chain[i-1];

            if(JSON.stringify(block.lastHash) !== JSON.stringify(lastBlock.hash)){
                console.log("block.lastHash not equals lastBlock.hash: "+i)
                // console.log(block.lastHash);
                // console.log(lastBlock.hash);
                return false;
            }   
            
            if(JSON.stringify(block.hash) !== JSON.stringify(Block.blockHash(block))){
                console.log("block.hash not equals Block.blockkHash: "+i);
                // console.log(block.hash);
                // console.log(Block.blockHash(block));
                return false;
            }
        }

        return true;
    }

    replaceChain(newChain){
        if(this.chain.length>=newChain.length){
            console.log("New chain is not longer than old chain.");
            return;
        }else if(!this.isValidChain(newChain)){
            console.log("new chain is not valid chain")
            return;
        }

        console.log("chain is replaced with new chain!")
        this.chain = newChain;
    }
}

module.exports = Blockchain;