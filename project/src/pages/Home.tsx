import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, Shield, Award, Check } from 'lucide-react';
import Button from '../components/ui/Button';

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="gradient-bg text-white pt-16 pb-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
                Legal compliance made simple for South African startups
              </h1>
              <p className="text-lg sm:text-xl text-white/90 max-w-xl">
                Understand exactly which laws apply to your business and get the documents you need - all in one place.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100"
                  onClick={() => navigate('/signup')}
                >
                  Get Started
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10"
                  onClick={() => navigate('/demo')}
                >
                  See Demo
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img
                src="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Dashboard Preview"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">How it works</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              Our simple process guides you through understanding and meeting your legal obligations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {/* Feature 1 */}
            <div className="flex flex-col items-center text-center">
              <div className="icon-container mb-4">
                <FileText className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Answer Questions</h3>
              <p className="text-gray-600">
                Answer simple questions about your business to identify which laws apply to you.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="flex flex-col items-center text-center">
              <div className="icon-container mb-4">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Get Recommendations</h3>
              <p className="text-gray-600">
                Receive a tailored compliance roadmap with step-by-step guidance and required documents.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="flex flex-col items-center text-center">
              <div className="icon-container mb-4">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-medium text-gray-900 mb-2">Stay Compliant</h3>
              <p className="text-gray-600">
                Track your progress and get updates when laws change to stay compliant year-round.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h2 className="text-3xl font-bold text-gray-900">Why choose StartUpLegal?</h2>
              <p className="text-lg text-gray-600">
                We help South African startups and SMEs navigate complex legal requirements with ease, saving time and reducing risk.
              </p>

              <ul className="space-y-4">
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-2" />
                  <div>
                    <h4 className="font-medium text-gray-900">Save Money</h4>
                    <p className="text-gray-600">Reduce expensive legal consultation fees with our affordable platform.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-2" />
                  <div>
                    <h4 className="font-medium text-gray-900">Save Time</h4>
                    <p className="text-gray-600">Quickly identify your obligations instead of spending hours on research.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-2" />
                  <div>
                    <h4 className="font-medium text-gray-900">Reduce Risk</h4>
                    <p className="text-gray-600">Avoid penalties and legal issues by ensuring compliance from day one.</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <Check className="h-5 w-5 text-primary mt-1 mr-2" />
                  <div>
                    <h4 className="font-medium text-gray-900">South Africa Specific</h4>
                    <p className="text-gray-600">Tailored specifically for South African laws and regulations.</p>
                  </div>
                </li>
              </ul>

              <Button
                className="mt-4"
                onClick={() => navigate('/signup')}
              >
                Start Your Compliance Journey
              </Button>
            </div>

            <div className="order-first lg:order-last">
              <img
                src="https://images.pexels.com/photos/6804595/pexels-photo-6804595.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Compliance Dashboard"
                className="rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900">What our customers say</h2>
            <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
              We've helped hundreds of South African businesses simplify their legal compliance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Thabo Ndlovu"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Thabo Ndlovu</h4>
                  <p className="text-sm text-gray-600">Fintech Founder</p>
                </div>
              </div>
              <p className="text-gray-600">
                "StartUpLegal simplified our regulatory compliance process. The platform guided us through all the fintech-specific requirements we needed to address."
              </p>
            </div>

            {/* Testimonial 2 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="Sarah Johnson"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">Sarah Johnson</h4>
                  <p className="text-sm text-gray-600">E-commerce Entrepreneur</p>
                </div>
              </div>
              <p className="text-gray-600">
                "As a small business owner, legal compliance felt overwhelming. StartUpLegal made it manageable with clear steps and document templates."
              </p>
            </div>

            {/* Testimonial 3 */}
            <div className="card">
              <div className="flex items-center mb-4">
                <img
                  src="https://images.pexels.com/photos/874158/pexels-photo-874158.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                  alt="David Maseko"
                  className="h-12 w-12 rounded-full object-cover"
                />
                <div className="ml-4">
                  <h4 className="font-medium text-gray-900">David Maseko</h4>
                  <p className="text-sm text-gray-600">Tech Startup CEO</p>
                </div>
              </div>
              <p className="text-gray-600">
                "The industry-specific guidance helped us navigate POPIA compliance with confidence. I highly recommend StartUpLegal to all South African startups."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="gradient-bg text-white py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to simplify your legal compliance?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join hundreds of South African businesses who have simplified their legal compliance journey.
          </p>

          <div className="max-w-md mx-auto">
            <form className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-grow px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button 
                className="bg-white text-primary hover:bg-gray-100"
                onClick={(e) => {
                  e.preventDefault();
                  navigate('/signup');
                }}
              >
                Get Started
              </Button>
            </form>
            <p className="text-sm mt-4 text-white/80">
              Start your 14-day free trial. No credit card required.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;