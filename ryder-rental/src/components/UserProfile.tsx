import { useAuth } from "@/context/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Mail, Shield, LogOut } from "lucide-react";

export function UserProfile() {
  const { userEmail, userRole, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Your Profile</CardTitle>
        <CardDescription>User account information</CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Email Section */}
        <div className="flex items-start gap-4">
          <Mail className="h-5 w-5 text-ryder-green mt-1" />
          <div>
            <p className="text-sm text-gray-500">Email Address</p>
            <p className="text-base font-medium text-gray-900">{userEmail}</p>
          </div>
        </div>

        {/* Role Section */}
        <div className="flex items-start gap-4">
          <Shield className="h-5 w-5 text-ryder-green mt-1" />
          <div>
            <p className="text-sm text-gray-500">Account Role</p>
            <p className="text-base font-medium text-gray-900 capitalize">{userRole?.toLowerCase() || "User"}</p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t pt-4" />

        {/* Logout Button */}
        <Button
          onClick={handleLogout}
          variant="outline"
          className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 border-red-200 hover:bg-red-50"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </CardContent>
    </Card>
  );
}
