import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { createVisa } from "../../services/visaApi";
import DateField from "../common/DateField";

export interface VisaFormData {
  foreignerName: string;
  passportNo: string;
  source: string;
  visaCategory: string;
  duration: string;
  workStatus: string;
  receiveDate: string;
  visaExpiryDate: string;
  fileSubmitDate: string;
  deliveryDate: string;
  paymentStatus: "Paid" | "Pending" | "";
  remark: string;
}

interface Props {
  defaultValues?: Partial<VisaFormData>;
  isEdit?: boolean;
  onSubmitEdit?: (data: VisaFormData) => Promise<void>;
}

const VisaForm = ({ defaultValues, isEdit = false, onSubmitEdit }: Props) => {
  const navigate = useNavigate();
  const [openDateField, setOpenDateField] = useState<string | null>(null);

  const {
    register,
    control,
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
      toast.error(error?.response?.data?.message || "Something went wrong");
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
          <label className="font-medium">Foreigner Name *</label>

          <input
            {...register("foreignerName", {
              required: "Foreigner Name is required",
              validate: (value) =>
                value.trim().length > 0 || "Foreigner Name is required",
            })}
            className="mt-2 w-full border rounded-lg p-3"
          />

          <p className="text-red-500 text-sm">
            {errors.foreignerName?.message}
          </p>
        </div>

        {/* Passport */}
        <div>
          <label className="font-medium">Passport No *</label>

          <input
            {...register("passportNo", {
              required: "Passport No is required",
              validate: (value) =>
                value.trim().length > 0 || "Passport No is required",
            })}
            className="mt-2 w-full border rounded-lg p-3"
          />

          <p className="text-red-500 text-sm">{errors.passportNo?.message}</p>
        </div>

        {/* Source */}
        <div>
          <label className="font-medium">Source *</label>

          <input
            {...register("source", {
              required: "Source is required",
              validate: (value) =>
                value.trim().length > 0 || "Source is required",
            })}
            className="mt-2 w-full border rounded-lg p-3"
          />
          <p className="text-red-500 text-sm">{errors.source?.message}</p>
        </div>

        {/* Category */}
        <div>
          <label className="font-medium">Visa Category *</label>

          <input
            {...register("visaCategory", {
              required: "Visa Category is required",
              validate: (value) =>
                value.trim().length > 0 || "Visa Category is required",
            })}
            className="mt-2 w-full border rounded-lg p-3"
          />
          <p className="text-red-500 text-sm">{errors.visaCategory?.message}</p>
        </div>

        {/* Duration */}
        <div>
          <label className="font-medium">Duration *</label>

          <input
            {...register("duration", {
              required: "Duration is required",
              validate: (value) =>
                value.trim().length > 0 || "Duration is required",
            })}
            className="mt-2 w-full border rounded-lg p-3"
          />
          <p className="text-red-500 text-sm">{errors.duration?.message}</p>
        </div>

        {/* Work Status */}
        <div>
          <label className="font-medium">Work Status *</label>

          <input
            {...register("workStatus", {
              required: "Work Status is required",
              validate: (value) =>
                value.trim().length > 0 || "Work Status is required",
            })}
            className="mt-2 w-full border rounded-lg p-3"
          />

          <p className="text-red-500 text-sm">{errors.workStatus?.message}</p>
        </div>

        {/* Payment */}
        <div>
          <label className="font-medium">Payment Status</label>

          <select
            {...register("paymentStatus")}
            className="mt-2 w-full border rounded-lg p-3"
          >
            <option value="">Not set</option>
            <option value="Paid">Paid</option>

            <option value="Pending">Pending</option>
          </select>
        </div>

        {/* Receive Date */}
        <div>
          <label className="font-medium">Receive Date *</label>

          <Controller
            name="receiveDate"
            control={control}
            rules={{ required: "Receive Date is required" }}
            render={({ field }) => (
              <DateField
                name={field.name}
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                required
                open={openDateField === field.name}
                onOpenChange={(open) =>
                  setOpenDateField(open ? field.name : null)
                }
              />
            )}
          />
          <p className="text-red-500 text-sm">{errors.receiveDate?.message}</p>
        </div>

        {/* Expiry */}
        <div>
          <label className="font-medium">Expiry Date *</label>

          <Controller
            name="visaExpiryDate"
            control={control}
            rules={{ required: "Expiry Date is required" }}
            render={({ field }) => (
              <DateField
                name={field.name}
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                required
                open={openDateField === field.name}
                onOpenChange={(open) =>
                  setOpenDateField(open ? field.name : null)
                }
              />
            )}
          />
          <p className="text-red-500 text-sm">
            {errors.visaExpiryDate?.message}
          </p>
        </div>

        {/* File Submit */}
        <div>
          <label className="font-medium">File Submit Date</label>

          <Controller
            name="fileSubmitDate"
            control={control}
            render={({ field }) => (
              <DateField
                name={field.name}
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                open={openDateField === field.name}
                onOpenChange={(open) =>
                  setOpenDateField(open ? field.name : null)
                }
              />
            )}
          />
        </div>

        {/* Delivery */}
        <div>
          <label className="font-medium">Delivery Date</label>

          <Controller
            name="deliveryDate"
            control={control}
            render={({ field }) => (
              <DateField
                name={field.name}
                value={field.value || ""}
                onChange={field.onChange}
                onBlur={field.onBlur}
                open={openDateField === field.name}
                onOpenChange={(open) =>
                  setOpenDateField(open ? field.name : null)
                }
              />
            )}
          />
        </div>
      </div>

      {/* Remark */}
      <div>
        <label className="font-medium">Remark</label>

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
          {isSubmitting ? "Saving..." : isEdit ? "Update Visa" : "Save Visa"}
        </button>
      </div>
    </form>
  );
};

export default VisaForm;
