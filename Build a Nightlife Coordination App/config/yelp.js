const yelp = require('yelp-fusion');
const clientId = process.env.YELP_clientId;
const clientSecret = process.env.YELP_clientSecret;
const token = process.env.YELP_token;
const client = yelp.client(token);

module.exports = client; 