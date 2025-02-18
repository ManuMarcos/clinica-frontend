

const especialidades = ["Cardiología", "Neurología", "Pediatría", "Dermatología"];

export const EspecialidadesPills = () => {
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-xl font-semibold mb-3">Especialidades</h2>
      <div className="flex flex-wrap gap-2">
        {especialidades.map((esp, index) => (
          <span key={index} className="inline-flex items-center rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-blue-800">
            {esp}
          </span>
        ))}
      </div>
    </div>
  );
};