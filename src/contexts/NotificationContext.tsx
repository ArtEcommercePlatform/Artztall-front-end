import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  ReactNode,
} from "react";
import { apiClient } from "../services/apiClient";
import { Notification, NotificationContextType } from "./notificationTypes";

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const NotificationProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const userId = localStorage.getItem("userId");

  const fetchNotifications = async () => {
    try {
      const response = await apiClient.get<Notification[]>(
        `/notifications/user/${userId}`,
      );
      if (response.success) {
        setNotifications(response.data);
        setUnreadCount(response.data.filter((n) => !n.read).length);
      }
    } catch (error) {
      console.error("Failed to fetch notifications", error);
    }
  };

  const fetchUnreadNotifications = async () => {
    try {
      const response = await apiClient.get<Notification[]>(
        `/notifications/user/${userId}/unread`,
      );
      if (response.success) {
        setUnreadCount(response.data.length);
      }
    } catch (error) {
      console.error("Failed to fetch unread notifications", error);
    }
  };

  const markNotificationAsRead = async (notificationId: string) => {
    try {
      await apiClient.put(`/notifications/${notificationId}/read`, {});
      await fetchNotifications();
    } catch (error) {
      console.error("Failed to mark notification as read", error);
    }
  };

  useEffect(() => {
    if (!userId) return;

    fetchNotifications();
    fetchUnreadNotifications();

    const ws = new WebSocket(`ws://localhost:8080/ws-notifications/${userId}`);

    ws.onopen = () => {
      console.log("WebSocket connection established");
    };

    ws.onmessage = (event) => {
      const newNotification: Notification = JSON.parse(event.data);
      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);
    };

    ws.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      ws.close();
    };
  }, [userId]);

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        unreadCount,
        fetchNotifications,
        markNotificationAsRead,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      "useNotifications must be used within a NotificationProvider",
    );
  }
  return context;
};
