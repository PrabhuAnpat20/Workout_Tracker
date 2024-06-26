const Workout = require("../models/workoutModel");
const mongoose = require("mongoose");
// get all workouts
const getWorkouts = async (req, res) => {
  const user_id=req.user._id
  const workouts = await Workout.find({user_id}).sort({ createdAT: -1 });
  
  res.status(200).json(workouts);
};
// get single workout
const getWorkout = async (req, res) => {
  
  const { id } = req.params;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "invalid id" });
  }

  const workout = await Workout.findById(id);
  if (!workout) {
    return res.status(404).json({ error: "no such workout" });
  }
  res.status(200).json(workout);
};

// create workout
const createWorkout = async (req, res) => {
  const { title, reps, load } = req.body;
  try {
    const  user_id=req.user._id
    const workout = await Workout.create({ title, reps, load,user_id });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


// delete workout
const deleteWorkout=async(req,res)=>{
    const {id}=req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "invalid id" });
      }

    const workout=await Workout.findOneAndDelete({_id:id})
    
    if (!workout) {
      return res.status(404).json({ error: "no such workout" });
    }
    res.status(200).json(workout);

}

// update Workout
const updateWorkout=async(req,res)=>{
    const {id}=req.params
    
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: "invalid id" });
      }

    const workout=await Workout.findOneAndUpdate({_id:id},{
        ...req.body
    })
    
    if (!workout) {
      return res.status(404).json({ error: "no such workout" });
    }
    res.status(200).json(workout);
}


module.exports = {
  createWorkout,
  getWorkouts,
  getWorkout,
  deleteWorkout,
  updateWorkout
};
