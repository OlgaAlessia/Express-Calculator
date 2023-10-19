const { Console } = require('console');
const fs = require('fs');

/**
 * 
 */
function convertToNums(array) {

    const arrNums = [];
    for (let i = 0; i < array.length; i++) {

        let val = parseInt(array[i]);
        if (isNaN(val)) {
            return new ExpressError(`${array[i]} is not a number.`, 400); //400 Bad Request
        }
        arrNums.push(val);
    }
    return arrNums;
}


function findMean(nums) {
    let sum = 0;
    for (let i = 0; i < nums.length; i++) {
        sum += nums[i];
    }
    return (sum / nums.length).toFixed();
}


function findMedian(nums) {
    nums.sort((a, b) => a - b);

    if (nums.length % 2 !== 0) {
        return nums[Math.round(nums.length / 2) - 1];
    }

    let mid = nums[(nums.length / 2) - 1] + nums[(nums.length / 2)];
    return mid / 2;
}


function findMode(nums) {

    let modeDict = new Map();

    for (let i = 0; i < nums.length; i++) {
        if (modeDict.has(nums[i]))
            modeDict.set(nums[i], (modeDict.get(nums[i]) + 1));
        else
            modeDict.set(nums[i], 1);
    }

    let mostFrequent = -1;
    let modeMax = 1;
    modeDict.forEach((value, key) => {
        if (modeMax < value) {
            modeMax = value;
            mostFrequent = key;
        }
    });

    if (modeMax === 1) {
        return "No mode found";
    }
    return mostFrequent;
}


function saveToFile(nameFile, data){

    let timestamp = new Date().toISOString(); 
    data = {'timestamp': timestamp, 'response': data };

    fs.writeFile(nameFile, JSON.stringify(data), { encoding: 'utf8', flag: 'a' }, err => {
        if (err) {
            return new ExpressError(`Couldn't write ${out}: ${err}`, 304); 
        }
        console.log(`no output, but ${nameFile} contains the result.`);

        return `no output, but ${nameFile} contains the result.`
    });
}



module.exports = {
    convertToNums,
    findMean,
    findMedian,
    findMode,
    saveToFile
};