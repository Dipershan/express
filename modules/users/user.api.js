const router = require('express').Router();
const { generateToken } = require('../../utils/token');
const { secure } = require('../../utils/secure');
const { validator } = require('./user.validator');
const multer = require('multer');
const userController = require('./user.controller');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/upload');
    },
    filename: function (req, file, cb) {
        console.log({ file }, Date.now());
        cb(
            null,
            file.fieldname.concat(
                '-',
                Date.now(),
                '.',
                file.originalname.split('.').pop()  // Ensure to get the file extension dynamically
            )
        );
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 } // 1 MB limit
});

router.post('/register', upload.single('profile'), validator, async (req, res, next) => {
    console.log('Register route hit');
    try {
        if (req.file) {
            req.body.profile = req.file.path;
        }
        const result = await userController.create(req.body);
        res.json({ msg: 'User Registered Successfully', user: result });
    } catch (error) {
        next(error);
    }
});

router.post('/login', async (req, res, next) => {
    console.log('Login route hit');
    try {
        const result = await userController.login(req.body);
        res.json({ msg: 'User logged in successfully', data: result });
    } catch (error) {
        next(error);
    }
});

// Add more routes as necessary, ensuring each has appropriate logging

router.get('/', secure(['admin']), async(req, res, next) => {
    
    try {
        const {page ,  limit , name}  = req.query;
        const search = {name , email}
        const data = await userController.list({page,  limit , search});
        
        res.json({ msg: 'User list generated', data: [] });
    } catch (error) {
        next(error);
    }
});

router.post('/generate-email-token', async (req, res, next) => {
    console.log('Generate email token');
    try {
        const result = await userController.generateEmailToken(req.body);
        res.json({ msg: 'Email token generated successfully', data: result });
    } catch (error) {
        next(error);
    }
});

router.post('/verify-email-token', async (req, res, next) => {
    console.log('Verify email token');
    try {
        const result = await userController.verifyEmailToken(req.body);
        res.json({ msg: 'Email successfully verified', data: result });
    } catch (error) {
        next(error);
    }
});

// Add remaining routes as necessary, ensuring each has appropriate logging

router.patch('/:id/block', async (req, res, next) => {
    console.log('Block user');
    try {
        // Your logic here
    } catch (error) {
        next(error);
    }
});

router.delete('/:id', async (req, res, next) => {
    console.log('Delete user');
    try {
        // Your logic here
    } catch (error) {
        next(error);
    }
});

router.get('/profile', async (req, res, next) => {
    console.log('Get user profile');
    try {
        // Your logic here
    } catch (error) {
        next(error);
    }
});

router.put('/profile', async (req, res, next) => {
    console.log('Update user profile');
    try {
        // Your logic here
    } catch (error) {
        next(error);
    }
});

router.get('/:id', async (req, res, next) => {
    console.log('Get user by ID');
    try {
        // Your logic here
    } catch (error) {
        next(error);
    }
});

router.post('/change-password', async (req, res, next) => {
    console.log('Change password');
    try {
        // Your logic here
    } catch (error) {
        next(error);
    }
});

router.post('/reset-password', async (req, res, next) => {
    console.log('Reset password');
    try {
        // Your logic here
    } catch (error) {
        next(error);
    }
});

router.post('/forget-password', async (req, res, next) => {
    console.log('Forget password');
    try {
        // Your logic here
    } catch (error) {
        next(error);
    }
});

module.exports = router;
