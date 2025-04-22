import React from "react";

type Plan = {
  name: string;
  price: string;
  duration: string;
  features: string[];
  buttonText: string;
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    name: "Free",
    price: "$0",
    duration: "/forever",
    features: [
      "Create unlimited Smart Pages",
      "Basic analytics (views & clicks)",
      "Import from Instagram",
      "Import from Linktree",
      "Basic themes",
      "Watermark on pages",
    ],
    buttonText: "Get Started",
  },
  {
    name: "Pro Monthly",
    price: "$6.99",
    duration: "/month",
    features: [
      "Everything in Free",
      "Advanced analytics",
      "Custom themes",
      "No watermark",
      "Priority support",
      "7-day free trial",
    ],
    buttonText: "Start Free Trial",
    highlight: true,
  },
  {
    name: "Pro Annual",
    price: "$49.99",
    duration: "/year",
    features: [
      "Everything in Pro Monthly",
      "Save 40% vs monthly",
      "Priority feature requests",
      "Early access to new features",
      "7-day free trial",
      "Cancel anytime",
    ],
    buttonText: "Start Free Trial",
  },
];

const PricingPlans: React.FC = () => {
  return (
    <div className="flex justify-center items-center pb-12 px-4 bg-white min-h-screen">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl w-full">
        {plans.map((plan, idx) => (
          <div
            key={idx}
            className={`rounded-3xl shadow-md p-8 text-center transition-all ${
              plan.highlight
                ? "bg-blue-600 text-white scale-105"
                : "bg-white text-gray-900"
            }`}
          >
            <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
            <div className="text-4xl font-bold">
              {plan.price}
              <span className="text-base font-medium ml-1">{plan.duration}</span>
            </div>
            <ul className="mt-6 mb-8 space-y-3 text-sm text-left">
              {plan.features.map((feature, i) => (
                <li key={i} className="flex items-start">
                  <span className="text-blue-600 mr-2">•</span> {feature}
                </li>
              ))}
            </ul>
            <button
              className={`px-5 py-2 rounded-lg font-medium text-sm ${
                plan.highlight
                  ? "bg-white text-blue-600"
                  : "bg-blue-600 text-white"
              }`}
            >
              {plan.buttonText}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PricingPlans;
