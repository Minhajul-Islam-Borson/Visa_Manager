import {
  X,
  Filter,
} from "lucide-react";

import type { VisaQuery } from "../../types/visa";

interface Props {
  open: boolean;
  filters: VisaQuery;

  onClose: () => void;

  onChange: (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement
    >
  ) => void;

  onApply: () => void;

  onReset: () => void;
}

const FilterDrawer = ({
  open,
  filters,
  onClose,
  onChange,
  onApply,
  onReset,
}: Props) => {
  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/30 z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-96 bg-white shadow-2xl z-50 transition-transform duration-300 ${
          open
            ? "translate-x-0"
            : "translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center border-b p-5">

          <div className="flex items-center gap-2">

            <Filter size={20} />

            <h2 className="text-xl font-bold">
              Filters
            </h2>

          </div>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <div className="p-5 space-y-5">

          <select
            name="paymentStatus"
            value={filters.paymentStatus}
            onChange={onChange}
            className="w-full border rounded-lg p-3"
          >
            <option value="">All Payment</option>
            <option value="Paid">Paid</option>
            <option value="UnPaid">UnPaid</option>
          </select>

          <input
            name="visaCategory"
            value={filters.visaCategory}
            onChange={onChange}
            placeholder="Visa Category"
            className="w-full border rounded-lg p-3"
          />

          <input
            name="source"
            value={filters.source}
            onChange={onChange}
            placeholder="Source"
            className="w-full border rounded-lg p-3"
          />

          <div>

            <label>
              Receive From
            </label>

            <input
              type="date"
              name="receiveFrom"
              value={filters.receiveFrom}
              onChange={onChange}
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>

          <div>

            <label>
              Receive To
            </label>

            <input
              type="date"
              name="receiveTo"
              value={filters.receiveTo}
              onChange={onChange}
              className="w-full border rounded-lg p-3 mt-2"
            />

          </div>

          <div className="flex gap-3 pt-4">

            <button
              onClick={onApply}
              className="flex-1 bg-blue-600 text-white rounded-lg py-3"
            >
              Apply
            </button>

            <button
              onClick={onReset}
              className="flex-1 bg-gray-200 rounded-lg py-3"
            >
              Reset
            </button>

          </div>

        </div>

      </div>
    </>
  );
};

export default FilterDrawer;