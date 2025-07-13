import React, { useState } from 'react';
import { FiChevronDown, FiChevronRight, FiGitBranch, FiGitCommit, FiGitMerge, FiGitPullRequest, FiSearch } from 'react-icons/fi';

const sampleVersions = [
  { id: 1, version: 'v1.2.3', date: '2023-06-15 14:30:00', author: 'John Doe', commit: 'a1b2c3d', branch: 'main', changes: 'Fixed critical bug in login flow', status: 'deployed' },
  { id: 2, version: 'v1.2.2', date: '2023-06-10 11:45:00', author: 'Jane Smith', commit: 'e4f5g6h', branch: 'feature/new-dashboard', changes: 'Improved performance of dashboard queries', status: 'testing' },
  { id: 3, version: 'v1.2.1', date: '2023-06-05 09:15:00', author: 'Bob Johnson', commit: 'i7j8k9l', branch: 'hotfix/api-timeout', changes: 'Added new analytics features', status: 'development' },
  { id: 4, version: 'v1.2.0', date: '2023-05-28 16:20:00', author: 'Alice Brown', commit: 'm1n2o3p', branch: 'main', changes: 'Major update with new UI design', status: 'deployed' },
  { id: 5, version: 'v1.1.5', date: '2023-05-20 13:10:00', author: 'Charlie Davis', commit: 'q4r5s6t', branch: 'feature/user-profiles', changes: 'Implemented user profile management', status: 'review' },
];

const diffExample = `
@@ -1,7 +1,7 @@
-import React from 'react';
+import React, { useState } from 'react';
 
 function App() {
-  const message = 'Hello, World!';
+  const [message, setMessage] = useState('Hello, World!');
   
   return (
     <div>
@@ -10,6 +10,11 @@
       <p>{message}</p>
     </div>
   );
+
+  function handleClick() {
+    setMessage('Hello, React!');
+  }
 }
 
 export default App;
`;

export default function VersionControl() {
  const [selectedVersion, setSelectedVersion] = useState(null);
  const [expandedRows, setExpandedRows] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [filterBranch, setFilterBranch] = useState('');
  const [filterStatus, setFilterStatus] = useState('');

  const toggleRowExpansion = (id) => {
    setExpandedRows((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const filteredVersions = sampleVersions.filter((version) => {
    const matchesSearch = Object.values(version).some(
      (value) => value.toString().toLowerCase().includes(searchTerm.toLowerCase())
    );
    const matchesBranch = filterBranch ? version.branch === filterBranch : true;
    const matchesStatus = filterStatus ? version.status === filterStatus : true;
    return matchesSearch && matchesBranch && matchesStatus;
  });

  const branches = [...new Set(sampleVersions.map((v) => v.branch))];
  const statuses = [...new Set(sampleVersions.map((v) => v.status))];

  return (
    <div className="min-h-screen bg-gray-100">

      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <div className="flex flex-wrap items-center justify-between mb-4">
          <div className="flex items-center space-x-4 mb-4 sm:mb-0">
            <div className="relative">
              <input
                type="text"
                placeholder="Search versions..."
                className="pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            </div>
            <select
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={filterBranch}
              onChange={(e) => setFilterBranch(e.target.value)}
            >
              <option value="">All Branches</option>
              {branches.map((branch) => (
                <option key={branch} value={branch}>{branch}</option>
              ))}
            </select>
            <select
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-teal-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
            >
              <option value="">All Statuses</option>
              {statuses.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
          </div>
          <div className="flex space-x-4">
            <button className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors flex items-center">
              <FiGitBranch className="mr-2" />
              New Branch
            </button>
            <button className="px-6 py-2 bg-teal-500 text-white rounded-md hover:bg-teal-600 transition-colors flex items-center">
              <FiGitPullRequest className="mr-2" />
              Create PR
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Version</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Author</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commit</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Branch</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredVersions.map((version) => (
                <React.Fragment key={version.id}>
                  <tr className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap font-medium text-teal-600 cursor-pointer" onClick={() => toggleRowExpansion(version.id)}>
                      {expandedRows[version.id] ? <FiChevronDown className="inline mr-2" /> : <FiChevronRight className="inline mr-2" />}
                      {version.version}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">{version.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap">{version.author}</td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono">{version.commit}</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-teal-100 text-teal-800">
                        {version.branch}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        version.status === 'deployed' ? 'bg-green-100 text-green-800' :
                        version.status === 'testing' ? 'bg-yellow-100 text-yellow-800' :
                        version.status === 'development' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {version.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <button className="text-teal-600 hover:text-teal-900 mr-4" onClick={() => setSelectedVersion(version)}>View Diff</button>
                      <button className="text-teal-600 hover:text-teal-900">Rollback</button>
                    </td>
                  </tr>
                  {expandedRows[version.id] && (
                    <tr>
                      <td colSpan={7} className="px-6 py-4 bg-gray-50">
                        <div className="text-sm text-gray-900">
                          <strong>Changes:</strong> {version.changes}
                        </div>
                        <div className="mt-2 flex space-x-4">
                          <button className="text-sm text-teal-600 hover:text-teal-900 flex items-center">
                            <FiGitCommit className="mr-1" /> View Commit
                          </button>
                          <button className="text-sm text-teal-600 hover:text-teal-900 flex items-center">
                            <FiGitMerge className="mr-1" /> Merge to main
                          </button>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedVersion && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[80vh] overflow-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold mb-4">Diff for {selectedVersion.version}</h2>
              <p className="mb-2"><strong>Commit:</strong> {selectedVersion.commit}</p>
              <p className="mb-4"><strong>Author:</strong> {selectedVersion.author}</p>
              <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                <code>{diffExample}</code>
              </pre>
            </div>
            <div className="bg-gray-100 px-6 py-4 flex justify-end">
              <button
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400 transition-colors"
                onClick={() => setSelectedVersion(null)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}