import { FaSync } from "react-icons/fa";

const ReloadButton = () => {
  const handleReload = () => {
    window.location.reload();
  };

  return (
    <button
      className="fixed bottom-7 left-9 m-2 rounded-full bg-gray-50 p-2 text-gray-700 shadow-md hover:bg-gray-200"
      onClick={handleReload}
    >
      <FaSync className="h-6 w-6" />
    </button>
  );
};

export default ReloadButton;
