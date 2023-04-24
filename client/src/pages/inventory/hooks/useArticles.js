import { useQuery } from 'react-query'
import axios from 'axios'

const fetchArticles = async () => {
  const { data } = await axios.get(
    `${process.env.REACT_APP_API_URL}/inventory/fetch-articles-list`
  )
  return data
}

const useArticles = () => {
  return useQuery('articlesList', fetchArticles)
}

export default useArticles
