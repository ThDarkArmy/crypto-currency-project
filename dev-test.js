const Block = require('./block')

// const block = new Block('foo','zoo','buzz','buzz')
// console.log(block.toString())
// console.log(Block.genesis().toString())

const newBlock = Block.mineBlock(Block.genesis(), "foo")

console.log(newBlock.toString())