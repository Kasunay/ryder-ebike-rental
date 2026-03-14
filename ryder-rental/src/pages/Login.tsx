import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { GoogleIcon, FacebookIcon } from "@/components/ui/icons";
import { useAuth } from "@/context/AuthContext";

export function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [shouldRedirect, setShouldRedirect] = useState(false);
    const navigate = useNavigate();
    const { login, isAuthenticated } = useAuth();

    // Redirect when auth state is updated
    useEffect(() => {
        if (shouldRedirect && isAuthenticated) {
            console.log("Login: Redirecting to home since user is now authenticated");
            navigate("/", { replace: true });
        }
    }, [shouldRedirect, isAuthenticated, navigate]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setSuccessMessage("");
        setIsLoading(true);

        try {
            const response = await fetch("http://localhost:8080/api/auth/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });

            if (!response.ok) {
                const errorData = await response.json().catch(() => null);
                throw new Error(errorData?.message || "Invalid email or password");
            }

            const data = await response.json();
            console.log("Login response:", data); // Debug log
            
            // Extract JWT token from firstName field or other common fields
            const token = data.firstName || data.token || data.accessToken || data.jwt;
            
            if (token) {
                // Use auth context to log in
                console.log("Login: Token found, calling login()");
                login(token);
                
                setSuccessMessage("Logged in successfully!");
                setShouldRedirect(true);
            } else {
                console.error("Available fields in response:", Object.keys(data));
                throw new Error(`No authentication token received. Available fields: ${Object.keys(data).join(", ")}`);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : "Invalid email or password");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-50 to-gray-100">
            <Header />

            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <Card className="rounded-2xl border shadow-lg">
                        <CardHeader className="space-y-2">
                            <CardTitle className="text-3xl">Welcome Back</CardTitle>
                            <CardDescription>
                                Sign in to your Ryder account to continue
                            </CardDescription>
                        </CardHeader>

                        <CardContent>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                {/* Email Input */}
                                <div className="space-y-2">
                                    <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Email Address
                                    </label>
                                    <div className="relative">
                                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            id="email"
                                            type="email"
                                            placeholder="you@example.com"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ryder-green focus:border-transparent transition"
                                            required
                                        />
                                    </div>
                                </div>

                                {/* Password Input */}
                                <div className="space-y-2">
                                    <label htmlFor="password" className="text-sm font-medium text-gray-700">
                                        Password
                                    </label>
                                    <div className="relative">
                                        <Lock className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                                        <input
                                            id="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="••••••••"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                            className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-ryder-green focus:border-transparent transition"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-3 text-gray-400 hover:text-gray-600"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Error Message */}
                                {error && (
                                    <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
                                        {error}
                                    </div>
                                )}

                                {/* Success Message */}
                                {successMessage && (
                                    <div className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-green-700">
                                        {successMessage}
                                    </div>
                                )}

                                {/* Remember & Forgot */}
                                <div className="flex items-center justify-between text-sm">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input type="checkbox" className="rounded border-gray-300" />
                                        <span className="text-gray-600">Remember me</span>
                                    </label>
                                    <a href="#" className="text-ryder-green hover:text-ryder-green-dark font-medium">
                                        Forgot password?
                                    </a>
                                </div>

                                {/* Login Button */}
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-11 rounded-lg bg-ryder-green hover:bg-ryder-green-dark text-white font-medium"
                                >
                                    {isLoading ? "Signing in..." : "Sign In"}
                                </Button>

                                {/* Divider */}
                                <div className="relative">
                                    <div className="absolute inset-0 flex items-center">
                                        <div className="w-full border-t border-gray-300"></div>
                                    </div>
                                    <div className="relative flex justify-center text-sm">
                                        <span className="px-2 bg-white text-gray-500">Or continue with</span>
                                    </div>
                                </div>

                                {/* Social Login */}
                                <div className="grid grid-cols-2 gap-3">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="rounded-lg h-11 flex items-center justify-center gap-2"
                                    >
                                        <GoogleIcon className="h-5 w-5" />
                                        <span className="hidden sm:inline text-sm">Google</span>
                                    </Button>

                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="rounded-lg h-11 flex items-center justify-center gap-2"
                                    >
                                        <FacebookIcon className="h-5 w-5" />
                                        <span className="hidden sm:inline text-sm">Facebook</span>
                                    </Button>
                                </div>
                            </form>

                            {/* Sign Up Link */}
                            <p className="text-center text-sm text-gray-600 mt-6">
                                Don't have an account?{" "}
                                <a href="/signup" className="text-ryder-green hover:text-ryder-green-dark font-medium">
                                    Sign up here
                                </a>
                            </p>
                        </CardContent>
                    </Card>

                    {/* Help Text */}
                    <p className="text-center text-xs text-gray-500 mt-6">
                        By signing in, you agree to our{" "}
                        <a href="#" className="hover:text-gray-700 underline">Terms of Service</a>
                        {" "}and{" "}
                        <a href="#" className="hover:text-gray-700 underline">Privacy Policy</a>
                    </p>
                </div>
            </main>

            <Footer />
        </div>
    );
}