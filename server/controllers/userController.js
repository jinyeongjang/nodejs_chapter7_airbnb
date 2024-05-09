exports.register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!email || !password || !name) {
            return res.status(400).json({
                message: 'Name, email and password are required',
            });
        }

        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({
                message: 'User already exists',
            });
        }

        user = await User.create({
            name,
            email,
            password,
        });

        cookieToken(user, res);
    } catch (error) {
        res.status(500).json({
            message: 'Internal Server Error',
            error: error,
        });
    }
};
