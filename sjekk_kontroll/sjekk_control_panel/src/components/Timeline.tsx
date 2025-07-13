import React from 'react';
import { motion } from 'framer-motion';

interface TimelineEvent {
  date: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

interface TimelineProps {
  events: TimelineEvent[];
}

const TimelineItem = ({ date, title, description, icon }: TimelineEvent) => {
  return (
    <motion.div
      className="flex items-center relative mb-8 last:mb-0"
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="absolute left-0 w-0.5 h-full bg-gradient-to-b from-blue-500 to-purple-500"></div>
      <motion.div
        className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-500 text-white z-10 shadow"
      >
        {icon}
      </motion.div>
      <div className="ml-8 bg-white p-4 rounded-lg shadow-md">
        <span className="text-sm font-semibold text-purple-600">{date}</span>
        <h3 className="text-lg font-bold mt-1 mb-2">{title}</h3>
        <p className="text-gray-600">{description}</p>
      </div>
    </motion.div>
  );
};

export default function Timeline({ events }: TimelineProps) {
  return (
    <div className="relative pl-6 py-8 max-w-3xl mx-auto">
      {events.map((event, index) => (
        <TimelineItem key={index} {...event} />
      ))}
    </div>
  );
}