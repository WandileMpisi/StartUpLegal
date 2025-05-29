import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, X, Search, FileText, Layout, Settings, HelpCircle, CheckCircle, AlertCircle, Sliders, Filter, ChevronDown, ExternalLink, Download } from 'lucide-react';
import Button from '../components/ui/Button';
import ProgressBar from '../components/ui/ProgressBar';
import Badge from '../components/ui/Badge';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/Card';
import { useAuth } from '../context/AuthContext';
import { getFromStorage } from '../lib/utils';
import { ComplianceItem } from '../types';
import { toast } from 'sonner';

type FilterType = 'All' | 'Required' | 'Recommended' | 'Completed' | 'Pending';

const Dashboard: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('All');
  const [complianceItems, setComplianceItems] = useState<ComplianceItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const onboardingCompleted = getFromStorage<boolean>('onboardingCompleted', false);
    if (!onboardingCompleted) {
      navigate('/onboarding/step1');
      return;
    }

    // Simulate fetching compliance items
    const fetchComplianceItems = async () => {
      setIsLoading(true);
      
      // Simulated API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Sample compliance items (this would normally come from an API based on user's responses)
      const items: ComplianceItem[] = [
        {
          id: '1',
          title: 'Register Information Officer',
          description: 'Appoint and register an Information Officer with the Information Regulator',
          type: 'Required',
          status: 'Pending',
          industry: null,
          officialSiteUrl: 'https://www.justice.gov.za/inforeg/',
          documentUrl: '#',
        },
        {
          id: '2',
          title: 'Create Privacy Policy',
          description: 'Develop a comprehensive privacy policy compliant with POPIA',
          type: 'Required',
          status: 'Pending',
          industry: null,
          documentUrl: '#',
        },
        {
          id: '3',
          title: 'Conduct Data Impact Assessment',
          description: 'Assess how personal information is processed within your organization',
          type: 'Required',
          status: 'Pending',
          industry: null,
          documentUrl: '#',
        },
        {
          id: '4',
          title: 'Implement Data Security Measures',
          description: 'Put technical and organizational measures in place to secure personal information',
          type: 'Required',
          status: 'Pending',
          industry: 'Technology',
          documentUrl: '#',
        },
        {
          id: '5',
          title: 'Create Data Breach Response Plan',
          description: 'Develop procedures for handling data breaches in compliance with POPIA',
          type: 'Recommended',
          status: 'Pending',
          industry: 'Technology',
          documentUrl: '#',
        },
        {
          id: '6',
          title: 'Register for Tax with SARS',
          description: 'Register your business for appropriate tax types with SARS',
          type: 'Required',
          status: 'Completed',
          industry: null,
          officialSiteUrl: 'https://www.sars.gov.za',
        },
      ];
      
      setComplianceItems(items);
      setIsLoading(false);
    };

    fetchComplianceItems();
  }, [isAuthenticated, navigate]);

  const toggleItemStatus = (id: string) => {
    setComplianceItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, status: item.status === 'Completed' ? 'Pending' : 'Completed' } 
          : item
      )
    );
    
    toast.success('Compliance status updated');
  };

  const calculateProgress = () => {
    const totalItems = complianceItems.length;
    if (totalItems === 0) return 0;
    
    const completedItems = complianceItems.filter(item => item.status === 'Completed').length;
    return Math.round((completedItems / totalItems) * 100);
  };

  const filteredItems = complianceItems.filter(item => {
    // First apply text search
    const matchesSearch = searchTerm === '' || 
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Then apply category filter
    if (!matchesSearch) return false;
    
    switch (activeFilter) {
      case 'Required':
        return item.type === 'Required';
      case 'Recommended':
        return item.type === 'Recommended';
      case 'Completed':
        return item.status === 'Completed';
      case 'Pending':
        return item.status === 'Pending';
      default:
        return true;
    }
  });

  const progressPercentage = calculateProgress();

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar - Desktop */}
      <aside className={`bg-white border-r border-gray-200 w-64 fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-auto lg:flex ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="h-full flex flex-col overflow-y-auto">
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <div className="flex items-center">
              <FileText className="h-6 w-6 text-primary" />
              <span className="ml-2 font-semibold text-gray-900">StartUpLegal</span>
            </div>
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <nav className="flex-1 px-2 py-4 space-y-1">
            <a
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md bg-primary/10 text-primary"
            >
              <Layout className="mr-3 h-5 w-5" />
              Dashboard
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
            >
              <FileText className="mr-3 h-5 w-5" />
              Documents
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
            >
              <CheckCircle className="mr-3 h-5 w-5" />
              Compliance Tasks
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
            >
              <Settings className="mr-3 h-5 w-5" />
              Settings
            </a>
            <a
              href="#"
              className="flex items-center px-3 py-2 text-sm font-medium rounded-md text-gray-700 hover:bg-gray-100"
            >
              <HelpCircle className="mr-3 h-5 w-5" />
              Help & Support
            </a>
          </nav>
          
          <div className="p-4 border-t border-gray-200">
            <div className="rounded-md bg-gray-50 p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-gray-500">COMPLIANCE PROGRESS</span>
                <span className="text-xs font-medium text-primary">{progressPercentage}%</span>
              </div>
              <ProgressBar value={progressPercentage} />
              <p className="mt-2 text-xs text-gray-600">
                {complianceItems.filter(item => item.status === 'Completed').length}/{complianceItems.length} tasks completed
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-10">
          <div className="px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <button
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-6 w-6" />
            </button>

            <div className="flex-1 flex justify-end items-center space-x-4">
              <div className="relative">
                <div className="flex items-center text-sm">
                  <span className="hidden md:inline-block font-medium text-gray-700 mr-2">
                    {user?.fullName}
                  </span>
                  <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                    {user?.fullName?.[0] || 'U'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Welcome section */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Welcome{user?.company ? `, ${user.company}` : user?.fullName ? `, ${user.fullName}` : ''}
              </h1>
              <p className="text-gray-600 mt-1">
                Here's your compliance roadmap based on your industry and responses
              </p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {/* Progress Overview Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Compliance Progress</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Overall completion</span>
                      <span className="font-medium">{progressPercentage}%</span>
                    </div>
                    <ProgressBar value={progressPercentage} showValue={false} size="lg" />
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div>
                        <p className="text-3xl font-bold text-gray-900">
                          {complianceItems.filter(item => item.status === 'Pending' && item.type === 'Required').length}
                        </p>
                        <p className="text-sm text-gray-500">Required Tasks</p>
                      </div>
                      <div>
                        <p className="text-3xl font-bold text-gray-900">
                          {complianceItems.filter(item => item.status === 'Pending' && item.type === 'Recommended').length}
                        </p>
                        <p className="text-sm text-gray-500">Recommended</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions Card */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button
                    className="w-full justify-start"
                    leftIcon={<FileText className="h-4 w-4" />}
                    onClick={() => toast.info('Document generation coming soon!')}
                  >
                    Generate Document
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start"
                    leftIcon={<Sliders className="h-4 w-4" />}
                    onClick={() => navigate('/onboarding/step1')}
                  >
                    Re-run Compliance Check
                  </Button>
                </CardContent>
              </Card>

              {/* Tips Card */}
              <Card>
                <CardHeader className="pb-2 text-white gradient-bg rounded-t-lg">
                  <CardTitle className="text-lg">Compliance Tip</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <p className="text-gray-600">
                    Remember to review your POPIA compliance at least once per year to ensure ongoing adherence to South Africa's data protection laws.
                  </p>
                  <Button 
                    variant="link" 
                    className="mt-2 p-0"
                    onClick={() => toast.info('Tips feature coming soon!')}
                  >
                    Get more tips
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Compliance Requirements Section */}
            <div className="bg-white rounded-lg shadow">
              <div className="border-b border-gray-200 px-6 py-4">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
                  <h2 className="text-lg font-medium">Compliance Requirements</h2>
                  
                  <div className="w-full sm:w-auto flex flex-col sm:flex-row gap-4">
                    {/* Search */}
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md"
                        placeholder="Search requirements..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                    
                    {/* Filter Dropdown */}
                    <div className="relative">
                      <button
                        className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-md bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
                      >
                        <Filter className="h-4 w-4" />
                        <span>Filter</span>
                        <ChevronDown className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Filter Tabs */}
              <div className="border-b border-gray-200">
                <div className="px-6">
                  <nav className="-mb-px flex space-x-6 overflow-x-auto">
                    {(['All', 'Required', 'Recommended', 'Completed', 'Pending'] as const).map((filter) => (
                      <button
                        key={filter}
                        className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${
                          activeFilter === filter
                            ? 'border-primary text-primary'
                            : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                        }`}
                        onClick={() => setActiveFilter(filter)}
                      >
                        {filter}
                      </button>
                    ))}
                  </nav>
                </div>
              </div>

              {/* Compliance Items */}
              <div className="divide-y divide-gray-200">
                {isLoading ? (
                  <div className="py-12 text-center">
                    <div className="inline-block animate-spin rounded-full h-8 w-8 border-2 border-primary border-t-transparent"></div>
                    <p className="mt-2 text-sm text-gray-600">Loading your compliance items...</p>
                  </div>
                ) : filteredItems.length === 0 ? (
                  <div className="py-12 text-center">
                    <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">No items found</h3>
                    <p className="mt-2 text-sm text-gray-600">
                      {searchTerm ? 'Try adjusting your search term' : 'No compliance items match the selected filter'}
                    </p>
                  </div>
                ) : (
                  filteredItems.map((item) => (
                    <div key={item.id} className="px-6 py-4 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className="pt-1">
                            <input
                              type="checkbox"
                              checked={item.status === 'Completed'}
                              onChange={() => toggleItemStatus(item.id)}
                              className="h-5 w-5 text-primary border-gray-300 rounded focus:ring-primary"
                            />
                          </div>
                          <div>
                            <h3 className="font-medium text-gray-900">{item.title}</h3>
                            <p className="mt-1 text-sm text-gray-500">{item.description}</p>
                            <div className="mt-2 flex items-center space-x-2">
                              <Badge
                                variant={item.type === 'Required' ? 'error' : 'warning'}
                                size="sm"
                              >
                                {item.type}
                              </Badge>
                              <Badge
                                variant={item.status === 'Completed' ? 'success' : 'outline'}
                                size="sm"
                              >
                                {item.status}
                              </Badge>
                              {item.industry && (
                                <Badge variant="outline" size="sm">
                                  {item.industry}
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex space-x-2">
                          {item.documentUrl && (
                            <Button
                              size="sm"
                              variant="outline"
                              leftIcon={<Download className="h-4 w-4" />}
                              onClick={() => toast.success('Template download started')}
                            >
                              Template
                            </Button>
                          )}
                          {item.officialSiteUrl && (
                            <Button
                              size="sm"
                              variant="ghost"
                              leftIcon={<ExternalLink className="h-4 w-4" />}
                              onClick={() => window.open(item.officialSiteUrl, '_blank')}
                            >
                              Official Site
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;