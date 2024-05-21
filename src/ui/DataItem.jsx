function DataItem({ label, value }) {
  return (
    <div className="basis-[48%]">
      <span className="inline-block min-w-[20rem]">{label}: </span>
      <span className="font-[500] text-gray-900">{value}</span>
    </div>
  );
}

export default DataItem;
