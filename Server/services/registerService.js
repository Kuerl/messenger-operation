module.exports.Register = function(server, body) {
    // Register
    server.get('/register',  async (req, res) => {
        try {
            res.send('Register Page')
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Err: ', err);
        }
    });

    server.post('/register', body('email').isEmail(), body('password').isLength({ min: 5 }), async (req,res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const { password, firstname, lastname } = req.body;
        try {
            // Check Username
            let username = await Accounts.findOne({
                where: {
                    user_name: req.body.user_name.toLowerCase()
                }
            });
                if (username !== null) {
                    res.json("This username is already exist!");
                }
            // Check Mail
            let mail = await Accounts.findOne({
                where: {
                    email: req.body.email.toLowerCase()
                }
            });
                if (mail !== null) {
                    res.json("This email is already exist!");
                }
            // Create Account
            await Accounts.create({ user_name: req.body.user_name.toLowerCase(), password, email: req.body.email.toLowerCase(), is_active: true, status: "Active", firstname, lastname, block_count: 0, is_block: false });
            res.json('Your account is already created!');
        } catch (err) {
            console.log(err);
            res.status(500).json('Server Error: ', err);
        }
    });
}