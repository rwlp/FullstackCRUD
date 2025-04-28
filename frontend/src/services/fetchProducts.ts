import axios from "axios";
import { Product } from "../types/Product";
import { apiRootUrl } from "./constants";

const fetchProducts = async (page: number, limit: number, searchTerm: string) => {
  const response = await axios.get(`${apiRootUrl}/product`, {
    params: {
      page,
      limit,
      name: searchTerm,
    },
  });
  return response.data as { products: Product[], totalItems: number, currentPage: number }
};

export default fetchProducts;