import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './styles.module.scss';
import { useState } from 'react';

interface Category {
  id: string;
  name: string;
}

interface ProductFormProps {
  initialValues?: {
    categories: Category[];
    name: string;
    qty: number;
    price: number;
    photo: string;
  };
  onSubmit: (values: { categories: Category[]; name: string; qty: number; price: number; photo: string }) => void;
}

const validationSchema = Yup.object({
  name: Yup.string().required('Nome do produto é obrigatório'),
  qty: Yup.number().required('Quantidade é obrigatória').min(1, 'A quantidade deve ser maior que 0'),
  price: Yup.number().required('Preço é obrigatório').min(0, 'O preço não pode ser negativo'),
  photo: Yup.string().url('URL inválida').required('Foto do produto é obrigatória'),
});

export default function FormToEditProducts({ initialValues = {
  name: "",
  qty: 0,
  price: 0,
  photo: "",
  categories: [{id: 'id', name: 'someother'}, {id: 'noID', name: 'eletronic'}, {id: 'ad', name: 'fashin'}, {id: 'fd', name: 'none'}, ]
}, onSubmit }: ProductFormProps) {

  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const handleCategoryClick = (id: string) => {
    if (selectedCategories.includes(id)) {
      setSelectedCategories(selectedCategories.filter((categoryId) => categoryId !== id));
    } else if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, id]);
    }
  };
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
    >
      {() => (
        <Form className={styles.productForm}>
          <div className={styles.formGroup}>
            <label htmlFor="name">Nome do Produto</label>
            <Field id="name" name="name" type="text" />
            <ErrorMessage name="name" component="div" className={styles.error} />
          </div>

          <div className={styles.formGroup}>
          <label htmlFor="categories">Categorias (máximo de 3)</label>
  <div className={styles.chipContainer}>
    {initialValues!.categories.map((category) => (
      <div
        key={category.id}
        className={`${styles.chip} ${selectedCategories.includes(category.id) ? styles.selected : ''}`}
        onClick={() => handleCategoryClick(category.id)}
      >
        {category.name}
      </div>
    ))}
  </div>
  <ErrorMessage name="categories" component="div" className={styles.error} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="qty">Quantidade</label>
            <Field id="qty" name="qty" type="number" />
            <ErrorMessage name="qty" component="div" className={styles.error} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="price">Preço</label>
            <Field id="price" name="price" type="number" />
            <ErrorMessage name="price" component="div" className={styles.error} />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="photo">Foto do Produto (URL)</label>
            <Field id="photo" name="photo" type="text" />
            <ErrorMessage name="photo" component="div" className={styles.error} />
          </div>

          <button type="submit" className={styles.submitButton}>Salvar Produto</button>
        </Form>
      )}
    </Formik>
  );
}
