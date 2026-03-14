import { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Bike, LifeBuoy, Info, UserPlus, User, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

export function Header() {
  const { isAuthenticated, userEmail, logout } = useAuth();
  const navigate = useNavigate();
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  console.log("Header: Rendering with auth state:", { isAuthenticated, userEmail });

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    }

    if (isProfileOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isProfileOpen]);

  const handleLogout = () => {
    logout();
    setIsProfileOpen(false);
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/ryder-logo-transparent.png"
              alt="Ryder"
              className="h-28 w-auto"
            />
          </Link>
          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6 text-base font-medium">
            <a
              href="#bikes"
              className="text-gray-600 hover:text-ryder-green transition text-base"
            >
              Bikes
            </a>
            <a
              href="#support"
              className="text-gray-600 hover:text-ryder-green transition text-base"
            >
              Support
            </a>
            <a
              href="#about"
              className="text-gray-600 hover:text-ryder-green transition text-base"
            >
              About
            </a>
          </nav>
          {/* Auth Actions */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="relative" ref={profileRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full bg-ryder-green text-white flex items-center justify-center hover:bg-ryder-green-dark transition"
                  title={userEmail ?? ""}
                >
                  <User className="h-5 w-5" />
                </button>

                {/* Dropdown Menu */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200">
                    <div className="px-4 py-3 border-b border-gray-100">
                      <p className="text-sm text-gray-500">Signed in as</p>
                      <p className="text-sm font-medium text-gray-900 truncate">{userEmail}</p>
                    </div>
                    <button
                      onClick={() => {
                        setIsProfileOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2"
                    >
                      <User className="h-4 w-4" />
                      View Profile
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 border-t border-gray-100"
                    >
                      <LogOut className="h-4 w-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" size="sm">Log in</Button>
                </Link>
                <Link to="/signup">
                  <Button size="sm" className="bg-ryder-green hover:bg-ryder-green-dark text-white">
                    Sign up
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile Auth CTA (moved to bottom navbar) */}
        </div>
      </div>

      {/* Mobile Bottom Navbar */}
      <nav className="fixed bottom-0 inset-x-0 z-50 bg-white border-t md:hidden">
        <div className="flex justify-around py-2">
          <BottomNavItem icon={Bike} label="Bikes" href="#bikes" />
          <BottomNavItem icon={LifeBuoy} label="Support" href="#support" />
          <BottomNavItem icon={Info} label="About" href="#about" />
          {isAuthenticated ? (
            <div className="flex flex-col items-center text-[11px] text-gray-500 hover:text-ryder-green transition">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="w-8 h-8 rounded-full bg-ryder-green text-white flex items-center justify-center hover:bg-ryder-green-dark transition"
              >
                <User className="h-4 w-4" />
              </button>
              <span className="mt-1">Profile</span>
            </div>
          ) : (
            <>
              <BottomNavItem icon={User} label="Login" to="/login" />
              <BottomNavItem icon={UserPlus} label="Sign up" to="/signup" />
            </>
          )}
        </div>
      </nav>
    </header>
  );
}

function BottomNavItem({ icon: Icon, label, href, to }: any) {
  const Comp: any = href ? "a" : Link;

  return (
    <Comp
      href={href}
      to={to}
      className="flex flex-col items-center text-[11px] text-gray-500 hover:text-ryder-green transition"
    >
      <Icon className="h-5 w-5 mb-1" />
      {label}
    </Comp>
  );
}
