import { useEffect, useState } from "react";
import { Search, Plus, Filter, Eye } from "lucide-react";
import { useNavigate } from "react-router-dom";

import { getAllVisa } from "../../services/visaApi";

import type { Visa, VisaQuery } from "../../types/visa";

import Pagination from "../../components/common/Pagination";
import FilterDrawer from "../../components/visa/FilterDrawer";

const VisaList = () => {
  const navigate = useNavigate();

  const [visas, setVisas] = useState<Visa[]>([]);
  const [loading, setLoading] = useState(true);

  const [showFilter, setShowFilter] = useState(false);

  const [totalPages, setTotalPages] = useState(1);

  const [searchText, setSearchText] = useState("");
  const [filters, setFilters] = useState<VisaQuery>({
    search: "",
    paymentStatus: "",
    visaCategory: "",
    source: "",
    receiveFrom: "",
    receiveTo: "",
    page: 1,
    limit: 10,
  });

  useEffect(() => {
    loadVisa();
  }, [filters]);

  const handleSearch = () => {
    setFilters((prev) => ({
      ...prev,
      search: searchText.trim(),
      page: 1,
    }));
  };

  const loadVisa = async () => {
    try {
      setLoading(true);

      const res = await getAllVisa(filters);

      setVisas(res.data.data);

      setTotalPages(res.data.totalPages || 1);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setFilters({
      ...filters,
      page: 1,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = () => {
    loadVisa();
    setShowFilter(false);
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      paymentStatus: "",
      visaCategory: "",
      source: "",
      receiveFrom: "",
      receiveTo: "",
      page: 1,
      limit: 10,
    });

    setShowFilter(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Visa List</h1>

          <p className="text-gray-500">Manage all visa records</p>
        </div>

        <button
          onClick={() => navigate("/visa/add")}
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg transition"
        >
          <Plus size={18} />
          Add Visa
        </button>
      </div>

      {/* Search + Filter */}

      <div className="bg-white rounded-xl shadow p-5">
        <div className="flex items-center gap-3">
          {/* Search Box */}

          <div className="relative w-[380px]">
            <Search size={18} className="absolute left-3 top-3 text-gray-400" />

            <input
              type="text"
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Passport No or Name"
              className="w-full border rounded-lg py-2 pl-10 pr-4 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          {/* Search Button */}

          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg transition"
          >
            Search
          </button>

          {/* Filter Button */}

          <button
            onClick={() => setShowFilter(true)}
            className="flex items-center gap-2 border border-gray-300 hover:bg-gray-100 px-5 py-2 rounded-lg transition"
          >
            <Filter size={18} />
            Filters
          </button>
        </div>
      </div>

      <FilterDrawer
        open={showFilter}
        filters={filters}
        onClose={() => setShowFilter(false)}
        onChange={handleChange}
        onApply={applyFilters}
        onReset={resetFilters}
      />

      {/* Table */}

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Passport</th>

              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-left">Source</th>

              <th className="p-4 text-left">Expiry</th>

              <th className="p-4 text-left">Payment</th>

              <th className="p-4 text-center">Action</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="py-10 text-center">
                  Loading visas...
                </td>
              </tr>
            ) : visas.length === 0 ? (
              <tr>
                <td colSpan={7} className="py-10 text-center">
                  No Visa Found
                </td>
              </tr>
            ) : (
              visas.map((visa) => (
                <tr
                  key={visa._id}
                  className="border-t hover:bg-slate-50 transition"
                >
                  <td className="p-4 font-medium">{visa.foreignerName}</td>

                  <td className="p-4">{visa.passportNo}</td>

                  <td className="p-4">{visa.visaCategory}</td>

                  <td className="p-4">{visa.source}</td>

                  <td className="p-4">
                    {visa.visaExpiryDate?.substring(0, 10)}
                  </td>

                  <td className="p-4">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-semibold ${
                        visa.paymentStatus === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {visa.paymentStatus}
                    </span>
                  </td>

                  <td className="p-4">
                    <div className="flex justify-center gap-2">
                      <button
                        onClick={() => navigate(`/visa/${visa._id}`)}
                        className="flex items-center gap-1 bg-blue-100 hover:bg-blue-200 text-blue-700 px-3 py-2 rounded-lg transition"
                      >
                        <Eye size={16} />
                        View
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <Pagination
        currentPage={filters.page || 1}
        totalPages={totalPages}
        onPageChange={(page) =>
          setFilters((prev) => ({
            ...prev,
            page,
          }))
        }
      />
    </div>
  );
};

export default VisaList;
