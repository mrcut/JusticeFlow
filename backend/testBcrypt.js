const bcrypt = require("bcryptjs");

const enteredPassword = "123456"; // Mot de passe que tu as saisi
const storedHash = "$2a$10$QzNL2e5FpxY..."; // Remplace par le hash réel enregistré dans MongoDB

bcrypt.compare(enteredPassword, storedHash).then((isMatch) => {
  console.log("🔍 Test manuel bcrypt.compare() =>", isMatch);
});
