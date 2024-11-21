

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="mb-6 text-2xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* Add your dashboard content here */}
        <div className="p-6 bg-white rounded-lg shadow">
          <h2 className="mb-4 text-lg font-semibold">Sales Overview</h2>
          {/* Add sales charts/stats */}
        </div>
        {/* Add more dashboard widgets */}
      </div>
    </div>
  );
};

export default Dashboard;
