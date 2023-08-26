const ViewBlock = ({ label, value }) => {
  return (
    <div className="flex justify-between border-b border-base-100">
      <p className="w-3/4 text-left">{label}</p>
      <p className="w-1/2 text-right text-gray-500">{value}</p>
    </div>
  );
};

export default ViewBlock;
