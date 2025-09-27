"use client";
import { motion } from "motion/react";

// -------------------------- Hero Image --------------------------
const heroImage =
  "https://images.unsplash.com/photo-1557682250-4f8b1a8f0f21?auto=format&fit=crop&w=1470&q=80";

// -------------------------- Testimonial Data --------------------------
const testimonials = [
  {
    name: "Sarah Connor",
    role: "Project Manager",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    text: "This software revolutionized the way our team collaborates and delivers projects on time.",
  },
  {
    name: "John Doe",
    role: "Team Lead",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    text: "Managing tasks and team workflows has never been this smooth and intuitive.",
  },
  {
    name: "Emma Watson",
    role: "Developer",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
    text: "The interface is super friendly and the AI tools are amazing for project planning.",
  },
];

// -------------------------- Company Logos --------------------------
const companyLogos = [
  "https://images.unsplash.com/photo-1503023345310-bd7c1de61c7d?auto=format&fit=crop&w=200&q=60",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&w=200&q=60",
  "https://images.unsplash.com/photo-1581091215367-3fc0ffab2fd0?auto=format&fit=crop&w=200&q=60",
  "https://images.unsplash.com/photo-1521790365270-4a72f0a3b4a4?auto=format&fit=crop&w=200&q=60",
  "https://images.unsplash.com/photo-1606813901628-d94b2f86907a?auto=format&fit=crop&w=200&q=60",
];

// -------------------------- Landing Page --------------------------
export default function TeamLeadLanding() {
  return (
    <div className="font-sans text-gray-800 dark:text-gray-100">
      {/* <HeroSection /> */}
      <FeaturesSection />
      <HowItWorksSection />
      <TestimonialSection />
      <CompanyLogoCarousel />
      <CTASection />
      {/* <FAQSection /> */}
    </div>
  );
}

// -------------------------- Hero Section --------------------------


// -------------------------- Features Section --------------------------
const FeaturesSection = () => (
  <section className="py-20 bg-gray-100 dark:bg-gray-800">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
      Why TeamLead Software?
    </h2>
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4">
      <FeatureCard title="AI-Powered Insights" description="Make smarter decisions with AI-driven analytics for team performance." />
      <FeatureCard title="Seamless Collaboration" description="Collaborate in real-time, assign tasks, and keep your team aligned." />
      <FeatureCard title="Fast Deployment" description="Launch projects quickly with easy-to-use templates and integrations." />
    </div>
  </section>
);

const FeatureCard = ({ title, description }: { title: string; description: string }) => (
  <div className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow hover:shadow-lg transition">
    <h3 className="font-bold text-xl mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

// -------------------------- How It Works Section --------------------------
const HowItWorksSection = () => (
  <section className="py-20 bg-white dark:bg-gray-900">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">How It Works</h2>
    <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8 px-4 text-center">
      <Step number={1} title="Create Your Team" description="Set up your team and roles in minutes." />
      <Step number={2} title="Assign Tasks" description="Delegate work efficiently with task boards." />
      <Step number={3} title="Track Progress" description="Monitor performance and hit deadlines effortlessly." />
    </div>
  </section>
);

const Step = ({ number, title, description }: { number: number; title: string; description: string }) => (
  <div>
    <div className="w-16 h-16 mx-auto mb-4 bg-blue-600 text-white rounded-full flex items-center justify-center text-xl font-bold">{number}</div>
    <h3 className="font-bold mb-2">{title}</h3>
    <p className="text-gray-600 dark:text-gray-300">{description}</p>
  </div>
);

// -------------------------- Testimonial Section --------------------------
const TestimonialSection = () => (
  <section className="py-20 bg-gray-100 dark:bg-gray-800">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">What Our Users Say</h2>
    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
      {testimonials.map((t, i) => (
        <motion.div
          key={i}
          className="bg-white dark:bg-gray-900 p-6 rounded-xl shadow-md flex flex-col items-center text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.3 }}
        >
          <img src={t.image} alt={t.name} className="w-20 h-20 rounded-full mb-4" />
          <p className="mb-2 text-gray-700 dark:text-gray-300">"{t.text}"</p>
          <h4 className="font-bold">{t.name}</h4>
          <span className="text-sm text-gray-500">{t.role}</span>
        </motion.div>
      ))}
    </div>
  </section>
);

// -------------------------- Company Logo Carousel --------------------------
const CompanyLogoCarousel = () => (
  <section className="py-12 bg-gray-50 dark:bg-gray-900 overflow-hidden">
    <h2 className="text-2xl md:text-3xl font-bold text-center mb-8">Trusted by Companies Worldwide</h2>
    <div className="relative w-full overflow-hidden">
      <motion.div
        className="flex gap-10 animate-marquee"
        style={{ display: "flex" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
      >
        {companyLogos.concat(companyLogos).map((logo, i) => (
          <div key={i} className="flex-shrink-0 w-44 h-36 bg-white rounded-lg shadow-xl flex items-center justify-center">
            <img src={logo} alt={`Company ${i}`} className="max-h-12 object-contain" />
          </div>
        ))}
      </motion.div>
    </div>
  </section>
);

// -------------------------- CTA Section --------------------------
const CTASection = () => (
  <section className="py-20 bg-blue-600 dark:bg-blue-700 text-white text-center">
    <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Boost Your Team's Productivity?</h2>
    <p className="max-w-xl mx-auto mb-8">
      Join thousands of teams who are already achieving more with TeamLead Software.
    </p>
    <div className="flex justify-center gap-4 flex-wrap">
      <a href="/signup" className="px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-gray-100 transition">Get Started Free</a>
      <a href="/demo" className="px-8 py-4 border border-white rounded-lg hover:bg-white hover:text-blue-600 transition">Request a Demo</a>
    </div>
  </section>
);

// -------------------------- FAQ Section --------------------------
const FAQSection = () => (
  <section className="py-20 bg-gray-100 dark:bg-gray-800">
    <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Frequently Asked Questions</h2>
    <div className="max-w-4xl mx-auto space-y-6 px-4">
      <FAQItem question="Is there a free trial?" answer="Yes! You can try all features for 14 days without a credit card." />
      <FAQItem question="Can I manage multiple teams?" answer="Absolutely. You can create and manage unlimited teams." />
      <FAQItem question="Does it integrate with other tools?" answer="Yes! We support Slack, Jira, Google Workspace, and more." />
    </div>
  </section>
);

const FAQItem = ({ question, answer }: { question: string; answer: string }) => (
  <div>
    <h3 className="font-bold mb-2">{question}</h3>
    <p className="text-gray-600 dark:text-gray-300">{answer}</p>
  </div>
);

// -------------------------- Footer --------------------------
const Footer = () => (
  <footer className="py-10 bg-gray-800 dark:bg-gray-900 text-gray-200 text-center">
    <p>© 2025 TeamLead Software. All rights reserved.</p>
    <div className="flex justify-center gap-4 mt-4">
      <a href="#" className="hover:text-white transition">Privacy</a>
      <a href="#" className="hover:text-white transition">Terms</a>
      <a href="#" className="hover:text-white transition">Contact</a>
    </div>
    <style jsx>{`
      @keyframes marquee {
        0% { transform: translateX(0); }
        100% { transform: translateX(-50%); }
      }
      .animate-marquee {
        display: flex;
        gap: 2.5rem;
        width: calc(200% + 2.5rem);
        animation: marquee 20s linear infinite;
      }
    `}</style>
  </footer>
);
