import ExtraHours from "../models/ExtraHours.js";

export const save = async (req, res) => {
  try {
    const extraHoursData = req.body;
    console.log(extraHoursData);
    const extraHours = new ExtraHours(extraHoursData);
    await extraHours.save();

    res.status(201).json({ message: "Extra hours saved successfully." });
  } catch (error) {
    res.status(500).json({ error: error.message });
    console.log("Error in save function:", error);
  }
};
