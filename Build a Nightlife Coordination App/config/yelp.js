'use strict'
const yelp = require('yelp-fusion');
const clientId = "kztN6koqJB61878NnCIMCw",
const clientSecret = "zyodSpB2NBHA9ReDQOMljO61xoVzqYeadiOQ79p23XSZtXRC6wKkjaeLf4dO46if"
const token = yelp.accessToken(clientId, clientSecret).then(function (response) {
    console.log(response.jsonBody.access_token);
}).catch(e => {
    console.log(e);
});
// const yelp = new Yelp({
//  consumer_key: 'kztN6koqJB61878NnCIMCw',
//  consumer_secret: 'zyodSpB2NBHA9ReDQOMljO61xoVzqYeadiOQ79p23XSZtXRC6wKkjaeLf4dO46if',
//  token: null,
//  token_secret: null
// });

module.exports = yelp; 