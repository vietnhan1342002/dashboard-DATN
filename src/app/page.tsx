import Dashboard from "./components/Dashboard";
import Sidebar from "./components/Sidebar";

export default function Home() {
  return (
    <main className="flex h-screen">
      <div className="flex-shrink-0 w-64">  {/* Đặt chiều rộng cố định cho Sidebar */}
        <Sidebar />
      </div>
      <div className="flex-1 overflow-y-auto">
        <Dashboard />
      </div>
    </main>
  );
}
