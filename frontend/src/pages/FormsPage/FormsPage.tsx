import { useParams } from "react-router-dom";
import FormToEditProducts from "../../components/FormToEditProducts/FormToEditProducts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { fetchProductById } from "../../services/fetchProductById";
import { apiRootUrl } from "../../services/constants";
import { Product } from "../../types/Product";

export default function FormsPage() {
  const { id } = useParams<{ id: string }>();
  const isEditing = id !== "0";

  const { data: product, isLoading, isError } = useQuery(
    {
      queryKey: ['product', id],
      queryFn: () => isEditing ? fetchProductById(id!) : undefined,
      enabled: isEditing,
    }
  );

  const handleSubmit = async (values: Product, resetForm: () => void) => {
    const payload = {
      ...values,
      categories: values.categories.map((category) => ({id: category.id})),
    };

    try {
      if (isEditing) {
        await axios.patch(`${apiRootUrl}/product/${id}`, payload);
        alert('Produto atualizado com sucesso!');
      } else {
        await axios.post(`${apiRootUrl}/product`, payload);
        alert('Produto cadastrado com sucesso!');
      }
      resetForm();
    } catch (error) {
      alert('Erro ao salvar o produto.');
    }
  };

  if (isLoading) return <div>Carregando...</div>;
  if (isError) return <div>Erro ao carregar os dados do produto.</div>;

  return (
    <div>
      <h1>{isEditing ? 'Editar Produto' : 'Adicionar Novo Produto'}</h1>
      <FormToEditProducts
        initialValues={isEditing ? product : undefined}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
