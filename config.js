// code for create genesus block
const MINE_RATE  = 1000; // 1s = 1000 ms 
const INITIAL_DIFFICULTY  = 2;
const GENESIS_DATA = {
    timestamp : 1,
    prevHash : 'oxooqqw12',
    hash : '012dbsjdbh',
    data:[],
    nonce :0,
    difficulty: INITIAL_DIFFICULTY,
   
}

module.exports = {GENESIS_DATA, MINE_RATE};