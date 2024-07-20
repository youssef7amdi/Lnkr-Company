function DataItem({ label, value }) {
  return (
    <div className="flex basis-[48%]">
      <span className="inline-block min-w-[17rem] font-bold text-gray-900">
        {label}:{' '}
      </span>
      <span className="font-[500] text-gray-900">{value}</span>
    </div>
  );
}

export default DataItem;
