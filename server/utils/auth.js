const jwt = require('jsonwebtoken');

const secret = 'mysecretssshhhhhh';
const expiration = '2h';

module.exports = {
    authMiddleware: function ({ req }) {
        // allows token to be sent via req.body, req.query or headers
        let token = req.body.token || req.query.token || req.headers.authorization;
        console.log('token'+ token)

        //  split the token into an array and return the actual token
        if(req.headers.authorization) {
            token = token.split(' ').pop().trim();
        }

        if (!token) {
            console.log("work you cunt")
            return req;
        }

        // if token can be varified, add the decoded users data to the request so it can be accessed in the resolvers
        try {
            const { data } = jwt.verify(token, secret, { maxAge: expiration});
            console.log('auth'+data)
            req.user = data;
        } catch {
            console.log('Invalid token');
        }
        // return the request object so it can be passed to the resolver
        return req;
    },

    signToken: function ({ email, username, _id }) {
        const payload =  { email, username, _id };
        return jwt.sign({ data: payload}, secret, { expiresIn: expiration} )
    }
}