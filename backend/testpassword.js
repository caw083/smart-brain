const bcrypt = require('bcrypt-nodejs');
abc = "1"
bcrypt.hash("apples", null, null, function(err, hash) {
    // Store hash in your password DB.
    console.log(abc);
    console.log('hash`', hash);
});

bcrypt.compare("apples", "$2a$10$/Y0LHc2uMVvkRd.O8wAzSeSTt33EbQmc6UbXWyUApDKUV22jnFQiu", function(err, res) {
    // res == true
    console.log(res);
})