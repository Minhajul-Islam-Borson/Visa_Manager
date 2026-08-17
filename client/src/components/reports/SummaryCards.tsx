interface Props {
  totalVisa: number;
  paid: number;
  pending: number;
}

const SummaryCards = ({
  totalVisa,
  paid,
  pending,
}: Props) => {
  const cards = [
    {
      title: "Total Visa",
      value: totalVisa,
      color: "bg-blue-600",
    },
    {
      title: "Paid",
      value: paid,
      color: "bg-green-600",
    },
    {
      title: "Pending",
      value: pending,
      color: "bg-red-500",
    },
  ];

  return (
    <div className="grid md:grid-cols-3 gap-6">

      {cards.map((card) => (

        <div
          key={card.title}
          className={`${card.color} text-white rounded-2xl p-6 shadow-lg`}
        >
          <h2 className="text-lg font-medium">
            {card.title}
          </h2>

          <p className="text-4xl font-bold mt-3">
            {card.value}
          </p>

        </div>

      ))}

    </div>
  );
};

export default SummaryCards;