import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  Pencil,
  Download,
  Save,
  X,
} from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import {
  getVisaById,
  updateVisa,
} from "../../services/visaApi";

const VisaDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);

  const [visa, setVisa] = useState<any>(null);

  useEffect(() => {
    loadVisa();
  }, []);

  const loadVisa = async () => {
    try {
      const res = await getVisaById(id!);

      setVisa(res.data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement |
      HTMLSelectElement |
      HTMLTextAreaElement
    >
  ) => {
    setVisa({
      ...visa,
      [e.target.name]: e.target.value,
    });
  };

  const saveChanges = async () => {
    try {
      await updateVisa(id!, visa);

      alert("Visa Updated Successfully");

      setEditMode(false);

      loadVisa();
    } catch (err) {
      console.log(err);
    }
  };

  const downloadPDF = () => {
    if (!visa) return;

    const doc = new jsPDF();

    doc.setFontSize(20);
    doc.text("Visa Details", 14, 20);

    doc.setFontSize(11);
    doc.text(
      `Generated : ${new Date().toLocaleString()}`,
      14,
      28
    );

    autoTable(doc, {
      startY: 38,
      head: [["Field", "Value"]],
      body: [
        ["Foreigner Name", visa.foreignerName || "-"],
        ["Passport No", visa.passportNo || "-"],
        ["Source", visa.source || "-"],
        ["Visa Category", visa.visaCategory || "-"],
        ["Duration", visa.duration || "-"],
        [
          "Receive Date",
          visa.receiveDate?.substring(0, 10) || "-",
        ],
        [
          "File Submit Date",
          visa.fileSubmitDate?.substring(0, 10) || "-",
        ],
        [
          "Expiry Date",
          visa.visaExpiryDate?.substring(0, 10) || "-",
        ],
        [
          "Delivery Date",
          visa.deliveryDate?.substring(0, 10) || "-",
        ],
        ["Payment Status", visa.paymentStatus || "-"],
        ["Remark", visa.remark || "-"],
      ],
      theme: "grid",
      headStyles: {
        fillColor: [37, 99, 235],
      },
    });

    doc.save(`${visa.passportNo}.pdf`);
  };

  if (loading) {
    return (
      <div className="text-center py-24 text-lg">
        Loading...
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-10 py-8 space-y-8">

      {/* Header */}

      <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">

        <div>

          <h1 className="text-3xl font-bold text-slate-800">
            Visa Details
          </h1>

          <p className="text-gray-500 mt-1">
            Complete visa information
          </p>

        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 border px-5 py-2 rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft size={18} />
          Back
        </button>

      </div>

      {/* Details Card */}

      <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">

        <div className="grid md:grid-cols-2 gap-6">

          {/* Foreigner Name */}

          <div>

            <label className="font-semibold">
              Foreigner Name
            </label>

            {editMode ? (
              <input
                name="foreignerName"
                value={visa.foreignerName}
                onChange={handleChange}
                className="border rounded-lg p-2 mt-2 w-full"
              />
            ) : (
              <p className="mt-2">
                {visa.foreignerName}
              </p>
            )}

          </div>

          {/* Passport */}

          <div>

            <label className="font-semibold">
              Passport No
            </label>

            {editMode ? (
              <input
                name="passportNo"
                value={visa.passportNo}
                onChange={handleChange}
                className="border rounded-lg p-2 mt-2 w-full"
              />
            ) : (
              <p className="mt-2">
                {visa.passportNo}
              </p>
            )}

          </div>

          {/* Source */}

          <div>

            <label className="font-semibold">
              Source
            </label>

            {editMode ? (
              <input
                name="source"
                value={visa.source}
                onChange={handleChange}
                className="border rounded-lg p-2 mt-2 w-full"
              />
            ) : (
              <p className="mt-2">
                {visa.source}
              </p>
            )}

          </div>

          {/* Visa Category */}

          <div>

            <label className="font-semibold">
              Visa Category
            </label>

            {editMode ? (
              <input
                name="visaCategory"
                value={visa.visaCategory}
                onChange={handleChange}
                className="border rounded-lg p-2 mt-2 w-full"
              />
            ) : (
              <p className="mt-2">
                {visa.visaCategory}
              </p>
            )}

          </div>

          {/* Duration */}

          <div>

            <label className="font-semibold">
              Duration
            </label>

            {editMode ? (
              <input
                name="duration"
                value={visa.duration}
                onChange={handleChange}
                className="border rounded-lg p-2 mt-2 w-full"
              />
            ) : (
              <p className="mt-2">
                {visa.duration}
              </p>
            )}

          </div>

          {/* Payment */}

          <div>

            <label className="font-semibold">
              Payment Status
            </label>

            {editMode ? (
              <select
                name="paymentStatus"
                value={visa.paymentStatus}
                onChange={handleChange}
                className="border rounded-lg p-2 mt-2 w-full"
              >
                <option value="Paid">
                  Paid
                </option>

                <option value="Pending">
                  Pending
                </option>

              </select>
            ) : (
              <p className="mt-2">
                {visa.paymentStatus}
              </p>
            )}

          </div>          {/* Receive Date */}

          <div>

            <label className="font-semibold">
              Receive Date
            </label>

            {editMode ? (
              <input
                type="date"
                name="receiveDate"
                value={visa.receiveDate?.substring(0, 10)}
                onChange={handleChange}
                className="border rounded-lg p-2 mt-2 w-full"
              />
            ) : (
              <p className="mt-2">
                {visa.receiveDate?.substring(0, 10)}
              </p>
            )}

          </div>

          {/* File Submit Date */}

          <div>

            <label className="font-semibold">
              File Submit Date
            </label>

            {editMode ? (
              <input
                type="date"
                name="fileSubmitDate"
                value={visa.fileSubmitDate?.substring(0, 10)}
                onChange={handleChange}
                className="border rounded-lg p-2 mt-2 w-full"
              />
            ) : (
              <p className="mt-2">
                {visa.fileSubmitDate?.substring(0, 10)}
              </p>
            )}

          </div>

          {/* Visa Expiry */}

          <div>

            <label className="font-semibold">
              Visa Expiry Date
            </label>

            {editMode ? (
              <input
                type="date"
                name="visaExpiryDate"
                value={visa.visaExpiryDate?.substring(0, 10)}
                onChange={handleChange}
                className="border rounded-lg p-2 mt-2 w-full"
              />
            ) : (
              <p className="mt-2">
                {visa.visaExpiryDate?.substring(0, 10)}
              </p>
            )}

          </div>

          {/* Delivery Date */}

          <div>

            <label className="font-semibold">
              Delivery Date
            </label>

            {editMode ? (
              <input
                type="date"
                name="deliveryDate"
                value={visa.deliveryDate?.substring(0, 10)}
                onChange={handleChange}
                className="border rounded-lg p-2 mt-2 w-full"
              />
            ) : (
              <p className="mt-2">
                {visa.deliveryDate?.substring(0, 10)}
              </p>
            )}

          </div>

          {/* Remark */}

          <div className="md:col-span-2">

            <label className="font-semibold">
              Remark
            </label>

            {editMode ? (
              <textarea
                rows={4}
                name="remark"
                value={visa.remark}
                onChange={handleChange}
                className="border rounded-lg p-3 mt-2 w-full"
              />
            ) : (
              <p className="mt-2 whitespace-pre-wrap">
                {visa.remark || "No Remark"}
              </p>
            )}

          </div>

        </div>

      </div>

      {/* Action Bar */}

      <div className="sticky bottom-5 bg-white rounded-2xl shadow-xl border border-gray-200 p-5 flex justify-end gap-4">

        {!editMode ? (
          <>

            <button
              onClick={() => setEditMode(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl"
            >
              <Pencil size={18} />

              Edit
            </button>

            <button
              onClick={downloadPDF}
              className="flex items-center gap-2 bg-green-600 hover:bg-green-700 transition text-white px-6 py-3 rounded-xl"
            >
              <Download size={18} />

              Download PDF
            </button>

          </>
        ) : (
          <>

            <button
              onClick={() => {
                setEditMode(false);
                loadVisa();
              }}
              className="flex items-center gap-2 bg-gray-200 hover:bg-gray-300 transition px-6 py-3 rounded-xl"
            >
              <X size={18} />

              Cancel
            </button>

            <button
              onClick={saveChanges}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition text-white px-6 py-3 rounded-xl"
            >
              <Save size={18} />

              Save Changes
            </button>

          </>
        )}

      </div>

    </div>
  );
};

export default VisaDetails;