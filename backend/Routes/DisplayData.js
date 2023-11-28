const express = require('express')
const router = express.Router()
router.post('/product',(req,res)=>{
    try {
        // console.log(global.carts)
        res.send([global.foodData, global.foodCategory])
    } catch (error) {
        console.error(error.message)
        res.send("Server Error")
        
    }
})
module.exports = router;