import InventoryCard from "../models/InventoryCard.js";

export const getCardsByStatus = async (req, res) => {
  try {
    const inUseCards = await InventoryCard.find(
      { reservedBy: { $ne: null } },
      "cardNumber reservedBy warehouse inventoryTakers"
    );

    const alreadyUsedCards = await InventoryCard.find(
      { positions: { $exists: true, $ne: [] } },
      "cardNumber warehouse inventoryTakers"
    );

    const maxCardNumber = await InventoryCard.findOne({}, "cardNumber").sort({
      cardNumber: -1,
    });

    res.status(200).json({
      inUse: inUseCards,
      alreadyUsed: alreadyUsedCards,
    });
  } catch (error) {
    console.error("Error fetching cards:", error);
    res.status(500).json({ error: "Error fetching cards" });
  }
};

export const reserveCard = async (req, res) => {
  let { cardNumber, warehouse, inventoryTaker1, inventoryTaker2, firstFree } =
    req.body;
  try {
    if (firstFree) {
      // Find the lowest free card number
      const firstFreeCard = await InventoryCard.find()
        .sort({ cardNumber: 1 })
        .limit(1);
      cardNumber = firstFreeCard.cardNumber + 1;
    }

    const existingCard = await InventoryCard.findOne({ cardNumber });

    if (existingCard) {
      // Update reservedBy field if the card already exists
      const updatedCard = await InventoryCard.findOneAndUpdate(
        { cardNumber },
        { reservedBy: [inventoryTaker1, inventoryTaker2] }, // Save both inventory takers
        { new: true } // Returns the updated document
      );
      res.status(200).json(updatedCard);
    } else {
      // Create a new card if it doesn't exist
      const newCard = new InventoryCard({
        cardNumber,
        warehouse,
        reservedBy: [inventoryTaker1, inventoryTaker2], // Save both inventory takers
      });

      const savedCard = await newCard.save();
      res.status(201).json(savedCard);
    }
  } catch (error) {
    console.error("Error reserving card:", error);
    res.status(500).json({ error: "Error reserving card" });
  }
};
