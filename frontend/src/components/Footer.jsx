import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaFacebookF, FaTwitter, FaInstagram, FaYoutube, FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaApplePay } from 'react-icons/fa';
import { BiMailSend } from 'react-icons/bi';
import { BsTelephone } from 'react-icons/bs';
import { FiLink, FiBookmark, FiMail   } from 'react-icons/fi';


const Footer = () => {
  

  return (
    <div className="min-h-screen flex flex-col">
      
      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-br from-emerald-900 via-emerald-800 to-emerald-950 text-white pt-16 pb-8 relative overflow-hidden border-t-8 border-emerald-500">
        {/* Animated background elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-emerald-500 to-emerald-400 z-20"></div>
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-emerald-700 opacity-20 animate-pulse-slow"></div>
        <div className="absolute -bottom-40 -left-24 w-96 h-96 rounded-full bg-emerald-700 opacity-15 animate-pulse-slow animation-delay-2000"></div>
        <div className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full bg-emerald-600 opacity-10 animate-pulse animation-delay-1000"></div>
        
        {/* Hexagonal pattern overlay */}
        <div className="absolute inset-0 opacity-5" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M50 0 L100 25 L100 75 L50 100 L0 75 L0 25 Z' fill='%23137b50'/%3E%3C/svg%3E")`,
          backgroundSize: '60px'
        }}></div>
        
        {/* Floating hexagons */}
        <div className="absolute top-20 right-10 w-16 h-16 bg-emerald-600 opacity-30 rotate-30 animate-float"></div>
        <div className="absolute bottom-32 left-8 w-12 h-12 bg-emerald-500 opacity-40 rotate-30 animate-float animation-delay-2000"></div>
        <div className="absolute top-1/3 left-1/4 w-10 h-10 bg-emerald-400 opacity-30 rotate-30 animate-float animation-delay-3000"></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand Column */}
            <div>
              <div className="flex items-center mb-6">
                <h2 className="text-3xl font-bold text-white tracking-wider">RUSH<span className="text-emerald-300">BASKET</span></h2>
              </div>
              <p className="text-emerald-200 mb-6 leading-relaxed">
                Bringing you the freshest organic produce since 2010. Our mission is to deliver farm-fresh goodness straight to your doorstep.
              </p>
              <div className="flex space-x-4">
                {[FaFacebookF, FaTwitter, FaInstagram, FaYoutube].map((Icon, index) => (
                  <a key={index} href="#" className="bg-emerald-700 hover:bg-emerald-600 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-emerald-500/30 group">
                    <Icon className="text-emerald-100 group-hover:text-white" />
                  </a>
                ))}
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-emerald-500 inline-block text-white  items-center">
                <span className="mr-2">Quick Links</span>
                <FiLink className="h-5 w-5 text-emerald-400" />
              </h3>
              <ul className="space-y-3">
                {['About Us', 'Our Products', 'Farmers Network', 'Delivery Information', 'Privacy Policy', 'Terms & Conditions'].map((item, index) => (
                  <li key={index}>
                    <a href="#" className="text-emerald-200 hover:text-white transition-colors flex items-center group">
                      <span className="w-3 h-3 bg-emerald-400 rounded-full mr-3 group-hover:bg-white transition-colors transform group-hover:scale-125"></span>
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Contact Info */}
            <div>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-emerald-500 inline-block text-white  items-center">
                <span className="mr-2">Contact Us</span>
                     <BsTelephone className="h-5 w-5 text-emerald-400" />
              </h3>
              <ul className="space-y-4">
                <li className="flex items-start group">
                  <div className="mt-1 bg-emerald-700 p-2 rounded-lg mr-4 group-hover:bg-emerald-600 transition-colors transform group-hover:rotate-6">
                    <FaMapMarkerAlt className="text-emerald-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-emerald-300 group-hover:text-white transition-colors">Our Location</h4>
                    <p className="text-emerald-100 group-hover:text-white transition-colors">123 Organic Valley, Green City, GC 54321</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="mt-1 bg-emerald-700 p-2 rounded-lg mr-4 group-hover:bg-emerald-600 transition-colors transform group-hover:rotate-6">
                    <FaPhone className="text-emerald-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-emerald-300 group-hover:text-white transition-colors">Phone Number</h4>
                    <p className="text-emerald-100 group-hover:text-white transition-colors">+91 (123) LUCKNOW</p>
                  </div>
                </li>
                <li className="flex items-start group">
                  <div className="mt-1 bg-emerald-700 p-2 rounded-lg mr-4 group-hover:bg-emerald-600 transition-colors transform group-hover:rotate-6">
                    <FaEnvelope className="text-emerald-300 group-hover:text-white" />
                  </div>
                  <div>
                    <h4 className="font-medium text-emerald-300 group-hover:text-white transition-colors">Email Address</h4>
                    <p className="text-emerald-100 group-hover:text-white transition-colors">hexagonsservices@gmail.com</p>
                  </div>
                </li>
              </ul>
            </div>
            
            {/* Newsletter */}
            <div>
              <h3 className="text-xl font-bold mb-6 pb-2 border-b-2 border-emerald-500 inline-block text-white  items-center">
                <span className="mr-2">Newsletter</span>
                <FiMail className="h-5 w-5 text-emerald-400" />
              </h3>
              <p className="text-emerald-200 mb-6">
                Subscribe to our newsletter for fresh updates, exclusive offers, and seasonal recipes!
              </p>
              <div className="flex flex-wrap mb-4">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="w-full sm:flex-1 bg-emerald-800 border-2 border-emerald-600 rounded-t-xl sm:rounded-l-xl sm:rounded-tr-none px-4 py-3 text-white placeholder-emerald-300 focus:outline-none focus:border-emerald-400 transition-colors"
                />
                <button className="w-full sm:w-auto bg-gradient-to-r from-emerald-500 to-emerald-700 hover:from-emerald-400 hover:to-emerald-600 px-5 py-3 rounded-b-xl sm:rounded-r-xl sm:rounded-bl-none flex items-center justify-center transition-all duration-300 group">
                  <BiMailSend className="text-xl mr-2 group-hover:scale-110 transition-transform" />
                  <span className="group-hover:translate-x-1 transition-transform">Subscribe</span>
                </button>
              </div>
              <p className="text-emerald-300 text-sm">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
          
          {/* Payment Methods */}
          <div className="flex flex-col items-center border-t-2 border-emerald-800 pt-8">
            <h4 className="text-emerald-300 mb-4 font-medium flex items-center">
              <FiBookmark className="h-5 w-5 mr-2" />
              We Accept All Major Payment Methods
            </h4>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              {[FaCcVisa, FaCcMastercard, FaCcPaypal, FaCcAmex, FaApplePay].map((Icon, index) => (
                <div key={index} className="bg-emerald-800 p-3 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer group transform hover:-translate-y-1">
                  <Icon className="text-2xl text-emerald-100 group-hover:text-white" />
                </div>
              ))}
            </div>
            
            
          </div>
        </div>
        
        {/* Hexagon Digital Services Attribution */}
        <div className="mt-8 text-center relative z-10">
          <div className="inline-flex items-center justify-center bg-emerald-900 px-6 py-3 rounded-full border border-emerald-700 shadow-lg group">
            <div className="flex items-center">
              <div className="relative mr-3">
                <div className="w-8 h-8 bg-emerald-500 rounded-md transform rotate-45"></div>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-4 h-4 bg-white rounded-sm transform -rotate-45"></div>
                </div>
              </div>
              <span className="text-emerald-200 group-hover:text-white transition-colors">
                Designed by{' '}
                <a 
                  href="https://hexagondigitalservices.com/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-bold text-white underline hover:text-purple-400 transition-colors"
                >
                  Hexagon Digital Services
                </a>
              </span>
            </div>
          </div>
        </div>
        
        {/* Custom CSS for animations */}
        <style>{`
          @keyframes pulse {
            0% { opacity: 0.1; transform: scale(1); }
            50% { opacity: 0.2; transform: scale(1.05); }
            100% { opacity: 0.1; transform: scale(1); }
          }
          @keyframes pulse-slow {
            0% { opacity: 0.1; }
            50% { opacity: 0.2; }
            100% { opacity: 0.1; }
          }
          @keyframes float {
            0% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(10deg); }
            100% { transform: translateY(0) rotate(0deg); }
          }
          .animate-pulse {
            animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          .animate-pulse-slow {
            animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          .animate-float {
            animation: float 8s ease-in-out infinite;
          }
          .animation-delay-1000 {
            animation-delay: 1s;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
          .animation-delay-3000 {
            animation-delay: 3s;
          }
          .rotate-30 {
            transform: rotate(30deg);
          }
        `}</style>
      </footer>
    </div>
  );
};

export default Footer;