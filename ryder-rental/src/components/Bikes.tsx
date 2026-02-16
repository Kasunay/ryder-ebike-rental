import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Battery, Gauge, Weight, Bike, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const bikes = [
  {
    id: 1,
    name: "Urban Courier",
    description: "Agile and efficient for dense city deliveries",
    daily: "PLN 15",
    weekly: "PLN 90",
    monthly: "PLN 350",
    specialOffer: "PLN 320",
    gradient: "from-emerald-500 to-green-600",
    specs: {
      range: "80 km",
      speed: "25 km/h",
      weight: "22 kg",
      battery: "500 Wh"
    }
  },
  {
    id: 2,
    name: "Power Delivery Pro",
    description: "Built for long-range and heavy payloads",
    daily: "PLN 20",
    weekly: "PLN 120",
    monthly: "PLN 450",
    specialOffer: "PLN 400",
    gradient: "from-blue-500 to-cyan-500",
    specs: {
      range: "120 km",
      speed: "25 km/h",
      weight: "26 kg",
      battery: "750 Wh"
    }
  },
  {
    id: 3,
    name: "Eco Swift",
    description: "Lightweight, simple, and budget-friendly",
    daily: "PLN 12",
    weekly: "PLN 70",
    monthly: "PLN 280",
    specialOffer: "PLN 250",
    gradient: "from-orange-500 to-amber-500",
    specs: {
      range: "60 km",
      speed: "25 km/h",
      weight: "18 kg",
      battery: "400 Wh"
    }
  }
];

export function Bikes() {
  return (
    <section id="bikes" className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-3 sm:px-4">
        <div className="text-center mb-10 sm:mb-14">
          <Badge variant="secondary" className="mb-4 text-xs sm:text-sm">Our Fleet</Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Choose Your Bike</h2>
          <p className="text-sm sm:text-base text-gray-600 max-w-xl mx-auto px-2">
            Insurance, maintenance, and 24/7 roadside assistance included
          </p>
        </div>

        <div className="grid gap-4 sm:gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {bikes.map((bike, index) => (
            <motion.div
              key={bike.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="relative overflow-hidden rounded-xl sm:rounded-2xl hover:-translate-y-1 hover:shadow-xl transition h-full flex flex-col">
                <div className={`absolute top-0 inset-x-0 h-1 bg-gradient-to-r ${bike.gradient}`} />

                <div className="relative flex h-40 sm:h-48 items-center justify-center bg-gray-100">
                  <Bike className="h-20 sm:h-28 w-20 sm:w-28 text-gray-300" />
                </div>

                <CardHeader className="pb-3 sm:pb-4">
                  <CardTitle className="text-lg sm:text-xl">{bike.name}</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{bike.description}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-4 sm:space-y-6 flex-grow">
                  <div className="rounded-lg sm:rounded-xl bg-gray-50 p-3 sm:p-4 space-y-2">
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-gray-600">Weekly</span>
                      <span className="font-semibold text-ryder-green">
                        {bike.weekly}
                      </span>
                    </div>
                    <div className="flex justify-between items-center text-xs sm:text-sm">
                      <span className="text-gray-600">Monthly</span>
                      <span className="font-semibold text-ryder-green">
                        {bike.monthly}
                      </span>
                    </div>
                    <button
                      onClick={() => window.location.href = '/rent-to-own'}
                      className="w-full text-left pt-2 border-t border-gray-200 hover:bg-gray-100 rounded-lg px-2 py-2 transition-colors"
                    >
                      <span className="text-xs sm:text-sm font-medium text-red-600 block">
                        Rent-to-own · 5-month plan  
                      </span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <Spec icon={Battery} value={bike.specs.battery} />
                    <Spec icon={Gauge} value={bike.specs.speed} />
                    <Spec icon={Bike} value={bike.specs.range} />
                    <Spec icon={Weight} value={bike.specs.weight} />
                  </div>
                </CardContent>

                <CardFooter className="flex flex-col sm:flex-row gap-2 pt-4">
                  <Button className="flex-1 rounded-lg sm:rounded-xl bg-ryder-green hover:bg-ryder-green-dark text-sm sm:text-base h-9 sm:h-10">
                    Rent Now
                  </Button>
                  <Button variant="outline" className="flex-1 rounded-lg sm:rounded-xl text-sm sm:text-base h-9 sm:h-10">
                    Details <ArrowRight className="ml-1 h-3 w-3 sm:h-4 sm:w-4" />
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Spec({ icon: Icon, value }: { icon: any; value: string }) {
  return (
    <div className="flex items-center gap-2 rounded-lg bg-gray-50 px-2 py-2">
      <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-gray-500 flex-shrink-0" />
      <span className="text-xs sm:text-sm truncate">{value}</span>
    </div>
  );
}