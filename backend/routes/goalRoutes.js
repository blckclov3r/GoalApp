const express = require('express');
const router = express.Router();
const {
        getGoals,
        getGoalsId,
        setGoal,
        updateGoal,
        deleteGoal
    } = require('../controllers/goalController');


router.route('/').get(getGoals).post(setGoal);
router.route('/:id').get(getGoalsId).put(updateGoal).delete(deleteGoal);


/*
    simplified
*/

// router.get('/',getGoals)
// router.get('/:id',getGoalsId)
// router.post('/',setGoal)
// router.patch('/:id',updateGoal)
// router.delete('/:id',deleteGoal)



module.exports = router;