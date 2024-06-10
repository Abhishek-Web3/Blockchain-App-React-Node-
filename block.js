const { time } = require("console");
const { GENESIS_DATA, MINE_RATE } = require("./config");
const cryptoHash   = require("./crypto-hash");
const hexToBonary = require("hex-to-binary");
const { DiffieHellman } = require("crypto");
class Block {
    constructor({timestamp, prevHash, hash, data, nonce, difficulty}) {
        this.timestamp = timestamp;
        this.prevHash = prevHash;
        this.hash = hash;
        this.nonce    = nonce;
        this.difficulty = difficulty;
        this.data = data;
    }
    // creating genesis block - 
    static genesis() {
        return new this(GENESIS_DATA);
    }


    static mineBlock({prevBlock, data}) {
        
        // const timestamp   = Date.now();
        let hash, timestamp;
        const prevHash   = prevBlock.hash;
        let {difficulty}   = prevBlock;
        let nonce = 0;
        do {
            nonce++;
            timestamp = Date.now();
            difficulty    = Block.adjustDifficulty({
                originalBlock : prevBlock,
                timestamp
            })
            hash = cryptoHash(timestamp, prevHash, data, nonce, difficulty);
        } while (hexToBonary(hash).substring(0, difficulty)   !== '0'.repeat(difficulty));

       
        return new this({
            timestamp,
            prevHash,
            data,
            difficulty,
            nonce,
            hash
        })   
    }

    static adjustDifficulty({originalBlock, timestamp}) {
        const {difficulty} = originalBlock;
        if(difficulty < 1) return 1;
        const differnce  = timestamp-originalBlock.timestamp;
        if(differnce > MINE_RATE) {
            return difficulty-1;
        } else {
            return difficulty+1;
        }
    }



}
// const block1 = new Block({
//     timestamp: '19 dec 2023 - 1',
//     prevHash: 'oxacab', 
//     hash: 'oxcv1223412', 
//     data: "Hello "
// });

// const block2 = new Block({
//     timestamp: '19 dec 2023 - 2',
//     prevHash: 'oxcv1223412', 
//     hash: 'dfgdfg2342', 
//     data: "Hello "
// });
// const genesisblock = Block.genesis();
// const mineBlockResult = Block.mineBlock({prevBlock:genesisblock, data:"block - 2"});
// console.log(genesisblock);
// console.log(mineBlockResult);
// console.log(block2);


module.exports = Block;