import { useState } from "react";
import Card from "../../components/card/Card";
import GridContainer from "../../components/gridContainer/GridContainer";
import { Paginator } from "../../components/Paginator/Paginator";
import SearchInput from "../../components/searchInput/SearchInput";
import { Product } from "../../types/Product";
import styles from './style.module.scss'

const fakeProd: Product = {
  name: 'Some Name',
  categories: [{
    id: 'someid',
    parent: null,
    name: 'eletronics'
  }, {
    id: 'someid',
    parent: null,
    name: 'eletronics'
  },
  {
    id: 'someid',
    parent: null,
    name: 'eletronics'
  }],
  id: 'idifa',
  photo: 'https://picsum.photos/200/200',
  price: 18.832,
  qty: 3,
}

export default function FilterPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  return (
    <main>
      <div className={styles.actionsContainer}>
        <div className={styles.searchArea}>
          <SearchInput />
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
        <Card product={fakeProd} />
        <Card product={fakeProd} />
        <Card product={fakeProd} />
        <Card product={fakeProd} />
        <Card product={fakeProd} />
        <Card product={fakeProd} />

      </GridContainer>
      <Paginator
        totalItems={50}
        currentPage={currentPage}
        itemsPerPage={itemsPerPage}
        onPageChange={setCurrentPage} />

    </main>
  )
}