import ExtraHours from "../models/ExtraHours.js";

export const save = async (req, res) => {
  try {
    const extraHoursData = req.body;
    const extraHours = new ExtraHours(extraHoursData);
    await extraHours.save();
    res.status(201).json({ message: "Extra hours saved successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in save function:", error);
  }
};

export const getUserData = async (req, res) => {
  const { userId } = req.params;
  try {
    const extraHoursData = await ExtraHours.find({ userId: userId })
      .populate("supervisor", "firstName lastName")
      .populate("hrReviewer", "firstName lastName");
    console.log(extraHoursData);
    res.status(200).json(extraHoursData);
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log(error.message);
  }
};
