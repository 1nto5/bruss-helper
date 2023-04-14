import InventoryCard from "../models/InventoryCard.js";

export const inUse = async (req, res) => {
  try {
    const cardsInUse = await InventoryCard.find(
      { reservedBy: { $ne: null } },
      "cardNumber"
    );
    res.status(200).json(cardsInUse.map((card) => card.cardNumber));
  } catch (error) {
    console.error("Error fetching cards in use:", error);
    res.status(500).json({ error: "Error fetching cards in use" });
  }
};

export const reserveCard = async (req, res) => {
  const { cardNumber, warehouse, inventoryTakers } = req.body;

  try {
    const existingCard = await InventoryCard.findOne({ cardNumber });

    if (existingCard) {
      // Update reservedBy field if the card already exists
      const updatedCard = await InventoryCard.findOneAndUpdate(
        { cardNumber },
        { reservedBy: inventoryTakers }, // Save both inventory takers
        { new: true } // Returns the updated document
      );
      res.status(200).json(updatedCard);
    } else {
      // Create a new card if it doesn't exist
      const newCard = new InventoryCard({
        cardNumber,
        warehouse,
        reservedBy: inventoryTakers, // Save both inventory takers
      });

      const savedCard = await newCard.save();
      res.status(201).json(savedCard);
    }
  } catch (error) {
    console.error("Error reserving card:", error);
    res.status(500).json({ error: "Error reserving card" });
  }
};
