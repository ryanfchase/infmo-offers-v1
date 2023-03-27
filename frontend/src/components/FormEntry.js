const FormEntry = ({
  register,
  label,
  name,
  type = "text",
  selections = [],
  options,
  error,
}) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-bold mb-2">{label}</label>
      {selections.length > 0 ? (
        <select className="w-full border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" {...register(name, options)}>
          {selections.map((selection, i) => (
            <option key={selection.name} value={selection.name} readOnly={(i === 0)}>{selection.label}</option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="w-full border rounded-lg py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          {...register(name, options)}
        />
      )}
      <div className="text-red-500">{error?.message}</div>
    </div>
  );
};

export default FormEntry;
