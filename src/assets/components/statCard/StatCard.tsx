// StatCard.tsx
import React from "react";
import { StatCardProps } from "../../../types/types";

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  bgColor,
  textColor,
}) => (
  <div className={`rounded-lg p-6 ${bgColor}`}>
    <div className="flex items-center justify-between">
      <div>
        <p className={`text-sm font-medium ${textColor}`}>{title}</p>
        <p className={`text-2xl font-bold mt-2 ${textColor}`}>{value}</p>
      </div>
      <Icon size={24} className={textColor} />
    </div>
  </div>
);
