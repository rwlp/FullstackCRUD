import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import styles from './styles.module.scss';
import { useState, useEffect } from 'react';
import { Product } from '../../types/Product';
import axios from 'axios';
import { apiRootUrl } from '../../services/constants';
import { Category } from '../../types/Category';
import { useNavigate } from 'react-router-dom';

interface ProductFormProps {
  initialValues?: Product;
  onSubmit: (values: Product, resetForm: () => void) => void;
  
}

const validationSchema = Yup.object({
  name: Yup.string().required('Nome do produto é obrigatório'),
  qty: Yup.number().required('Quantidade é obrigatória').min(1, 'A quantidade deve ser maior que 0'),
  price: Yup.number().required('Preço é obrigatório').min(0, 'O preço não pode ser negativo'),
  photo: Yup.string().url('URL inválida').required('Foto do produto é obrigatória'),
});

export default function FormToEditProducts({ initialValues, onSubmit }: ProductFormProps) {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
  const [availableCategories, setAvailableCategories] = useState<Category[]>([]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${apiRootUrl}/category`);
      setAvailableCategories(response.data as Category[]);
    } catch (error) {
      alert('Erro ao carregar categorias, tente mais tarde!');
      navigate("/");
    }
  };

  useEffect(() => {
    fetchCategories();
    if (initialValues?.categories) {
      setSelectedCategories(initialValues.categories);
    }
  }, []);

  const handleCategoryClick = (category: Category) => {
    if (selectedCategories.some((cat) => cat.id === category.id)) {
      setSelectedCategories(selectedCategories.filter((cat) => cat.id !== category.id));
      return;
    };
    if (selectedCategories.length < 3) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  return (
    <Formik
      initialValues={initialValues || {
        name: "",
        qty: 0,
        price: 0,
        photo: "",
        categories: [] as Category[],
        id: ''
      }}
      validationSchema={validationSchema}
      onSubmit={(values, {resetForm}) => {
        values.categories = selectedCategories;
        console.log(values.categories.map(cat => cat.name), `there is all categories`);
        onSubmit(values, resetForm );
      }
      }
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
              {availableCategories.map((category) => (
                <div
                  key={category.id}
                  className={`${styles.chip} ${selectedCategories.find(cat => cat.id === category.id) ? styles.selected : ''}`}
                  onClick={() => handleCategoryClick(category)}
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
