import Navbar from "../../components/Navbar";

export default function ResumePage() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-xl mx-auto bg-white p-8 rounded-lg shadow-md">
          <h1 className="text-3xl font-bold mb-6">
            Upload Resume
          </h1>

          <input
            type="file"
            accept=".pdf,.doc,.docx"
            className="w-full border p-3 rounded mb-4"
          />

          <button className="bg-blue-600 text-white px-6 py-3 rounded">
            Upload Resume
          </button>
        </div>
      </div>
    </>
  );
}