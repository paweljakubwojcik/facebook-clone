
/**
 * 
 * @param {Array} arr 
 * @param {Function} predicate 
 * @returns 
 */
module.exports.asyncFilter = async (arr, predicate) =>
    Promise.all(arr.map(predicate)).then((results) => arr.filter((_v, index) => results[index]))
