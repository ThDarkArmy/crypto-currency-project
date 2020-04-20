const Block = require('./block')
const {DIFFICULTY} = require('../config');


describe('Block', ()=>{
    let data, lastBlock, block;

    beforeEach(()=>{
        data = 'bar';
        lastBlock = Block.genesis();
        block = Block.mineBlock(lastBlock, data);
    });

    it('sets the `data` to match the input',()=>{
        expect(block.data).toEqual(data);
    });

    it('sets the `lasthash` to match the hash of the last block', ()=>{
        expect(block.lastHash).toEqual(lastBlock.hash);
    });

    it('generates a hash that matches the difficulty', ()=>{
        expect(block.hash.substring(0, block.difficulty)).toEqual('0'.repeat(block.difficulty));
        //console.log(block.toString());
    });

    it("Lowers the difficulty of slowly mined blocks", ()=>{
        expect(Block.adjustDifficulty(block, block.timestamp+36000)).toEqual(block.difficulty-1);
    });

    it("It raises the difficulty of quickly mined blocks", ()=>{
        expect(Block.adjustDifficulty(block, block.timestamp+1)).toEqual(block.difficulty+1);
    });
})