// hooks/useArticles.js
import { useQuery } from "react-query";
import axios from "axios";

const fetchArticles = async () => {
  const response = await axios.get("/api/articles"); // Replace with the correct API endpoint to fetch the Article collection
  return response.data;
};

const useArticles = () => {
  const query = useQuery("articles", fetchArticles);
  return query;
};

export default useArticles;
