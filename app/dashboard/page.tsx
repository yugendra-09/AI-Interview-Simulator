import Navbar from "../../components/Navbar";

export default function Dashboard() {
  return (
    <>
      <Navbar />

      <div className="p-8">
        <h1 className="text-3xl font-bold mb-6">
          Dashboard
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">
              Resume
            </h2>
            <p>Upload and manage your resume.</p>
            <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded">
              Upload Resume
            </button>
          </div>

          <div className="bg-white shadow-md rounded-lg p-6">
            <h2 className="text-xl font-semibold mb-2">
              Mock Interview
            </h2>
            <p>Start an AI-powered interview.</p>
            <button className="mt-4 bg-green-600 text-white px-4 py-2 rounded">
              Start Interview
            </button>
          </div>
        </div>
      </div>
    </>
  );
}