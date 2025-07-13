import React, { useState } from 'react';
import { Paperclip, Reply, Forward, Download, Eye } from 'lucide-react';

interface Attachment {
  id: string;
  name: string;
  size: string;
  thumbnail: string;
}

interface MailDetailsProps {
  date: string;
  subject: string;
  from: string;
  to: string;
  body: string;
  attachments: Attachment[];
}

const MailDetails: React.FC<MailDetailsProps> = ({ date, subject, from, to, body, attachments }) => {
  const [showFullBody, setShowFullBody] = useState(false);

  const truncateBody = (text: string, maxLength: number) => {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 space-y-4">
        <div className="text-sm text-gray-500">{date}</div>
        <h1 className="text-2xl font-bold text-gray-800">{subject}</h1>
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-indigo-500 rounded-full flex items-center justify-center text-white font-bold">
            {from.charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="font-semibold text-gray-800">From: {from}</div>
            <div className="text-sm text-gray-500">To: {to}</div>
          </div>
        </div>
        <div className="prose max-w-none">
          {showFullBody ? body : truncateBody(body, 200)}
          {body.length > 200 && (
            <button
              className="text-indigo-600 hover:text-indigo-800 font-medium mt-2 focus:outline-none"
              onClick={() => setShowFullBody(!showFullBody)}
            >
              {showFullBody ? 'Show Less' : 'Read More'}
            </button>
          )}
        </div>
        {attachments.length > 0 && (
          <div className="border-t pt-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <Paperclip className="w-5 h-5 text-gray-400" />
                <span className="font-medium text-gray-700">
                  Attachments ({attachments.length})
                </span>
                <span className="text-sm text-gray-500">
                  {attachments.reduce((acc, curr) => acc + parseInt(curr.size), 0)}MB
                </span>
              </div>
              <div className="space-x-2">
                <button className="text-indigo-600 hover:text-indigo-800 text-sm font-medium focus:outline-none">
                  View All
                </button>
                <button className="text-green-600 hover:text-green-800 text-sm font-medium focus:outline-none">
                  Download All
                </button>
              </div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {attachments.slice(0, 4).map((attachment) => (
                <div key={attachment.id} className="relative group">
                  <img
                    src={attachment.thumbnail}
                    alt={attachment.name}
                    className="w-full h-24 object-cover rounded-lg"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                    <Download className="w-6 h-6 text-white cursor-pointer" />
                  </div>
                </div>
              ))}
              {attachments.length > 4 && (
                <div className="bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-gray-600 font-medium">+{attachments.length - 4}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
        <div className="space-x-2">
          <button className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors duration-200">
            <Reply className="w-4 h-4 inline-block mr-1" />
            Reply
          </button>
          <button className="bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2 transition-colors duration-200">
            <Forward className="w-4 h-4 inline-block mr-1" />
            Forward
          </button>
        </div>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Eye className="w-4 h-4" />
          <span>Viewed on {new Date().toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
};

export default function MailDetailsDemo() {
  const sampleMail = {
    date: 'Dec 1, 2018',
    subject: 'Old Fashioned Recipe For Preventing Allergies And Chemical',
    from: 'ashraf@glaze.com',
    to: 'malikan@example.com',
    body: `Hello Malikan!

Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, voluptas pariatur repellat veritatis atque, tempora quasi quas facere impedit aliquam libero qui iure cumque incidunt facilis soluta necessitatibus laboriosam nemo. Delectus architecto sed, excepturi natus iste vel quidem officia corrupti repudiandae!

Lorem ipsum dolor, sit amet consectetur adipisicing elit. Inventore, deleniti eaque eligendi minus maxime tempora eiusi.

Have a nice day

Ashraf`,
    attachments: [
      { id: '1', name: 'image1.jpg', size: '20', thumbnail: '/placeholder.svg?height=100&width=100' },
      { id: '2', name: 'image2.jpg', size: '15', thumbnail: '/placeholder.svg?height=100&width=100' },
      { id: '3', name: 'image3.jpg', size: '18', thumbnail: '/placeholder.svg?height=100&width=100' },
      { id: '4', name: 'image4.jpg', size: '22', thumbnail: '/placeholder.svg?height=100&width=100' },
      { id: '5', name: 'image5.jpg', size: '5', thumbnail: '/placeholder.svg?height=100&width=100' },
    ],
  };

  return <MailDetails {...sampleMail} />;
}