import VisaForm from "../../components/forms/VisaForm";

const AddVisa = () => {
  return (
    <div className="max-w-6xl mx-auto">

      <div className="mb-8">

        <h1 className="text-4xl font-bold">
          Add New Visa
        </h1>

        <p className="text-gray-500 mt-2">
          Fill in the visa information below.
        </p>

      </div>

      <VisaForm />

    </div>
  );
};

export default AddVisa;