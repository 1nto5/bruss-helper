import InventoryCard from '../models/InventoryCard.js'
import InventoryArticle from '../models/InventoryArticle.js'

export const getCardsByStatus = async (req, res) => {
  try {
    const inUseCards = await InventoryCard.find(
      { reservedBy: { $ne: null } },
      'cardNumber reservedBy warehouse inventoryTakers'
    )

    const alreadyUsedCards = await InventoryCard.find(
      { positions: { $exists: true, $ne: [] } },
      'cardNumber warehouse inventoryTakers'
    )

    res.status(200).json({
      inUse: inUseCards,
      alreadyUsed: alreadyUsedCards,
    })
  } catch (error) {
    console.error('Error fetching cards:', error)
    res.status(500).json({ error: 'Error fetching cards' })
  }
}

export const reserveCard = async (req, res) => {
  let { cardNumber, warehouse, inventoryTaker1, inventoryTaker2 } = req.body
  try {
    if (cardNumber === 'lowestAvailable') {
      cardNumber = await getLowestAvailableCardNumber()
    }

    const existingCard = await InventoryCard.findOne({ cardNumber })

    if (existingCard) {
      // Update reservedBy field if the card already exists
      const updatedCard = await InventoryCard.findOneAndUpdate(
        { cardNumber },
        { reservedBy: [inventoryTaker1, inventoryTaker2] },
        { new: true } // Returns the updated document
      )
      res.status(200).json(updatedCard)
    } else {
      // Create a new card if it doesn't exist
      const newCard = new InventoryCard({
        cardNumber,
        warehouse,
        reservedBy: [inventoryTaker1, inventoryTaker2],
      })

      const savedCard = await newCard.save()
      res.status(201).json(savedCard)
    }
  } catch (error) {
    console.error('Error reserving card:', error)
    res.status(500).json({ error: 'Error reserving card' })
  }
}

const getLowestAvailableCardNumber = async () => {
  try {
    const maxCardNumber = await InventoryCard.findOne({}, 'cardNumber').sort({
      cardNumber: -1,
    })

    // If there are no cards in the database, return 1 as the lowest available card number
    if (!maxCardNumber) {
      return 1
    }

    for (let i = 1; i <= maxCardNumber.cardNumber + 1; i++) {
      const existingCard = await InventoryCard.findOne({ cardNumber: i })
      if (!existingCard) {
        return i
      }
    }
  } catch (error) {
    console.error('Error finding the lowest available card number:', error)
    throw error
  }
}

export const fetchArticlesList = async (req, res) => {
  try {
    const articles = await InventoryArticle.find({})
    res.json(articles)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching articles' })
  }
}

export const getPositionOptions = async (req, res) => {
  try {
    const cardNumber = parseInt(req.params.cardNumber)
    const card = await InventoryCard.findOne({ cardNumber })

    if (!card) {
      return res.status(404).json({ error: 'Card not found.' })
    }

    const positionNumbers = card.positions.map(
      (position) => position.positionNumber
    )
    res.json(positionNumbers)
  } catch (error) {
    console.error('Error getting position numbers:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while getting position numbers.' })
  }
}

export const savePosition = async (req, res) => {
  try {
    // Extract the position data from the request body
    const {
      cardNumber,
      positionNumber,
      wip,
      articleNumber,
      articleName,
      quantity,
      unit,
      inventoryTakers,
    } = req.body

    // Find the card by its cardNumber
    const card = await InventoryCard.findOne({ cardNumber })

    if (!card) {
      return res.status(404).json({ error: 'Card not found.' })
    }

    // Check if the position already exists in the card's positions array
    const existingPosition = card.positions.find(
      (position) => position.positionNumber === positionNumber
    )

    if (existingPosition) {
      // Update the existing position
      existingPosition.articleNumber = articleNumber
      existingPosition.articleName = articleName
      existingPosition.quantity = quantity
      existingPosition.unit = unit
      existingPosition.inventoryTakers = inventoryTakers
      existingPosition.wip = wip
    } else {
      // Create a new position object
      const newPosition = {
        positionNumber,
        articleNumber,
        articleName,
        quantity,
        unit,
        inventoryTakers,
        wip,
      }

      // Add the new position to the positions array of the card
      card.positions.push(newPosition)
    }

    // Save the updated card to the database
    const savedCard = await card.save()

    // Send the saved card as the response
    res.json(savedCard)
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error saving position:', error)
    res
      .status(500)
      .json({ error: 'An error occurred while saving the position.' })
  }
}

export const getPositionData = async (req, res) => {
  try {
    const { cardNumber, positionNumber } = req.params

    // Fetch the position data from the database using the cardNumber and positionNumber
    const positionData = await InventoryCard.findOne(
      {
        cardNumber: cardNumber,
        positions: {
          $elemMatch: { positionNumber: positionNumber },
        },
      },
      { 'positions.$': 1 } // Projection to return only the matched position
    )

    if (!positionData) {
      return res.status(404).json({ message: 'Position not found' })
    }

    res.status(200).json(positionData.positions[0])
  } catch (error) {
    res.status(500).json({ message: 'Error fetching position data' })
  }
}
