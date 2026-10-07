interface Props {
  visas: any[];
}

const RecentVisaTable = ({ visas }: Props) => {
  return (
    <div className="min-w-0 rounded-xl bg-white shadow">
      <div className="border-b px-6 py-4">
        <h2 className="text-xl font-semibold">Recent Visa Entries</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px]">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-4 text-left">Name</th>

              <th className="p-4 text-left">Passport</th>

              <th className="p-4 text-left">Category</th>

              <th className="p-4 text-left">Receive Date</th>

              <th className="p-4 text-left">Expiry Date</th>

              <th className="p-4 text-left">Work Status</th>

              <th className="p-4 text-left">Payment</th>
            </tr>
          </thead>

          <tbody>
            {visas.map((visa) => (
              <tr key={visa._id} className="border-t hover:bg-gray-50">
                <td className="p-4">{visa.foreignerName}</td>

                <td className="p-4">{visa.passportNo}</td>

                <td className="p-4">{visa.visaCategory}</td>

                <td className="p-4">{visa.receiveDate?.substring(0, 10)}</td>

                <td className="p-4">{visa.visaExpiryDate?.substring(0, 10)}</td>

                <td className="p-4">{visa.workStatus || "-"}</td>

                <td className="p-4">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${
                      visa.paymentStatus === "Paid"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {visa.paymentStatus || "Not set"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentVisaTable;
