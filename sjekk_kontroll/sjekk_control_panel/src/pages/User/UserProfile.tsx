import React from 'react';

const employeeData = {
  id: 1,
  name: "John Doe",
  phone_number: "+1 (555) 123-4567",
  email: "john.doe@parksync.com",
  role: "Parking Enforcement Officer",
  created_at: "2023-01-15T09:00:00Z",
  updated_at: "2023-07-20T14:30:00Z",
  current_session: {
    id: "sess_123456",
    start_time: "2023-07-20T08:00:00Z",
    end_time: null,
    place_logins: [
      {
        id: 1,
        place: {
          id: 1,
          location: "Downtown Central",
          policy: "2-hour parking limit",
          code: "DTC-001",
          place_type: "street_parking"
        },
        login_time: "2023-07-20T08:15:00Z",
        logout_time: "2023-07-20T12:00:00Z"
      },
      {
        id: 2,
        place: {
          id: 2,
          location: "City Park",
          policy: "No overnight parking",
          code: "CP-002",
          place_type: "park"
        },
        login_time: "2023-07-20T13:00:00Z",
        logout_time: null
      }
    ]
  },
  recent_sessions: [
    {
      id: "sess_123455",
      start_time: "2023-07-19T08:00:00Z",
      end_time: "2023-07-19T16:00:00Z",
      place_logins: [
        {
          id: 3,
          place: {
            id: 3,
            location: "Shopping Mall",
            policy: "3-hour free parking",
            code: "SM-003",
            place_type: "parking_lot"
          },
          login_time: "2023-07-19T08:15:00Z",
          logout_time: "2023-07-19T15:45:00Z"
        }
      ]
    }
  ],
  recent_violations: [
    {
      id: 1001,
      created_at: "2023-07-20T10:30:00Z",
      place: {
        id: 1,
        location: "Downtown Central",
        policy: "2-hour parking limit",
        code: "DTC-001",
        place_type: "street_parking"
      },
      plate_number: "ABC123",
      ticket_comment: "Vehicle parked in no-parking zone"
    },
    {
      id: 1000,
      created_at: "2023-07-19T14:45:00Z",
      place: {
        id: 2,
        location: "City Park",
        policy: "No overnight parking",
        code: "CP-002",
        place_type: "park"
      },
      plate_number: "XYZ789",
      ticket_comment: "Expired parking meter"
    }
  ],
  stats: {
    total_violations: 150,
    violations_this_month: 45,
    average_violations_per_day: 7.5,
    most_active_place: {
      id: 1,
      location: "Downtown Central",
      policy: "2-hour parking limit",
      code: "DTC-001",
      place_type: "street_parking"
    },
    total_hours_worked: 960
  }
};

const EmployeeProfileComponent: React.FC = () => {
  const employee = employeeData;

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const renderPlaceLogins = (placeLogins) => {
    return placeLogins.map((login) => (
      <div key={login.id} className="bg-white rounded-lg shadow p-4 mb-4">
        <h4 className="text-lg font-semibold mb-2">{login.place.location}</h4>
        <p className="text-sm text-gray-600">Login: {formatDate(login.login_time)}</p>
        <p className="text-sm text-gray-600">Logout: {login.logout_time ? formatDate(login.logout_time) : 'Active'}</p>
        <p className="text-sm text-gray-600">Policy: {login.place.policy}</p>
      </div>
    ));
  };

  const renderSessions = (sessions) => {
    return sessions.map((session) => (
      <div key={session.id} className="bg-white rounded-lg shadow p-4 mb-4">
        <h3 className="text-xl font-semibold mb-2">Session ID: {session.id}</h3>
        <p className="text-sm text-gray-600">Start: {formatDate(session.start_time)}</p>
        <p className="text-sm text-gray-600">End: {session.end_time ? formatDate(session.end_time) : 'Ongoing'}</p>
        <h4 className="text-lg font-semibold mt-4 mb-2">Place Logins:</h4>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {renderPlaceLogins(session.place_logins)}
        </div>
      </div>
    ));
  };

  const renderViolations = (violations) => {
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">ID</th>
              <th className="py-3 px-6 text-left">Date</th>
              <th className="py-3 px-6 text-left">Location</th>
              <th className="py-3 px-6 text-left">Plate Number</th>
              <th className="py-3 px-6 text-left">Comment</th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {violations.map((violation) => (
              <tr key={violation.id} className="border-b border-gray-200 hover:bg-gray-100">
                <td className="py-3 px-6 text-left whitespace-nowrap">{violation.id}</td>
                <td className="py-3 px-6 text-left">{formatDate(violation.created_at)}</td>
                <td className="py-3 px-6 text-left">{violation.place.location}</td>
                <td className="py-3 px-6 text-left">{violation.plate_number}</td>
                <td className="py-3 px-6 text-left">{violation.ticket_comment}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white shadow rounded-lg overflow-hidden mb-8">
        <div className="md:flex">
          <div className="md:flex-shrink-0">
            <img className="h-48 w-full object-contain md:w-48" src="/assets/s_logo.png" alt={employee.name} />
          </div>
          <div className="p-8">
            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{employee.role}</div>
            <h1 className="mt-1 text-4xl font-semibold text-gray-900">{employee.name}</h1>
            <p className="mt-2 text-gray-600">{employee.phone_number}</p>
            <p className="mt-2 text-gray-600">{employee.email}</p>
            <p className="mt-2 text-gray-600">Joined: {formatDate(employee.created_at)}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h2 className="text-2xl font-bold mb-4">Current Session</h2>
          {employee.current_session ? (
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-lg mb-2">Session ID: {employee.current_session.id}</p>
              <p className="text-gray-600 mb-4">Started: {formatDate(employee.current_session.start_time)}</p>
              <h3 className="text-xl font-semibold mb-2">Place Logins:</h3>
              {renderPlaceLogins(employee.current_session.place_logins)}
            </div>
          ) : (
            <p className="text-gray-600">No active session</p>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Performance Statistics</h2>
          <div className="bg-white rounded-lg shadow p-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-lg font-semibold">Total Violations</h4>
                <p className="text-3xl font-bold text-indigo-600">{employee.stats.total_violations}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Violations This Month</h4>
                <p className="text-3xl font-bold text-indigo-600">{employee.stats.violations_this_month}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Avg. Violations Per Day</h4>
                <p className="text-3xl font-bold text-indigo-600">{employee.stats.average_violations_per_day}</p>
              </div>
              <div>
                <h4 className="text-lg font-semibold">Total Hours Worked</h4>
                <p className="text-3xl font-bold text-indigo-600">{employee.stats.total_hours_worked}</p>
              </div>
            </div>
            <div className="mt-6">
              <h4 className="text-lg font-semibold">Most Active Place</h4>
              <p className="text-xl text-indigo-600">{employee.stats.most_active_place.location}</p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Sessions</h2>
        {renderSessions(employee.recent_sessions)}
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold mb-4">Recent Violations</h2>
        {renderViolations(employee.recent_violations)}
      </div>
    </div>
  );
};

export default EmployeeProfileComponent;

