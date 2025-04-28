import { Product } from "../types/Product";
import { apiRootUrl } from "./constants";

const fetchProducts = async (page: number, limit: number, searchTerm: string) => {
  const response = await axios.get(`${apiRootUrl}/products`, {
    params: {
      page,
      limit,
      search: searchTerm,
    },
  });
  return response.data as { products: Product[], totalItems: number, currentPage: number }
};

export default fetchProducts;