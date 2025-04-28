import { Link } from 'react-router-dom';
import { Product } from '../../types/Product';
import axios from 'axios';
import styles from './styles.module.scss';
import { useState } from 'react';
import { apiRootUrl } from '../../services/constants';

interface CardProps {
  product: Product;
}

export default function Card({ product }: CardProps) {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDelete = async () => {
    try {
      await axios.delete(`${apiRootUrl}/product/${product.id}`);
      
      setIsDeleted(true);
      
      alert("Produto deletado com sucesso");
    } catch (error) {
      console.error("Erro ao deletar o produto:", error);
      alert("Erro ao deletar o produto");
    }
  };

  return (
    <div className={`${styles.container} ${isDeleted ? styles.deleted : ''}`}>
      <div className={styles.card}>
        <div className={styles.imgBx}>
          <img className={styles.img} src={product.photo} alt="image of product" />
        </div>

        <div className={styles.contentBx}>
          <div className={styles.size}>
            <Link className={styles.buttonLink} to={`/product/${product.id}`}>Editar</Link>
            <button onClick={handleDelete} disabled={isDeleted}>Apagar</button>
          </div>
          <h2>{product.name}</h2>
        </div>
        
        <div className={styles.details}>
          <span className={styles.qty}>QTD: {product.qty}</span>
          <div className={styles.categories}>
            {product.categories.map((ct) => (
              <span key={ct.id} className={styles.categoryTag}>
                {ct.name}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
