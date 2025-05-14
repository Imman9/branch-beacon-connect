
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Mic, Bell } from "lucide-react";

const Dashboard = () => {
  return (
    <div className="animate-fadeIn">
      <h1 className="text-3xl font-bold mb-6 text-church-800">Dashboard</h1>
      <p className="text-church-600 mb-8">Welcome to your dashboard. This is where you'll see your personalized content and updates.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
        <Card className="border border-church-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2 bg-gradient-to-r from-church-100 to-church-50 rounded-t-lg">
            <CardTitle className="text-lg font-medium flex items-center text-church-800">
              <Bell className="mr-2 h-5 w-5 text-church-600" />
              Quick Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-church-600">View your recent activity and notifications.</p>
          </CardContent>
        </Card>
        
        <Card className="border border-church-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2 bg-gradient-to-r from-church-100 to-church-50 rounded-t-lg">
            <CardTitle className="text-lg font-medium flex items-center text-church-800">
              <Calendar className="mr-2 h-5 w-5 text-church-600" />
              Upcoming Events
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-church-600">See what's happening soon in your branch.</p>
          </CardContent>
        </Card>
        
        <Card className="border border-church-200 shadow-md hover:shadow-lg transition-shadow">
          <CardHeader className="pb-2 bg-gradient-to-r from-church-100 to-church-50 rounded-t-lg">
            <CardTitle className="text-lg font-medium flex items-center text-church-800">
              <Mic className="mr-2 h-5 w-5 text-church-600" />
              Recent Sermons
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-4">
            <p className="text-church-600">Catch up on sermons you might have missed.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
