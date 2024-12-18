import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <main className="flex h-screen">
      <div className="bg-blue-600 text-white flex-shrink-0">
        <Sidebar />
      </div>

      <div className="flex-1 bg-blue-50">
        <Dashboard />
      </div>
    </main>
  );
}
