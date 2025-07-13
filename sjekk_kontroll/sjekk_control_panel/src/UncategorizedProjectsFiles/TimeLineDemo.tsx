
// interface TimelineItem {
//   time: string;
//   title: string;
//   description: string;
//   status: 'completed' | 'in-progress' | 'pending' | 'error';
// }

// interface HorizontalTimelineProps {
//   items: TimelineItem[];
// }

// const statusIcons = {
//   completed: (
//     <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
//     </svg>
//   ),
//   'in-progress': (
//     <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//     </svg>
//   ),
//   pending: (
//     <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
//     </svg>
//   ),
//   error: (
//     <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"></path>
//     </svg>
//   ),
// };

// function HorizontalTimeline({ items }: HorizontalTimelineProps) {
//   return (
//     <div className="max-w-4xl mx-auto p-4">
//       <h2 className="text-2xl font-bold mb-8">Horizontal timeline</h2>
//       <div className="flex justify-between items-center w-full">
//         {items.map((item, index) => (
//           <div key={index} className="relative flex flex-col items-center">
//             <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
//               item.status === 'completed' ? 'bg-green-100' :
//               item.status === 'in-progress' ? 'bg-blue-100' :
//               item.status === 'pending' ? 'bg-gray-100' : 'bg-red-100'
//             }`}>
//               {statusIcons[item.status]}
//             </div>
//             <div className="mt-3 text-center">
//               <h3 className="text-lg font-semibold">{item.time}</h3>
//               <p className="text-sm font-medium">{item.title}</p>
//               <p className="text-xs text-gray-500 mt-1">{item.description}</p>
//             </div>
//             {index < items.length - 1 && (
//               <div className="absolute top-6 w-full h-0.5 bg-gray-200" style={{ left: '50%' }}></div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
// interface TimelineItem {
//   title: string;
//   subtitle?: string;
//   date: string;
//   status: 'completed' | 'in-progress' | 'pending' | 'error' | 'custom';
//   customColor?: string;
// }

// interface VerticalTimeline2Props {
//   items: TimelineItem[];
// }

// const statusColors = {
//   completed: 'bg-green-500',
//   'in-progress': 'bg-blue-500',
//   pending: 'bg-gray-500',
//   error: 'bg-red-500',
// };

// function VerticalTimeline2({ items }: VerticalTimeline2Props) {
//   return (
//     <div className="max-w-md mx-auto p-4">
//       <ol className="relative border-l border-gray-200 dark:border-gray-700">
//         {items.map((item, index) => (
//           <li key={index} className="mb-10 ml-6">
//             <span className={`absolute flex items-center justify-center w-6 h-6 rounded-full -left-3 dark:ring-gray-900 ${
//               item.status === 'custom' ? item.customColor : statusColors[item.status]
//             }`}>
//               {item.status === 'completed' && (
//                 <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
//                   <path d="M14.293 5.293a1 1 0 011.414 1.414l-6 6a1 1 0 01-1.414 0l-3-3a1 1 0 011.414-1.414L9 10.586l5.293-5.293z"></path>
//                 </svg>
//               )}
//             </span>
//             <h3 className="flex items-center mb-1 text-lg font-semibold text-gray-900 dark:text-white">
//               {item.title}
//             </h3>
//             {item.subtitle && (
//               <p className="mb-2 text-base font-normal text-gray-500 dark:text-gray-400">{item.subtitle}</p>
//             )}
//             <time className="block mb-2 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
//               {item.date}
//             </time>
//           </li>
//         ))}
//       </ol>
//     </div>
//   );
// }
// interface TimelineItem {
//   year: string;
//   title: string;
//   description: string;
// }

// interface VerticalTimeline1Props {
//   items: TimelineItem[];
// }

// function VerticalTimeline1({ items }: VerticalTimeline1Props) {
//   return (
//     <div className="max-w-2xl mx-auto p-4">
//       <h2 className="text-2xl font-bold text-center mb-8">Our greatest milestones</h2>
//       <div className="relative">
//         {items.map((item, index) => (
//           <div key={index} className="mb-8 flex justify-between items-center w-full">
//             <div className="order-1 w-5/12"></div>
//             <div className="z-20 flex items-center order-1 bg-gray-800 shadow w-8 h-8 rounded-full">
//               <h1 className="mx-auto font-semibold text-lg text-white">{index + 1}</h1>
//             </div>
//             <div className="order-1 bg-gray-100 rounded shadow w-5/12 px-6 py-4">
//               <h3 className="mb-3 font-bold text-gray-800 text-xl">{item.year}</h3>
//               <h4 className="mb-3 font-bold text-blue-600 text-lg">{item.title}</h4>
//               <p className="text-sm leading-snug tracking-wide text-gray-600">{item.description}</p>
//             </div>
//           </div>
//         ))}
//         <div className="absolute h-full w-1 bg-gray-200 left-1/2 transform -translate-x-1/2" style={{ top: '2rem' }}></div>
//       </div>
//     </div>
//   );
// }

// export default function TimelineDemo2() {
//   const verticalTimeline1Items = [
//     {
//       year: "2023",
//       title: "Company Was Established",
//       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare.",
//     },
//     {
//       year: "2024",
//       title: "$2M Raised in Series A",
//       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare.",
//     },
//     {
//       year: "2025",
//       title: "First International Office",
//       description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque scelerisque diam non nisi semper, et elementum lorem ornare.",
//     },
//   ];

//   const verticalTimeline2Items = [
//     {
//       title: "Create a services site",
//       date: "2015-09-01",
//       status: "completed" as const,
//     },
//     {
//       title: "Solve initial network problems",
//       subtitle: "Solve initial network problems 1\nSolve initial network problems 2\nSolve initial network problems 3",
//       date: "2015-09-01",
//       status: "error" as const,
//     },
//     {
//       title: "Technical testing",
//       subtitle: "Technical testing 1\nTechnical testing 2\nTechnical testing 3",
//       date: "2015-09-01",
//       status: "in-progress" as const,
//     },
//     {
//       title: "Custom color testing",
//       date: "2015-09-01",
//       status: "custom" as const,
//       customColor: "bg-purple-500",
//     },
//   ];

//   const horizontalTimelineItems = [
//     {
//       time: "11:59 am",
//       title: "Add KMS",
//       description: "Root CA certificate requested.",
//       status: "completed" as const,
//     },
//     {
//       time: "11:59 am",
//       title: "Add KMS",
//       description: "Root CA certificate requested. Upload it to the KMS to complete the connection.",
//       status: "in-progress" as const,
//     },
//     {
//       time: "11:59 am",
//       title: "Make vCenter trust KMS",
//       description: "Root CA certificate requested. Upload it to the KMS to complete the connection.",
//       status: "pending" as const,
//     },
//     {
//       time: "11:59 am",
//       title: "Make KMS trust vCenter",
//       description: "Upload it to the KMS to complete the connection.",
//       status: "completed" as const,
//     },
//     {
//       time: "11:59 am",
//       title: "Connected",
//       description: "No. It's not connected.",
//       status: "error" as const,
//     },
//   ];

//   return (
//     <div className="space-y-16 py-8">
//       <VerticalTimeline1 items={verticalTimeline1Items} />
//       <VerticalTimeline2 items={verticalTimeline2Items} />
//       <HorizontalTimeline items={horizontalTimelineItems} />
//     </div>
//   );
// }


const TimeLineDemo = () => {
  return (
    <div>TimeLineDemo</div>
  )
}

export default TimeLineDemo