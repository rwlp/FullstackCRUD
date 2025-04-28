import axios from "axios";
import { Product } from "../types/Product";
import { apiRootUrl } from "./constants";

export const fetchProductById = async (id: string) => {
  try {
    const response = await axios.get(`${apiRootUrl}/products/${id}`);
    return response.data as Product;
  } catch (error) {
    console.error("Erro ao buscar produto:", error);
    throw new Error("Erro ao buscar produto");
  }
};