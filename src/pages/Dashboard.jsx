import DashboardLayout from "../features/dashboard/DashboardLayout";

function Dashboard() {
  return (
    <div>
      <div className="mb-14 flex items-center justify-between">
        <h2 className="text-4xl font-bold">Dashboard</h2>
      </div>

      <DashboardLayout />
    </div>
  );
}

export default Dashboard;
