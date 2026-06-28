"use client";

import Navbar from "../../components/Navbar";
import { useRouter } from "next/navigation";
import {
  FaFileUpload,
  FaRobot,
  FaMicrophone,
  FaChartBar,
  FaCode,
  FaSignOutAlt,
} from "react-icons/fa";

export default function Dashboard() {
  const router = useRouter();

  return (
    <>
      <Navbar />

      <div className="bg-gray-100 min-h-screen p-8">
        <h1 className="text-4xl font-bold mb-2">
          Welcome 👋
        </h1>

        <p className="text-gray-600 mb-8">
          Practice interviews, improve your resume, and prepare for placements.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

          <DashboardCard
            icon={<FaFileUpload size={28} />}
            title="Resume"
            description="Upload and manage your resume."
            color="bg-blue-600"
            onClick={() => router.push("/resume")}
          />

          <DashboardCard
            icon={<FaRobot size={28} />}
            title="Resume Analysis"
            description="AI-powered resume review."
            color="bg-green-600"
            onClick={() => router.push("/analysis")}
          />

          <DashboardCard
            icon={<FaMicrophone size={28} />}
            title="Mock Interview"
            description="Practice AI interviews."
            color="bg-purple-600"
            onClick={() => router.push("/interview")}
          />

          <DashboardCard
            icon={<FaChartBar size={28} />}
            title="Interview Reports"
            description="View previous reports."
            color="bg-orange-600"
            onClick={() => router.push("/reports")}
          />

          <DashboardCard
            icon={<FaCode size={28} />}
            title="Coding Practice"
            description="Solve company coding questions."
            color="bg-red-600"
            onClick={() => alert("Coming Soon")}
          />

          <DashboardCard
            icon={<FaSignOutAlt size={28} />}
            title="Logout"
            description="Sign out from your account."
            color="bg-gray-700"
            onClick={() => {
              localStorage.clear();
              router.push("/");
            }}
          />

        </div>
      </div>
    </>
  );
}

function DashboardCard({
  icon,
  title,
  description,
  color,
  onClick,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition">
      <div className={`${color} text-white w-14 h-14 rounded-full flex items-center justify-center mb-4`}>
        {icon}
      </div>

      <h2 className="text-xl font-semibold mb-2">
        {title}
      </h2>

      <p className="text-gray-600 mb-5">
        {description}
      </p>

      <button
        onClick={onClick}
        className={`${color} text-white px-4 py-2 rounded hover:opacity-90`}
      >
        Open
      </button>
    </div>
  );
}