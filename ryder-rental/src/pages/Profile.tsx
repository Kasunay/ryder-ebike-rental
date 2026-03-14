import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { useAuth } from "@/context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, Clock, LogOut, Edit, X, Check, Lock, Bell, Eye, Bike, FileText, Calendar, AlertCircle, Zap } from "lucide-react";

interface Agreement {
  id: string;
  type: string;
  startDate: string;
  endDate: string;
  status: "active" | "expired" | "pending";
  description: string;
}

export function Profile() {
  const { isAuthenticated, userEmail, userRole, logout } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState<"overview" | "agreements" | "coming">("overview");
  const [editData, setEditData] = useState({
    email: userEmail || "",
    firstName: "",
    lastName: "",
    phone: "",
  });

  const [agreements] = useState<Agreement[]>([
    {
      id: "AGR-001",
      type: "Monthly Subscription",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      status: "active",
      description: "Unlimited rides up to 2 hours per day",
    },
    {
      id: "AGR-002",
      type: "Insurance Coverage",
      startDate: "2024-01-15",
      endDate: "2024-12-31",
      status: "active",
      description: "Full coverage for bike damage and theft",
    },
  ]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const handleSaveProfile = () => {
    // In a real app, this would send data to backend
    console.log("Saving profile:", editData);
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditData({
      email: userEmail || "",
      firstName: "",
      lastName: "",
      phone: "",
    });
    setIsEditing(false);
  };

  const initials =
    userEmail
      ?.split("@")[0]
      ?.split(".")
      .map((part) => part.charAt(0).toUpperCase())
      .join("")
      .slice(0, 2) || "U";

  const getStatusBadge = (status: string) => {
    const statusConfig: Record<string, { bg: string; text: string; dot: string }> = {
      active: { bg: "bg-green-100", text: "text-green-700", dot: "bg-green-500" },
      expired: { bg: "bg-red-100", text: "text-red-700", dot: "bg-red-500" },
      pending: { bg: "bg-yellow-100", text: "text-yellow-700", dot: "bg-yellow-500" },
    };
    return statusConfig[status] || statusConfig.pending;
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />

      <main className="flex-1 w-full px-4 py-12">
        <div className="container mx-auto max-w-6xl">
          {/* Profile Header Card */}
          <Card className="rounded-2xl border shadow-lg mb-6 overflow-hidden">
            <div className="bg-gradient-to-r from-ryder-white to-ryder-white-dark h-32"></div>

            <CardContent className="pt-0">
              <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-16 mb-6">
                <div className="w-32 h-32 rounded-2xl bg-white border-4 border-ryder-green shadow-lg flex items-center justify-center text-4xl font-bold text-ryder-green">
                  {initials}
                </div>
                <div className="flex-1">
                  <h1 className="text-3xl font-bold text-gray-900">{editData.firstName || "User Profile"}</h1>
                  <p className="text-gray-600">{userEmail}</p>
                  <span className="inline-block mt-2 px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium capitalize">
                    {userRole?.toLowerCase() || "User"}
                  </span>
                </div>
                <Button
                  onClick={() => setIsEditing(!isEditing)}
                  variant={isEditing ? "outline" : "default"}
                  className="bg-ryder-green hover:bg-ryder-green-dark text-white"
                >
                  <Edit className="h-4 w-4 mr-2" />
                  {isEditing ? "Cancel" : "Edit Profile"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Tab Navigation */}
          <div className="flex gap-2 mb-6 border-b border-gray-200 overflow-x-auto">
            <button
              onClick={() => setActiveTab("overview")}
              className={`px-6 py-3 font-medium transition-colors whitespace-nowrap ${
                activeTab === "overview"
                  ? "text-ryder-green border-b-2 border-ryder-green"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              Overview
            </button>
            <button
              onClick={() => setActiveTab("agreements")}
              className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === "agreements"
                  ? "text-ryder-green border-b-2 border-ryder-green"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <FileText className="h-4 w-4" />
              Agreements
            </button>
            <button
              onClick={() => setActiveTab("coming")}
              className={`px-6 py-3 font-medium transition-colors flex items-center gap-2 whitespace-nowrap ${
                activeTab === "coming"
                  ? "text-ryder-green border-b-2 border-ryder-green"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              <Zap className="h-4 w-4" />
              Coming Soon
            </button>
          </div>

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - Account Settings */}
              <div className="lg:col-span-2 space-y-6">
                {/* Personal Information */}
                <Card className="rounded-2xl border shadow-lg">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Mail className="h-5 w-5 text-ryder-green" />
                      Personal Information
                    </CardTitle>
                    <CardDescription>Manage your account details</CardDescription>
                  </CardHeader>
                <CardContent className="space-y-4">
                  {isEditing ? (
                    <>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">First Name</label>
                          <input
                            type="text"
                            value={editData.firstName}
                            onChange={(e) => setEditData({ ...editData, firstName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ryder-green focus:border-transparent outline-none transition"
                            placeholder="First Name"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-gray-700 block mb-2">Last Name</label>
                          <input
                            type="text"
                            value={editData.lastName}
                            onChange={(e) => setEditData({ ...editData, lastName: e.target.value })}
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ryder-green focus:border-transparent outline-none transition"
                            placeholder="Last Name"
                          />
                        </div>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Email</label>
                        <input
                          type="email"
                          value={editData.email}
                          disabled
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-600 cursor-not-allowed"
                        />
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                      </div>
                      <div>
                        <label className="text-sm font-medium text-gray-700 block mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={editData.phone}
                          onChange={(e) => setEditData({ ...editData, phone: e.target.value })}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ryder-green focus:border-transparent outline-none transition"
                          placeholder="+1 (555) 000-0000"
                        />
                      </div>
                      <div className="flex gap-3 pt-4">
                        <Button
                          onClick={handleSaveProfile}
                          className="flex-1 bg-ryder-green hover:bg-ryder-green-dark text-white"
                        >
                          <Check className="h-4 w-4 mr-2" />
                          Save Changes
                        </Button>
                        <Button
                          onClick={handleCancelEdit}
                          variant="outline"
                          className="flex-1"
                        >
                          <X className="h-4 w-4 mr-2" />
                          Cancel
                        </Button>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex items-start justify-between py-3 border-b">
                        <div>
                          <p className="text-sm text-gray-600">Email Address</p>
                          <p className="text-base font-medium text-gray-900">{userEmail}</p>
                        </div>
                      </div>
                      <div className="flex items-start justify-between py-3 border-b">
                        <div>
                          <p className="text-sm text-gray-600">Account Role</p>
                          <p className="text-base font-medium text-gray-900 capitalize">{userRole?.toLowerCase() || "User"}</p>
                        </div>
                      </div>
                      <div className="flex items-start justify-between py-3">
                        <div>
                          <p className="text-sm text-gray-600">Member Since</p>
                          <p className="text-base font-medium text-gray-900">{new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}</p>
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Security */}
              <Card className="rounded-2xl border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Lock className="h-5 w-5 text-ryder-green" />
                    Security
                  </CardTitle>
                  <CardDescription>Manage your security preferences</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div>
                      <p className="font-medium text-gray-900">Password</p>
                      <p className="text-sm text-gray-600">Last changed 90 days ago</p>
                    </div>
                    <Button variant="outline" size="sm">Change Password</Button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                    <div>
                      <p className="font-medium text-gray-900">Two-Factor Authentication</p>
                      <p className="text-sm text-gray-600">Disabled</p>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column - Quick Actions */}
            <div className="space-y-6">
              {/* Account Status */}
              <Card className="rounded-2xl border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg">Account Status</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center gap-3 p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <div>
                      <p className="font-medium text-gray-900">Active</p>
                      <p className="text-xs text-gray-600">All systems operational</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Notifications */}
              <Card className="rounded-2xl border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Bell className="h-5 w-5 text-ryder-green" />
                    Notifications
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Email Alerts</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Ride Updates</span>
                    <input type="checkbox" defaultChecked className="w-4 h-4 rounded" />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-700">Promotions</span>
                    <input type="checkbox" className="w-4 h-4 rounded" />
                  </div>
                </CardContent>
              </Card>

              {/* Privacy */}
              <Card className="rounded-2xl border shadow-lg">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Eye className="h-5 w-5 text-ryder-green" />
                    Privacy
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button variant="outline" className="w-full justify-start text-sm">
                    View Privacy Policy
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    Download Your Data
                  </Button>
                  <Button variant="outline" className="w-full justify-start text-sm">
                    Delete Account
                  </Button>
                </CardContent>
              </Card>

              {/* Logout */}
              <Button
                onClick={handleLogout}
                className="w-full bg-red-600 hover:bg-red-700 text-white rounded-lg h-11"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
            </div>
          )}

          {/* Agreements Tab */}
          {activeTab === "agreements" && (
            <div className="space-y-6">
              <Card className="rounded-2xl border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-ryder-green" />
                    Active Agreements
                  </CardTitle>
                  <CardDescription>Your subscriptions and service agreements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {agreements.map((agreement) => {
                    const config = getStatusBadge(agreement.status);
                    return (
                      <div key={agreement.id} className="p-4 border border-gray-200 rounded-lg hover:border-ryder-green transition">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-gray-900">{agreement.type}</h3>
                            <p className="text-sm text-gray-600 mt-1">{agreement.description}</p>
                          </div>
                          <span className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${config.bg} ${config.text}`}>
                            <span className={`w-2 h-2 rounded-full ${config.dot}`}></span>
                            {agreement.status.charAt(0).toUpperCase() + agreement.status.slice(1)}
                          </span>
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div className="flex items-center gap-2 text-gray-600">
                            <Calendar className="h-4 w-4" />
                            <span>Start: {new Date(agreement.startDate).toLocaleDateString()}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-600">
                            <Clock className="h-4 w-4" />
                            <span>End: {new Date(agreement.endDate).toLocaleDateString()}</span>
                          </div>
                        </div>
                        <div className="mt-3 flex gap-2">
                          <Button size="sm" variant="outline" className="text-xs">
                            View Details
                          </Button>
                          <Button size="sm" variant="outline" className="text-xs text-red-600">
                            Cancel Agreement
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
              </Card>

              {/* Agreement Terms */}
              <Card className="rounded-2xl border shadow-lg">
                <CardHeader>
                  <CardTitle>Upcoming Agreement Changes</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg flex gap-3">
                    <AlertCircle className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-medium text-blue-900">Your monthly subscription will renew on March 15, 2024</p>
                      <p className="text-sm text-blue-700 mt-1">No action needed unless you want to modify or cancel your plan.</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Coming Soon Tab */}
          {activeTab === "coming" && (
            <div className="space-y-6">
              <Card className="rounded-2xl border shadow-lg">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Zap className="h-5 w-5 text-ryder-green" />
                    Exciting Features Coming Soon
                  </CardTitle>
                  <CardDescription>We're working on some amazing new features for you</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg hover:border-ryder-green transition group">
                      <div className="flex items-start gap-3">
                        <Bike className="h-5 w-5 text-ryder-green mt-1 group-hover:scale-110 transition" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Bike Rental History</h3>
                          <p className="text-sm text-gray-600 mt-1">Track all your past and current bike rentals with detailed information</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg hover:border-ryder-green transition group">
                      <div className="flex items-start gap-3">
                        <Calendar className="h-5 w-5 text-ryder-green mt-1 group-hover:scale-110 transition" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Booking Calendar</h3>
                          <p className="text-sm text-gray-600 mt-1">View your upcoming rides and plan your trips in advance</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg hover:border-ryder-green transition group">
                      <div className="flex items-start gap-3">
                        <FileText className="h-5 w-5 text-ryder-green mt-1 group-hover:scale-110 transition" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Enhanced Reports</h3>
                          <p className="text-sm text-gray-600 mt-1">Detailed analytics and reports about your ride usage and spending</p>
                        </div>
                      </div>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-lg hover:border-ryder-green transition group">
                      <div className="flex items-start gap-3">
                        <Bell className="h-5 w-5 text-ryder-green mt-1 group-hover:scale-110 transition" />
                        <div>
                          <h3 className="font-semibold text-gray-900">Smart Notifications</h3>
                          <p className="text-sm text-gray-600 mt-1">Get smart alerts about available bikes and maintenance schedules</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border shadow-lg bg-gradient-to-br from-ryder-green/10 to-transparent">
                <CardContent className="pt-6">
                  <div className="text-center">
                    <Zap className="h-12 w-12 text-ryder-green mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Tuned!</h3>
                    <p className="text-gray-600">We're constantly improving your experience. Check back soon for these amazing features.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}
