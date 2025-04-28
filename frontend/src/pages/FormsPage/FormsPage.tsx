import FormToEditProducts from "../../components/FormToEditProducts/FormToEditProducts";

export default function FormsPage() {

  return (
    <>
      <FormToEditProducts onSubmit={() => console.log('hi')} />
    </>
  )
}
