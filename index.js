const express = require('express');
const ExpressError = require('./expressError');
const { convertToNums, findMode, findMean, findMedian, saveToFile } = require('./allFunctions');

const app = express();


/** mean (average) */
app.get('/mean', (req, resp, next) => {
    try {
        var save = req.query.save || false;
        if (!req.query.nums) {
            throw new ExpressError('nums are required.', 400); //400 Bad Request
        }
        const numsAsString = req.query.nums.split(",");
        let nums = convertToNums(numsAsString);

        let response = { operation: "mean", value: findMean(nums) };

        if (save) saveToFile('results.json', response);

        return resp.json({ response: response });

    } catch (e) {
        next(e);
    }
});


/** median (midpoint)
 */
app.get('/median', (req, resp, next) => {
    try {
        var save = req.query.save || false;
        if (!req.query.nums) {
            throw new ExpressError('nums are required.', 400); //400 Bad Request
        }
        const numsAsString = req.query.nums.split(",");
        let nums = convertToNums(numsAsString);

        let response = { operation: "median", value: findMedian(nums) };

        if (save) saveToFile('results.json', response);

        return resp.json({ response: response });

    } catch (e) {
        next(e);
    }
});


/** mode (most frequent) 
*/
app.get('/mode', function (req, resp, next) {
    try {
        var save = req.query.save || false;
        if (!req.query.nums) {
            throw new ExpressError('nums are required.', 400); //400 Bad Request
        }
        const numsAsString = req.query.nums.split(",");
        let nums = convertToNums(numsAsString);

        let response = { operation: "mode", value: findMode(nums) };

        if (save) saveToFile('results.json', response);

        return resp.json({ response: response });


    } catch (e) {
        next(e);
    }
});


/** all */
app.get('/all', (req, resp, next) => {
    try {
        var save = req.query.save || false;
        if (!req.query.nums) {
            throw new ExpressError('nums are required.', 400); //400 Bad Request
        }

        const numsAsString = req.query.nums.split(",");
        let nums = convertToNums(numsAsString);

        const resultMean = findMean(nums);
        const resultMedian = findMedian(nums);
        const resultMode = findMode(nums);

        let response = { operation: "all", mean: resultMean, median: resultMedian, mode: resultMode };

        if (save) saveToFile('results.json', response);

        return resp.json({ response: response });

    } catch (e) {
        next(e);
    }
});


// Error handler
app.use(function (err, req, res, next) { //Note the 4 parameters!
    // the default status is 500 Internal Server Error
    let status = err.status || 500;
    let message = err.msg;

    // set the status and alert the user
    return res.status(status).json({
        error: { message, status }
    });
});


app.listen(3000, function () {
    console.log('App on port 3000');
})