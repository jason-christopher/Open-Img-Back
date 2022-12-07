'use strict';

const jwt = require('jsonwebtoken');

const jwksClient = require('jwks-rsa');

const client = jwksClient({
  jwksUri: process.env.JWKS_URI
});

function getKey(header, callback) {
  client.getSigningKey(header.kid, function(err, key) {
    const signingKey = key.publicKey || key.rsaPublicKey;
    callback(null, signingKey);
  });
}

function verifyUser(req, errorFirstOrUserCallbackFunction) {
  try {
    const token = req.headers.authorization.split(' ')[1];
    jwt.verify(token, getKey, {}, errorFirstOrUserCallbackFunction)
  } catch(error) {
    errorFirstOrUserCallbackFunction('not authorized');
  }
}

module.exports = verifyUser;
