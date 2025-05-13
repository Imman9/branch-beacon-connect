
import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <p>Welcome to your dashboard. This is where you'll see your personalized content and updates.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        {/* Dashboard cards and widgets will go here */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-2">Quick Overview</h3>
          <p className="text-gray-600">View your recent activity and notifications.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-2">Upcoming Events</h3>
          <p className="text-gray-600">See what's happening soon in your branch.</p>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium mb-2">Recent Sermons</h3>
          <p className="text-gray-600">Catch up on sermons you might have missed.</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
