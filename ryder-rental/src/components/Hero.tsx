import { Button } from "@/components/ui/button";
import { Bike, Zap, Clock } from "lucide-react";

export function Hero() {
  return (
    <section className="relative bg-gradient-to-br from-gray-50 to-gray-100 py-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Electric Bikes for Food Delivery in{" "}
              <span className="text-ryder-green">Poland</span>
            </h1>
            <p className="text-lg text-gray-600">
              Boost your delivery efficiency with our premium electric bikes. 
              Eco-friendly, fast, and designed for the modern food courier.
            </p>
            
            {/* Features */}
            <div className="grid grid-cols-3 gap-4 pt-4">
              <div className="flex flex-col items-center text-center">
                <div className="bg-ryder-green/10 p-3 rounded-full mb-2">
                  <Zap className="h-6 w-6 text-ryder-green" />
                </div>
                <span className="text-sm font-medium">Fast Charging</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-ryder-green/10 p-3 rounded-full mb-2">
                  <Bike className="h-6 w-6 text-ryder-green" />
                </div>
                <span className="text-sm font-medium">Long Range</span>
              </div>
              <div className="flex flex-col items-center text-center">
                <div className="bg-ryder-green/10 p-3 rounded-full mb-2">
                  <Clock className="h-6 w-6 text-ryder-green" />
                </div>
                <span className="text-sm font-medium">24/7 Support</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <Button size="lg" className="bg-ryder-green hover:bg-ryder-green-dark">
                Start Renting Today
              </Button>
              <Button size="lg" variant="outline">
                View Pricing
              </Button>
            </div>
          </div>

          {/* Right Content - Image Placeholder */}
          <div className="relative">
            <div className="bg-gradient-to-br from-ryder-green/20 to-ryder-green/5 rounded-2xl p-8 aspect-square flex items-center justify-center">
              <Bike className="h-64 w-64 text-ryder-green opacity-20" />
            </div>
            {/* Floating Stats */}
          
            
          </div>
        </div>
      </div>
    </section>
  );
}
