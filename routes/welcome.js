const express = require('express');
const router = express.Router();

router.get('/', (_req, res) => {
    res.end(
        'Assalamualaikum, I am called from API to test whether the fetching process works well or not'
    );
});

module.exports = router;
