const crypto = require("crypto");

//JWT Key genration function
function generateJwtToken() {
  const SecretKey = crypto.randomBytes(32).toString("hex");
  return SecretKey;
}

const JWTSecreteKey = generateJwtToken();
console.log("SecretKey :", JWTSecreteKey);

module.exports = JWTSecreteKey;
