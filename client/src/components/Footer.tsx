import { Link } from 'react-router-dom';
import { Brain, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner mt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Brain className="h-6 w-6 text-blue-500" />
              <span className="text-lg font-semibold">Open Science Press</span>
            </div>
            <p className="text-gray-600">
              Advancing scientific publishing through AI innovation
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-gray-600 hover:text-blue-600">About Us</Link></li>
              <li><Link to="/news" className="text-gray-600 hover:text-blue-600">News & Events</Link></li>
              <li><Link to="/journals" className="text-gray-600 hover:text-blue-600">Our Journals</Link></li>
              <li><Link to="/prod_edit" className="text-gray-600 hover:text-blue-600">Processes</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Contact</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-blue-600" />
                <span className="text-gray-600">info@opensciencepress.com</span>
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-gray-600 m-">+44 747 347 3757  </span>
                
              </li>
              <li className="flex items-center space-x-4">
                <Phone className="h-4 w-4 text-blue-600" />
                <span className="text-gray-600"> +218 91 791 1391</span>
              </li>
              <li className=" items-center space-x-2">
                
                <div className='flex items-center space-x-2'>
                <MapPin className="h-4 w-4 text-blue-600" />
                <p className="text-gray-600">LG Floor</p>
                </div>
                <p className="text-gray-600">8 Shepherds Bush Road</p>
                <p className="text-gray-600">London W6 7PJ</p>
                <p className="text-gray-600">United Kingdom</p>
                
              </li>
            </ul>
          </div>

       
        </div>

        <div className="border-t mt-8 pt-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} Open Science Press. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;