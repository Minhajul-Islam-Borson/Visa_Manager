import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { ArrowLeft, Pencil, Download, Save, X } from "lucide-react";

import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

import { getVisaById, updateVisa } from "../../services/visaApi";
import DateField from "../../components/common/DateField";
import { formatIsoDate } from "../../components/common/dateUtils.ts";

const VisaDetails = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [editMode, setEditMode] = useState(false);

  const [openDateField, setOpenDateField] = useState<string | null>(null);

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
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
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
    doc.text(`Generated : ${new Date().toLocaleString()}`, 14, 28);

    autoTable(doc, {
      startY: 38,
      head: [["Field", "Value"]],
      body: [
        ["Foreigner Name", visa.foreignerName || "-"],
        ["Passport No", visa.passportNo || "-"],
        ["Source", visa.source || "-"],
        ["Visa Category", visa.visaCategory || "-"],
        ["Duration", visa.duration || "-"],
        ["Work Status", visa.workStatus || "-"],
        ["Receive Date", formatIsoDate(visa.receiveDate) || "-"],
        ["File Submit Date", formatIsoDate(visa.fileSubmitDate) || "-"],
        ["Expiry Date", formatIsoDate(visa.visaExpiryDate) || "-"],
        ["Delivery Date", formatIsoDate(visa.deliveryDate) || "-"],
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
    return <div className="text-center py-24 text-lg">Loading...</div>;
  }

  return (
    <div className="mx-auto max-w-7xl space-y-6 px-0 py-2 sm:space-y-8 sm:px-2 sm:py-6 lg:px-4">
      {/* Header */}

      <div className="flex flex-col items-stretch justify-between gap-4 rounded-2xl bg-white p-4 shadow-lg sm:flex-row sm:items-center sm:p-6">
        <div>
          <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
            Visa Details
          </h1>

          <p className="text-gray-500 mt-1">Complete visa information</p>
        </div>

        <button
          onClick={() => navigate(-1)}
          className="flex w-full items-center justify-center gap-2 rounded-lg border px-5 py-2 hover:bg-gray-100 sm:w-auto"
        >
          <ArrowLeft size={18} />
          Back
        </button>
      </div>

      {/* Details Card */}

      <div className="rounded-2xl border border-gray-100 bg-white p-4 shadow-lg sm:p-8">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Foreigner Name */}
          <div>
            <label className="font-semibold">
              Foreigner Name{editMode && " *"}
            </label>

            {editMode ? (
              <input
                name="foreignerName"
                value={visa.foreignerName}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 mt-2 w-full"
              />
            ) : (
              <p className="mt-2 break-words">{visa.foreignerName}</p>
            )}
          </div>
          {/* Passport */}
          <div>
            <label className="font-semibold">
              Passport Number{editMode && " *"}
            </label>

            {editMode ? (
              <input
                name="passportNo"
                value={visa.passportNo}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 mt-2 w-full"
              />
            ) : (
              <p className="mt-2 break-words">{visa.passportNo}</p>
            )}
          </div>
          {/* Source */}
          <div>
            <label className="font-semibold">Source{editMode && " *"}</label>

            {editMode ? (
              <input
                name="source"
                value={visa.source}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 mt-2 w-full"
              />
            ) : (
              <p className="mt-2 break-words">{visa.source}</p>
            )}
          </div>
          {/* Visa Category */}
          <div>
            <label className="font-semibold">
              Visa Category{editMode && " *"}
            </label>

            {editMode ? (
              <input
                name="visaCategory"
                value={visa.visaCategory}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 mt-2 w-full"
              />
            ) : (
              <p className="mt-2 break-words">{visa.visaCategory}</p>
            )}
          </div>
          {/* Duration */}
          <div>
            <label className="font-semibold">Duration{editMode && " *"}</label>

            {editMode ? (
              <input
                name="duration"
                value={visa.duration}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 mt-2 w-full"
              />
            ) : (
              <p className="mt-2 break-words">{visa.duration}</p>
            )}
          </div>
          {/* Work Status */}
          <div>
            <label className="font-semibold">
              Work Status{editMode && " *"}
            </label>

            {editMode ? (
              <input
                name="workStatus"
                value={visa.workStatus || ""}
                onChange={handleChange}
                required
                className="border rounded-lg p-2 mt-2 w-full"
              />
            ) : (
              <p className="mt-2 break-words">{visa.workStatus || "-"}</p>
            )}
          </div>
          {/* Payment */}
          <div>
            <label className="font-semibold">Payment Status</label>

            {editMode ? (
              <select
                name="paymentStatus"
                value={visa.paymentStatus || ""}
                onChange={handleChange}
                className="border rounded-lg p-2 mt-2 w-full"
              >
                <option value="">Not set</option>
                <option value="Paid">Paid</option>

                <option value="Pending">Pending</option>
              </select>
            ) : (
              <p className="mt-2 break-words">{visa.paymentStatus || "-"}</p>
            )}
          </div>{" "}
          {/* Receive Date */}
          <div>
            <label className="font-semibold">
              Receive Date{editMode && " *"}
            </label>

            {editMode ? (
              <DateField
                name="receiveDate"
                value={visa.receiveDate?.substring(0, 10) || ""}
                onChange={(value) => setVisa({ ...visa, receiveDate: value })}
                required
                open={openDateField === "receiveDate"}
                onOpenChange={(open) =>
                  setOpenDateField(open ? "receiveDate" : null)
                }
              />
            ) : (
              <p className="mt-2 break-words">
                {formatIsoDate(visa.receiveDate) || "-"}
              </p>
            )}
          </div>
          {/* File Submit Date */}
          <div>
            <label className="font-semibold">File Submit Date</label>

            {editMode ? (
              <DateField
                name="fileSubmitDate"
                value={visa.fileSubmitDate?.substring(0, 10) || ""}
                onChange={(value) =>
                  setVisa({ ...visa, fileSubmitDate: value || null })
                }
                open={openDateField === "fileSubmitDate"}
                onOpenChange={(open) =>
                  setOpenDateField(open ? "fileSubmitDate" : null)
                }
              />
            ) : (
              <p className="mt-2 break-words">
                {formatIsoDate(visa.fileSubmitDate) || "-"}
              </p>
            )}
          </div>
          {/* Visa Expiry */}
          <div>
            <label className="font-semibold">
              Expiry Date{editMode && " *"}
            </label>

            {editMode ? (
              <DateField
                name="visaExpiryDate"
                value={visa.visaExpiryDate?.substring(0, 10) || ""}
                onChange={(value) =>
                  setVisa({ ...visa, visaExpiryDate: value })
                }
                required
                open={openDateField === "visaExpiryDate"}
                onOpenChange={(open) =>
                  setOpenDateField(open ? "visaExpiryDate" : null)
                }
              />
            ) : (
              <p className="mt-2 break-words">
                {formatIsoDate(visa.visaExpiryDate) || "-"}
              </p>
            )}
          </div>
          {/* Delivery Date */}
          <div>
            <label className="font-semibold">Delivery Date</label>

            {editMode ? (
              <DateField
                name="deliveryDate"
                value={visa.deliveryDate?.substring(0, 10) || ""}
                onChange={(value) =>
                  setVisa({ ...visa, deliveryDate: value || null })
                }
                open={openDateField === "deliveryDate"}
                onOpenChange={(open) =>
                  setOpenDateField(open ? "deliveryDate" : null)
                }
              />
            ) : (
              <p className="mt-2">{formatIsoDate(visa.deliveryDate) || "-"}</p>
            )}
          </div>
          {/* Remark */}
          <div className="md:col-span-2">
            <label className="font-semibold">Remark</label>

            {editMode ? (
              <textarea
                rows={4}
                name="remark"
                value={visa.remark}
                onChange={handleChange}
                className="border rounded-lg p-3 mt-2 w-full"
              />
            ) : (
              <p className="mt-2 whitespace-pre-wrap break-words">
                {visa.remark || "No Remark"}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Bar */}

      <div className="sticky bottom-3 flex flex-col justify-end gap-3 rounded-2xl border border-gray-200 bg-white p-3 shadow-xl sm:bottom-5 sm:flex-row sm:gap-4 sm:p-5">
        {!editMode ? (
          <>
            <button
              onClick={() => setEditMode(true)}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700 sm:w-auto sm:px-6"
            >
              <Pencil size={18} />
              Edit
            </button>

            <button
              onClick={downloadPDF}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-white transition hover:bg-green-700 sm:w-auto sm:px-6"
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
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-200 px-5 py-3 transition hover:bg-gray-300 sm:w-auto sm:px-6"
            >
              <X size={18} />
              Cancel
            </button>

            <button
              onClick={saveChanges}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-white transition hover:bg-blue-700 sm:w-auto sm:px-6"
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
