import React, { useState, useEffect } from 'react';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/layout/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';
import { useMVPWorkflow } from '@/hooks/useMVPWorkflow';
import { useAuth } from '../context/AuthContext';
import {
  Code,
  Globe,
  Box,
  Clock,
  CheckCircle,
  Eye,
  Download,
  MessageCircle,
  CreditCard,
  User,
  Settings,
  Calendar,
  DollarSign,
  TrendingUp,
  FileText
} from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceRequest {
  id: string;
  type: string;
  title: string;
  description: string;
  status: string;
  progress: number;
  createdAt: string;
  estimatedCompletion: string;
  price: number;
  icon: any;
  statusColor: string;
  priority: string;
  assignedTo: string;
  nextMilestone?: string;
  completedAt?: string;
  liveUrl?: string;
  paid:boolean;
  milestones: {
    name: string;
    completed: boolean;
    current?: boolean;
    date?: string;
    dueDate?: string;
  }[];
  files: {
    name: string;
    size: string;
    uploadDate: string;
  }[];
  recentActivity: {
    action: string;
    date: string;
    type: string;
  }[];
}

const Dashboard = () => {
    const { currentUser } = useAuth();
    console.log("uid:" +currentUser.uid);
  // Mock user data - this would come from authentication context
  const user = {
    name: "Anil",
    email: "anil@zovoa.com",
    avatar: "/placeholder.svg"
  };

  const [serviceRequests, setServiceRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const { dispatch } = useMVPWorkflow();

  const handleViewDetails = (project: ServiceRequest) => {
  // Remove or replace non-cloneable fields
  const { icon, statusColor, ...cloneableProject } = project;

  dispatch({ type: 'SET_PROJECT_DATA', payload: project });

  navigate('/mvp-workflow', {
    state: {
      startStep: 'preview',
      projectData: cloneableProject  // ✅ only plain serializable data
    }
  });
};

const BASE_URL = 'https://zovoaapi.lytortech.com/api';


  // Fetch data from backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log("post endpoint is triggering");
        const response = await fetch(`${BASE_URL}/mvp/get/forms/${currentUser.uid}` , {
          method: 'GET',
          headers: {
            'ngrok-skip-browser-warning': 'any-value'
          }
        });

        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }

        const data = await response.json();
        let transformedData: ServiceRequest[] = [];

        if (Array.isArray(data)) {
          transformedData = data.map((project: any) => ({
            id: project.id,
            type: project.type,
            title: project.title,
            description: project.description,
            status: project.status,
            progress: project.progress,
            createdAt: project.createdAt,
            estimatedCompletion: project.estimatedCompletion,
            price: project.price,
            icon: getIconComponent(project.type),
            statusColor: getStatusColor(project.status),
            priority: project.priority,
            assignedTo: project.assignedTo,
            nextMilestone: project.nextMilestone,
            completedAt: project.completedAt,
            liveUrl: project.liveUrl,
            milestones: project.milestones || [],
            files: project.files || [],
            recentActivity: project.recentActivity || [],
            paid: project.paid,
            demoUrl : project.demoUrl,
            liveurl:project.liveurl
          }));
        }
        console.log("data fetched " + JSON.stringify(transformedData, null, 2));


        setServiceRequests(transformedData);
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unknown error occurred');
        setLoading(false);
        console.error("Error fetching service requests:", err);
      }
    };

    fetchData();
  }, []);

  // Helper function to get icon based on project type
  const getIconComponent = (type: string) => {
    switch (type.toLowerCase()) {
      case 'mvp':
        return Code;
      case 'website':
        return Globe;
      case '3d':
        return Box;
      default:
        return FileText;
    }
  };

  // Helper function to get status color
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500';
      case 'in development':
        return 'bg-blue-500';
      case 'under review':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  // Calculate stats based on serviceRequests
  const stats = {
    totalProjects: serviceRequests.length,
    activeProjects: serviceRequests.filter(req => req.status === "In Development" || req.status === "Under Review").length,
    completedProjects: serviceRequests.filter(req => req.status === "Completed").length,
    totalSpent: serviceRequests.reduce((sum, req) => sum + req.price, 0),
    avgProgress: serviceRequests.length > 0
      ? Math.round(serviceRequests.reduce((sum, req) => sum + req.progress, 0) / serviceRequests.length)
      : 0
  };

  // Filter projects by type
  const mvpProjects = serviceRequests.filter(req => req.type.toLowerCase().includes('mvp'));
  const websiteProjects = serviceRequests.filter(req => req.type.toLowerCase().includes('website'));
  const threeDProjects = serviceRequests.filter(req => req.type.toLowerCase().includes('3d'));
  const activeProjects = serviceRequests.filter(req => req.status === "In Development" || req.status === "Under Review");
  const completedProjects = serviceRequests.filter(req => req.status === "Completed");

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main className="pt-20 pb-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />

      <main className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Project Dashboard</h1>
                <p className="text-gray-600 mt-2">Welcome back, {user.name}! Here's your project overview.</p>
              </div>
              <div className="flex items-center space-x-4">
                <Button variant="outline">
                  <Settings className="h-4 w-4 mr-2" />
                  Settings
                </Button>
                <Link to="/services">
                  <Button>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Request New Service
                  </Button>
                </Link>
              </div>
            </div>
          </div>

          {/* Enhanced Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <Code className="h-6 w-6 text-blue-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Projects</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.totalProjects}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Clock className="h-6 w-6 text-yellow-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Active Projects</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.activeProjects}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Completed</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.completedProjects}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="h-6 w-6 text-purple-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Total Invested</p>
                    <p className="text-2xl font-bold text-gray-900">${stats.totalSpent.toLocaleString()}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center">
                  <div className="p-2 bg-indigo-100 rounded-lg">
                    <TrendingUp className="h-6 w-6 text-indigo-600" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                    <p className="text-2xl font-bold text-gray-900">{stats.avgProgress}%</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Service Requests */}
          <Card>
            <CardHeader>
              <CardTitle>Your Projects</CardTitle>
              <CardDescription>Track the progress and status of all your service requests</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="mvp" className="w-full">
                <TabsList className="mb-6">
                  <TabsTrigger value="mvp">MVP Projects ({mvpProjects.length})</TabsTrigger>
                  <TabsTrigger value="websites">Websites ({websiteProjects.length})</TabsTrigger>
                  <TabsTrigger value="3d-websites">3D Websites ({threeDProjects.length})</TabsTrigger>
                  <TabsTrigger value="active">Active ({activeProjects.length})</TabsTrigger>
                  <TabsTrigger value="completed">Completed ({completedProjects.length})</TabsTrigger>
                </TabsList>

                <TabsContent value="mvp" className="space-y-6">
                  {mvpProjects.length > 0 ? (
                    mvpProjects.map((request) => (
                      <ProjectCard key={request.id} request={request} onViewDetails={handleViewDetails} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Code className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No MVP Projects</h3>
                      <p className="text-gray-500 mt-2">You don't have any MVP projects yet.</p>
                      <Button className="mt-4" asChild>
                        <Link to="/services">Request MVP Development</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="websites" className="space-y-6">
                  {websiteProjects.length > 0 ? (
                    websiteProjects.map((request) => (
                      <ProjectCard key={request.id} request={request} onViewDetails={handleViewDetails} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Globe className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No Website Projects</h3>
                      <p className="text-gray-500 mt-2">You don't have any website projects yet.</p>
                      <Button className="mt-4" asChild>
                        <Link to="/services">Request Website Development</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="3d-websites" className="space-y-6">
                  {threeDProjects.length > 0 ? (
                    threeDProjects.map((request) => (
                      <ProjectCard key={request.id} request={request} onViewDetails={handleViewDetails} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Box className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No 3D Projects</h3>
                      <p className="text-gray-500 mt-2">You don't have any 3D projects yet.</p>
                      <Button className="mt-4" asChild>
                        <Link to="/services">Request 3D Experience</Link>
                      </Button>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="active" className="space-y-6">
                  {activeProjects.length > 0 ? (
                    activeProjects.map((request) => (
                      <ProjectCard key={request.id} request={request} onViewDetails={handleViewDetails} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <Clock className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No Active Projects</h3>
                      <p className="text-gray-500 mt-2">You don't have any active projects at the moment.</p>
                    </div>
                  )}
                </TabsContent>

                <TabsContent value="completed" className="space-y-6">
                  {completedProjects.length > 0 ? (
                    completedProjects.map((request) => (
                      <ProjectCard key={request.id} request={request} onViewDetails={handleViewDetails} />
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <CheckCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900">No Completed Projects</h3>
                      <p className="text-gray-500 mt-2">Your completed projects will appear here.</p>
                    </div>
                  )}
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

// ProjectCard component for better code organization
const ProjectCard = ({
  request,
  onViewDetails
}: {
  request: ServiceRequest,
  onViewDetails: (project: ServiceRequest) => void
}) => {
  return (
    <Card key={request.id} className="border-l-4 hover:shadow-lg transition-shadow" style={{ borderLeftColor: request.statusColor.replace('bg-', '#') }}>
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-6">
          <div className="flex items-start space-x-4">
            <div className={`p-3 rounded-lg ${request.statusColor.replace('500', '100')}`}>
              <request.icon className={`h-6 w-6 ${request.statusColor.replace('bg-', 'text-').replace('500', '600')}`} />
            </div>
            <div>
              <div className="flex items-center space-x-3 mb-2">
                <h3 className="text-xl font-semibold text-gray-900">{request.title}</h3>
                <Badge className={getStatusBadge(request.status)}>
                  {request.status}
                </Badge>
                <Badge className={getPriorityBadge(request.priority)}>
                  {request.priority}
                </Badge>
              </div>
              <p className="text-gray-600 mb-3">{request.description}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-500">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1" />
                  Created: {new Date(request.createdAt).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  Due: {new Date(request.estimatedCompletion).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-1" />
                  Team: {request.assignedTo}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <p className="text-2xl font-bold text-gray-900">${request.price.toLocaleString()}</p>
            <p className="text-sm text-gray-500">ID: {request.id}</p>
          </div>
        </div>

        {/* Enhanced Progress Section */}
        <div className="mb-6">
          <div className="flex justify-between items-center mb-3">
            <div>
              <h4 className="font-medium text-gray-900">Project Progress</h4>
              {request.nextMilestone && (
                <p className="text-sm text-gray-600">Next: {request.nextMilestone}</p>
              )}
            </div>
            <span className="text-lg font-semibold text-gray-900">{request.progress}%</span>
          </div>
          <Progress value={request.progress} className="h-3" />
        </div>

        {/* Enhanced Milestones */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-4">Milestones & Timeline</h4>
          <div className="space-y-3">
            {request.milestones.map((milestone, index) => (
              <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-gray-50">
                <div className="flex items-center space-x-3">
                  {milestone.completed ? (
                    <CheckCircle className="h-5 w-5 text-green-500" />
                  ) : milestone.current ? (
                    <Clock className="h-5 w-5 text-blue-500" />
                  ) : (
                    <div className="h-5 w-5 rounded-full border-2 border-gray-300"></div>
                  )}
                  <span className={`font-medium ${milestone.completed ? "text-gray-900" : milestone.current ? "text-blue-700" : "text-gray-500"}`}>
                    {milestone.name}
                  </span>
                </div>
                <div className="text-sm text-gray-500">
                  {milestone.date && (
                    <span className="text-green-600">Completed: {milestone.date}</span>
                  )}
                  {milestone.dueDate && !milestone.completed && (
                    <span>Due: {milestone.dueDate}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Files Section */}
        {request.files.length > 0 && (
          <div className="mb-6">
            <h4 className="font-medium text-gray-900 mb-3">Project Files</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {request.files.map((file, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText className="h-5 w-5 text-gray-500" />
                    <div>
                      <span className="text-sm font-medium">{file.name}</span>
                      <div className="text-xs text-gray-500">
                        {file.size} • {file.uploadDate}
                      </div>
                    </div>
                  </div>
                  <Button size="sm" variant="ghost">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Activity */}
        <div className="mb-6">
          <h4 className="font-medium text-gray-900 mb-3">Recent Activity</h4>
          <div className="space-y-2">
            {request.recentActivity.slice(0, 3).map((activity, index) => (
              <div key={index} className="flex items-start space-x-3 p-2 rounded">
                <div className={`w-2 h-2 rounded-full mt-2 ${activity.type === 'completion' ? 'bg-green-500' :
                  activity.type === 'milestone' ? 'bg-blue-500' :
                    activity.type === 'file' ? 'bg-purple-500' : 'bg-gray-500'
                  }`}></div>
                <div className="flex-1">
                  <p className="text-sm text-gray-900">{activity.action}</p>
                  <p className="text-xs text-gray-500">{activity.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex space-x-2">
            <Button variant="outline" size="sm">
              <MessageCircle className="h-4 w-4 mr-2" />
              Contact Team
            </Button>
            {request.liveUrl && (
              <Button variant="outline" size="sm" asChild>
                <a href={request.liveUrl} target="_blank" rel="noopener noreferrer">
                  <Eye className="h-4 w-4 mr-2" />
                  View Live Site
                </a>
              </Button>
            )}
          </div>
          <Button size="sm" onClick={() => onViewDetails(request)}>
            View Full Details
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

// Helper functions moved outside
const getStatusBadge = (status: string) => {
  const variants: { [key: string]: string } = {
    "Completed": "bg-green-100 text-green-800 border-green-200",
    "In Development": "bg-blue-100 text-blue-800 border-blue-200",
    "Under Review": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "On Hold": "bg-red-100 text-red-800 border-red-200"
  };
  return variants[status] || "bg-gray-100 text-gray-800 border-gray-200";
};

const getPriorityBadge = (priority: string) => {
  const variants: { [key: string]: string } = {
    "High": "bg-red-100 text-red-800 border-red-200",
    "Medium": "bg-yellow-100 text-yellow-800 border-yellow-200",
    "Low": "bg-green-100 text-green-800 border-green-200"
  };
  return variants[priority] || "bg-gray-100 text-gray-800 border-gray-200";
};

export default Dashboard;