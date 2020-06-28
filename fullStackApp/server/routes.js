var express = require('express')
var router = express.Router()
/*
    POSTS ROUTES SECTION
*/

router.get('/api/auth', (req, res ) => {
  console.log(" hi")
  res.send(" auth ")
})

module.exports = router
