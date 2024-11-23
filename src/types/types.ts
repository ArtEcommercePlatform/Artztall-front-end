import { ComponentType } from "react";

export interface LayoutProps {
  children: React.ReactNode;
}

export interface UserData {
  userName: string;
  userAvatar: string;
}

export interface NavigationItem {
  icon: ComponentType<{ size?: number; className?: string }>;
  label: string;
  href: string;
}

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: ComponentType<{ size?: number; className?: string }>;
  bgColor: string;
  textColor: string;
}
