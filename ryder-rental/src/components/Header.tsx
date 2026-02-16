import { Link } from "react-router-dom";
import { Bike, LifeBuoy, Info, UserPlus, User } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Header() {
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
            <Link to="/login">
              <Button variant="outline" size="sm">Log in</Button>
            </Link>
            <Link to="/signup">
              <Button size="sm" className="bg-ryder-green hover:bg-ryder-green-dark text-white">
                Sign up
              </Button>
            </Link>
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
          <BottomNavItem icon={User} label="Login" to="/login" />
          <BottomNavItem icon={UserPlus} label="Sign up" to="/signup" />
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
