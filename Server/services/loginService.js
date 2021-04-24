module.exports.Login = function(server) {
    // Login
    server.get('/login', async (req, res) => {
        try {
            res.send('Login Page')
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Err: ', err);
        }
    })

    server.post('/login', async (req, res) => {
        try {
            let username = await Accounts.findOne({
                where: {
                    user_name: req.body.user_name.toLowerCase(),
                    password: req.body.password
                }
            });
                if (username !== null) {
                    res.json("Your was login successfully!");
                }
                else {
                    res.json("Your username or password is incorrect!");
                }
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Error: ', err);
        }
    })
}