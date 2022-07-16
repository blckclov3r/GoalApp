const express = require('express');
const router = express.Router();
const {
        getGoals,
        getGoalsId,
        setGoal,
        updateGoal,
        deleteGoal
    } = require('../controllers/goalController');

const {protect} = require('../middleware/authMiddleware')

router.route('/').get(protect,getGoals).post(protect,setGoal);
router.route('/:id').get(protect,getGoalsId).put(protect,updateGoal).delete(protect,deleteGoal);


/*
    simplified
*/

// router.get('/',getGoals)
// router.get('/:id',getGoalsId)
// router.post('/',setGoal)
// router.patch('/:id',updateGoal)
// router.delete('/:id',deleteGoal)



module.exports = router;