import { Bell } from "lucide-react";

const Notifications = () => {
  const notifications = [
    { id: 1, message: "20% off on all canvas prints!", type: "promotion" },
    { id: 2, message: "Your order #2 has been shipped", type: "order" },
    {
      id: 3,
      message: "Premium subscription renewal in 5 days",
      type: "subscription",
    },
  ];

  return (
    <div>
      <div className="p-6 bg-white border rounded-lg shadow-sm">
        <h2 className="flex items-center mb-4 text-xl font-semibold">
          <Bell size={20} className="mr-2" /> Notifications
        </h2>
        <div className="space-y-3">
          {notifications.map((notification) => (
            <div
              key={notification.id}
              className="p-4 border rounded-lg bg-green-50"
            >
              <p className="text-green-800">{notification.message}</p>
              <p className="mt-1 text-sm text-green-600 capitalize">
                {notification.type}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Notifications;
