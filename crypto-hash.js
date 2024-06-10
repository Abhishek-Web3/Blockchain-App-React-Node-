// const crypto = require("crypto");
// const hexToBonary = require("hex-to-binary");
// const cryptoHash = (...inputs) => {
//     const hash = crypto.createHash("sha256");
//     hash.update(inputs.sort().join(""));
//     return hexToBonary(hash.digest("hex"));

// };


const crypto = require("crypto");
const cryptoHash = (...inputs) => {
    const hash = crypto.createHash("sha256");
    hash.update(inputs.sort().join(""));
    return hash.digest("hex");

};
// result = cryptoHash("world", 'Hello');
// result = cryptoHash( 'Hello',"world");
// console.log(result);

module.exports   = cryptoHash;