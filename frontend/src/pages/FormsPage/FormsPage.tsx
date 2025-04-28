import { useParams } from "react-router-dom";
import FormToEditProducts from "../../components/FormToEditProducts/FormToEditProducts";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { fetchProductById } from "../../services/fetchProductById";
import { apiRootUrl } from "../../services/constants";

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

  const handleSubmit = (values: any) => {
    if (isEditing) {
      axios.patch(`${apiRootUrl}/products/${id}`, values);
    } else {
      axios.post(`${apiRootUrl}/products`, values);
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
