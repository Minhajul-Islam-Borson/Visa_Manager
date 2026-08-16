import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createVisa } from "../../services/visaApi";

export interface VisaFormData {
  foreignerName: string;
  passportNo: string;
  source: string;
  visaCategory: string;
  duration: string;
  receiveDate: string;
  visaExpiryDate: string;
  fileSubmitDate: string;
  deliveryDate: string;
  paymentStatus: "Paid" | "UnPaid";
  remark: string;
}

interface Props {
  defaultValues?: Partial<VisaFormData>;
  isEdit?: boolean;
  onSubmitEdit?: (data: VisaFormData) => Promise<void>;
}

const VisaForm = ({
  defaultValues,
  isEdit = false,
  onSubmitEdit,
}: Props) => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VisaFormData>({
    defaultValues,
  });

  const onSubmit = async (data: VisaFormData) => {
    try {
      if (isEdit && onSubmitEdit) {
        await onSubmitEdit(data);
        toast.success("Visa Updated Successfully");
      } else {
        await createVisa(data);
        toast.success("Visa Added Successfully");
      }

      navigate("/visa");
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-xl shadow-lg p-8 space-y-6"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

        {/* Foreigner Name */}
        <div>
          <label className="font-medium">
            Foreigner Name *
          </label>

          <input
            {...register("foreignerName", {
              required: "Foreigner Name is required",
            })}
            className="mt-2 w-full border rounded-lg p-3"
          />

          <p className="text-red-500 text-sm">
            {errors.foreignerName?.message}
          </p>
        </div>

        {/* Passport */}
        <div>
          <label className="font-medium">
            Passport No *
          </label>

          <input
            {...register("passportNo", {
              required: "Passport No is required",
            })}
            className="mt-2 w-full border rounded-lg p-3"
          />

          <p className="text-red-500 text-sm">
            {errors.passportNo?.message}
          </p>
        </div>

        {/* Source */}
        <div>
          <label className="font-medium">
            Source
          </label>

          <input
            {...register("source")}
            className="mt-2 w-full border rounded-lg p-3"
          />
        </div>

        {/* Category */}
        <div>
          <label className="font-medium">
            Visa Category
          </label>

          <input
            {...register("visaCategory")}
            className="mt-2 w-full border rounded-lg p-3"
          />
        </div>

        {/* Duration */}
        <div>
          <label className="font-medium">
            Duration
          </label>

          <input
            {...register("duration")}
            className="mt-2 w-full border rounded-lg p-3"
          />
        </div>

        {/* Payment */}
        <div>
          <label className="font-medium">
            Payment Status
          </label>

          <select
            {...register("paymentStatus")}
            className="mt-2 w-full border rounded-lg p-3"
          >
            <option value="Paid">
              Paid
            </option>

            <option value="UnPaid">
              UnPaid
            </option>
          </select>
        </div>

        {/* Receive Date */}
        <div>
          <label className="font-medium">
            Receive Date
          </label>

          <input
            type="date"
            {...register("receiveDate")}
            className="mt-2 w-full border rounded-lg p-3"
          />
        </div>

        {/* Expiry */}
        <div>
          <label className="font-medium">
            Visa Expiry Date
          </label>

          <input
            type="date"
            {...register("visaExpiryDate")}
            className="mt-2 w-full border rounded-lg p-3"
          />
        </div>

        {/* File Submit */}
        <div>
          <label className="font-medium">
            File Submit Date
          </label>

          <input
            type="date"
            {...register("fileSubmitDate")}
            className="mt-2 w-full border rounded-lg p-3"
          />
        </div>

        {/* Delivery */}
        <div>
          <label className="font-medium">
            Delivery Date
          </label>

          <input
            type="date"
            {...register("deliveryDate")}
            className="mt-2 w-full border rounded-lg p-3"
          />
        </div>

      </div>

      {/* Remark */}
      <div>
        <label className="font-medium">
          Remark
        </label>

        <textarea
          rows={4}
          {...register("remark")}
          className="mt-2 w-full border rounded-lg p-3"
        />
      </div>

      <div className="flex justify-end gap-4">

        <button
          type="button"
          onClick={() => navigate("/visa")}
          className="px-6 py-3 rounded-lg bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-3 rounded-lg bg-blue-600 text-white hover:bg-blue-700"
        >
          {isSubmitting
            ? "Saving..."
            : isEdit
            ? "Update Visa"
            : "Save Visa"}
        </button>

      </div>

    </form>
  );
};

export default VisaForm;