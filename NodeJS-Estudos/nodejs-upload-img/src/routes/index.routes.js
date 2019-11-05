const { Router } = require('express');
const path = require('path');

const router = Router();


router.get('/', function (req, res) {
    res.render('index')
});

router.post('/upload', function(req, res) {
    console.log(req.file)
    res.send('uploaded');
})

module.exports = router;