import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between">
      <h1 className="font-bold text-xl">
        AI Interview Simulator
      </h1>

      <div className="space-x-4">
        <Link href="/">Login</Link>
        <Link href="/signup">Signup</Link>
        <Link href="/dashboard">Dashboard</Link>
        <Link href="/resume">Resume</Link>
      </div>
    </nav>
  );
}