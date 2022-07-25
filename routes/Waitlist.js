const router = require('express').Router()
const { joinWaitlist } = require('../controllers/Waitlist')

// JOIN waitlist
router.post('/waitlist/join', joinWaitlist)

module.exports = router