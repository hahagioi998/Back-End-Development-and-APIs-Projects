module.exports = {
    "facebookAuth": {
        "clientID": process.env.FACEBOOK_clientID,
        "clientSecret": process.env.FACEBOOK_clientSecret,
        "callbackURL": "https://tv-nightlife.herokuapp.com/auth/facebook/callback",
        'profileFields': ['id', 'displayName', 'email', 'birthday', 'friends', 'first_name', 'last_name', 'middle_name', 'gender', 'link']
    }
} 