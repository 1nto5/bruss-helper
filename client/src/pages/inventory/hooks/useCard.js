import { useQuery } from 'react-query'
import axios from 'axios'

const useCard = (cardNumber) => {
  return useQuery(
    ['card', cardNumber],
    async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/inventory/get-card/${cardNumber}`
      )
      console.log(data)
      return data
    },
    { enabled: !!cardNumber }
  )
}

export default useCard
