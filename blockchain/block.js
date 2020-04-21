const ChainUtil = require('../chain-util');
const {DIFFICULTY, MINE_RATE} = require('../config');

class Block{
    constructor(timestamp, lastHash,hash, data, nonce, difficulty){
        this.timestamp = timestamp;
        this.hash = hash;
        this.lastHash = lastHash;
        this.data = data;
        this.nonce = nonce
        this.difficulty = difficulty;
    }

    toString(){
        return `Block-
        Timestamp : ${this.timestamp}
        LastHash  : ${this.lastHash.substring(0,10)}
        Hash      : ${this.hash.substring(0,10)}
        Data      : ${this.data}
        Nonce     : ${this.nonce}
        Difficulty: ${this.difficulty}`
    }

    static genesis(){
        return new this('Genesis Time', '-----', 'f1r57-h45h', "DarkArmy", 0, DIFFICULTY);
    }

    static mineBlock(lastBlock, data){
        let timestamp, hash;
        let nonce = 0;
        let { difficulty } = lastBlock;
        const lastHash = lastBlock.hash;
        do{
            nonce++;
            timestamp = Date.now();
            difficulty = Block.adjustDifficulty(lastBlock, timestamp);
            hash = Block.hash(timestamp, lastHash, data, nonce, difficulty);
        }while(hash.substring(0, difficulty)!=='0'.repeat(difficulty));
        return new this(timestamp, lastHash, hash, data, nonce, difficulty);
    }

    static hash(timestamp, lastHash, data, nonce, difficulty){
        lastHash = JSON.stringify(lastHash);
        return ChainUtil.hash(`${timestamp}${lastHash}${data}${nonce}${difficulty}`).toString();
    }

    static blockHash(block){
        const { timestamp, lastHash, data, nonce, difficulty} = block;
        return Block.hash(timestamp, lastHash, data, nonce, difficulty);
    }

    static adjustDifficulty(lastBlock, currentTime){
        let { difficulty } = lastBlock;
        difficulty = lastBlock.timestamp + MINE_RATE > currentTime ? difficulty+1 : difficulty-1;
        return difficulty;
    }

}

module.exports = Block;