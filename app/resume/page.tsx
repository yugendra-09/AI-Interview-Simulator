"use client";

import { useState } from "react";
import Navbar from "../../components/Navbar";
import api from "../../services/api";

export default function ResumePage() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a PDF file");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("resume", file);

      const response = await api.post(
        "/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);
      setFile(null);
    } catch (error: any) {
      alert(
        error.response?.data?.message ||
          "Resume upload failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-gray-100 p-8">

        <div className="max-w-xl mx-auto bg-white rounded-xl shadow-lg p-8">

          <h1 className="text-3xl font-bold mb-6">
            Upload Resume
          </h1>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              if (e.target.files) {
                setFile(e.target.files[0]);
              }
            }}
            className="w-full border rounded-lg p-3 mb-5"
          />

          {file && (
            <p className="mb-4 text-green-600">
              Selected File: {file.name}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg w-full"
          >
            {loading ? "Uploading..." : "Upload Resume"}
          </button>

        </div>

      </div>
    </>
  );
}