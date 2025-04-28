import { useState } from "react";
import Card from "../../components/card/Card";
import GridContainer from "../../components/gridContainer/GridContainer";
import { Paginator } from "../../components/Paginator/Paginator";
import SearchInput from "../../components/searchInput/SearchInput";
import { Product } from "../../types/Product";
import styles from './style.module.scss'
import fetchProducts from "../../services/fetchProducts";
import { useQuery } from "@tanstack/react-query";


export default function FilterPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, isLoading, isError, error } = useQuery(
    {
      queryKey: ['products', currentPage, itemsPerPage, searchTerm],
      queryFn: () => fetchProducts(currentPage, itemsPerPage, searchTerm),
    }
  );

  const handleSearchChange = (e: string) => {
    setSearchTerm(e);
    setCurrentPage(1);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  if (isError) {
    console.log(error);
    return <div>Servico Indisponivel. Tente mais tarde!</div>;
  }

  return (
    <main>
      <div className={styles.actionsContainer}>
        <div className={styles.searchArea}>
          <SearchInput onSearch={handleSearchChange} />
          <div className={styles.itemsPerPage}>
            <label htmlFor="itemsSelect">Items por página:</label>
            <select
              id="itemsSelect"
              value={itemsPerPage}
              onChange={(e) => {
                setItemsPerPage(Number(e.target.value));
                setCurrentPage(1);
              }}
            >
              <option value={4}>4</option>
              <option value={8}>8</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </div>
      </div>

      <GridContainer>
        {isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          <div>Erro ao carregar dados!</div>
        ) : (
          data?.products.map((product: Product) => <Card key={product.id} product={product} />)
        )}
      </GridContainer>

      <Paginator
        totalItems={data?.totalItems || 0}  // Assumindo que a API retorna o total de items
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage}
      />
    </main>
  );
}