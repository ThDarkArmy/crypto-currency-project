const SHA256 = require('crypto-js/sha256')

class Block{
    constructor(timestamp, lastHash,hash, data){
        this.timestamp = timestamp;
        this.hash = hash;
        this.lastHash = lastHash;
        this.data = data;
    }

    toString(){
        return `Block-
        Timestamp: ${this.timestamp}
        LastHash: ${this.lastHash}
        Hash: ${this.hash}
        Data: ${this.data}`
    }

    static genesis(){
        return new this('Genesis Time', '-----', 'f1r57-h45h', "DarkArmy")
    }

    static mineBlock(lastBlock, data){
        const timestamp = Date.now();
        const lastHash = lastBlock.hash;
        const hash = Block.hash(timestamp, lastHash, data);
        return new this(timestamp, lastHash, hash, data);
    }

    static hash(timestamp, lastHash, data){
        //console.log(SHA256(`${timestamp}${lastHash}${data}`));
        const lasthash = JSON.stringify(lastHash);
        return SHA256(`${timestamp}${lasthash}${data}`)
    }

    static blockHash(block){
        const { timestamp, lastHash, data} = block;
        //console.log(Block.hash(timestamp, lastHash, data));
        return Block.hash(timestamp, lastHash, data);
    }

}

module.exports = Block;