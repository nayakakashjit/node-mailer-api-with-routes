/**
 * @route POST /auth/logout
 * @desc Logout user
 * @access Public
 */

module.exports = async function logout(req, res) {
    try {
        res.setHeader('Clear-Site-Data', '"cookies", "storage"');
        res.status(200).json({ 
            status: 'success',
            message: 'You are logged out!' 
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
          });
    }
    res.end();
}