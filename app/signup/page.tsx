import Navbar from "../../components/Navbar";

export default function Signup() {
  return (
    <>
      <Navbar />

      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-8 rounded-lg shadow-md w-96">
          <h1 className="text-2xl font-bold text-center mb-6">
            Create Account
          </h1>

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 border rounded mb-4"
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 border rounded mb-4"
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 border rounded mb-4"
          />

          <button className="w-full bg-green-600 text-white p-3 rounded">
            Sign Up
          </button>
        </div>
      </div>
    </>
  );
}