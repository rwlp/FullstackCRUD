import { Link } from 'react-router-dom'
import { Product } from '../../types/Product'
import styles from './styles.module.scss'


interface CardProps {
  product: Product
}

export default function Card({ product }: CardProps) {

  return (
    <div className={styles.container}>

      <div className={styles.card}>
        <div className={styles.imgBx}>
          <img className={styles.img} src={product.photo} alt="image of product" />
        </div>

        <div className={styles.contentBx}>
          <div className={styles.size}>
            <Link className={styles.buttonLink} to={`/product/${product.id}`}>Editar</Link>
            <button>Apagar</button>
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
  )
}