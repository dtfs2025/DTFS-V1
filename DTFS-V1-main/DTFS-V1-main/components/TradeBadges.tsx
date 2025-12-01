import React from 'react';

const BADGE_COLORS: Record<string, string> = {
    green: "bg-success/10 text-success",
    blue: "bg-primary-100 text-primary-800",
    purple: "bg-secondary-100 text-secondary-800",
    indigo: "bg-indigo-100 text-indigo-800",
    orange: "bg-warning/10 text-warning",
    teal: "bg-teal-100 text-teal-800",
};

export const Badge: React.FC<{
  label: string;
  color: 'green' | 'blue' | 'purple' | 'indigo' | 'orange' | 'teal';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
}> = ({ label, color, size = 'md', icon }) => {
  const sizeClasses = {
    sm: 'px-2 py-0.5 text-xs',
    md: 'px-2.5 py-1 text-sm',
    lg: 'px-3 py-1.5 text-base',
  };
  return (
    <span className={`inline-flex items-center font-medium rounded-md ${sizeClasses[size]} ${BADGE_COLORS[color]}`}>
      {icon && <span className="mr-1.5">{icon}</span>}
      {label}
    </span>
  );
};