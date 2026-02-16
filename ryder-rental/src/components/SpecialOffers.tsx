import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Clock, Percent, Gift, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const offers = [
  {
    id: 1,
    title: "Weekend Special",
    description: "Enjoy discounted rides every weekend",
    discount: "20% OFF",
    icon: Percent,
    validUntil: "Valid until Feb 29, 2026",
    gradient: "from-slate-700 to-slate-900"
  },
  {
    id: 2,
    title: "First Month Free",
    description: "Your first month is on us — no commitment",
    discount: "FREE",
    icon: Gift,
    validUntil: "For new customers only",
    gradient: "from-slate-700 to-slate-900"
  },
  {
    id: 3,
    title: "Early Bird",
    description: "Book early and ride for less",
    discount: "15% OFF",
    icon: Clock,
    validUntil: "Daily from 5–6 AM",
    gradient: "from-slate-700 to-slate-900"
  }
];

export function SpecialOffers() {
  return (
    <section id="offers" className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <Badge variant="secondary" className="mb-4 text-sm">
            Limited Time
          </Badge>
          <h2 className="text-4xl font-bold tracking-tight mb-4">
            Special Offers
          </h2>
          <p className="text-gray-600 max-w-xl mx-auto">
            Exclusive deals crafted for riders who move fast
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 md:grid-cols-3">
          {offers.map((offer, index) => {
            const Icon = offer.icon;
            return (
              <motion.div
                key={offer.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Card className="group relative overflow-hidden rounded-2xl border bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-xl">
                  {/* Gradient Accent */}
                  <div
                    className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${offer.gradient}`}
                  />

                  {/* Discount Pill */}
                  <div
                    className={`absolute top-4 right-4 bg-gradient-to-r ${offer.gradient} text-white px-3 py-1 rounded-full text-xs font-semibold`}
                  >
                    {offer.discount}
                  </div>

                  <CardHeader className="pt-10">
                    <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 group-hover:scale-105 transition">
                      <Icon className="h-7 w-7 text-emerald-600" />
                    </div>
                    <CardTitle className="text-xl">
                      {offer.title}
                    </CardTitle>
                    <CardDescription className="text-base">
                      {offer.description}
                    </CardDescription>
                  </CardHeader>

                  <CardContent className="pb-4">
                    <p className="flex items-center text-sm text-gray-500">
                      <Clock className="mr-2 h-4 w-4" />
                      {offer.validUntil}
                    </p>
                  </CardContent>

                  <CardFooter>
                    <Button
                      className="w-full rounded-xl bg-ryder-green hover:bg-ryder-green-dark text-white"
                    >
                      View details
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
