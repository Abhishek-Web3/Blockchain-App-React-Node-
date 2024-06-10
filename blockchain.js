const Block = require("./block");
const cryptoHash = require("./crypto-hash");

class Blockchain {
    constructor() {
        this.chain    = [Block.genesis()];
    }




    addBlockintoBlockchain({data}) {
    
        const newBlock = Block.mineBlock({
            prevBlock : this.chain[this.chain.length-1],
            data,
        });

        this.chain.push(newBlock);
    }





    //  for select longest chain whikle mine block in blockchain
    replaceChain(chain) {
        if(chain<= this.chain.length) {
            console.error("this incoming chain is not longer");
            return;
        }
        if(!Blockchain.isValidChain(chain)) {
            console.error('The encoming chain is not valid');
        }  
        this.chain = chain;      
    }





    static isValidChain(chain) {
        if (JSON.stringify(chain[0]) !== JSON.stringify(Block.genesis())) {
          return false;
        }
        for (let i = 1; i < chain.length; i++) {
          const { timestamp, prevHash, hash,data, nonce, difficulty } = chain[i];
          const lastDifficulty = chain[i - 1].difficulty;
          const realLastHash = chain[i - 1].hash;
    
          if (prevHash !== realLastHash) return false;
    
          const validatedHash = cryptoHash(
            timestamp,
            prevHash,
            nonce,
            difficulty,
            data
          );
          if (hash !== validatedHash) return false;
          if (Math.abs(lastDifficulty - difficulty) > 1) return false;
        }
        return true;
      }
    }





const blockchain = new Blockchain();
blockchain.addBlockintoBlockchain({data:'data-1'});
blockchain.addBlockintoBlockchain({data:'data-2'});

const isvalidchain_n= Blockchain.isValidChain(blockchain.chain);
// console.log(isvalidchain_n);
// console.log(blockchain);
module.exports  = Blockchain;