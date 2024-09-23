import React from 'react';
import { BsGithub, BsTwitter, BsLinkedin } from 'react-icons/bs';

const Footer = () => {
  return (
    <footer className="w-full fixed bottom-0 bg-gray-900 text-white py-3">
      <div className="flex justify-between items-center px-4">
        <span className="text-lg">
          &copy; {new Date().getFullYear()} by{' '}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-400 transition-colors"
          >
            Jan Shu Trisha
          </a>
        </span>

        {/* Social Links */}
        <div className="flex space-x-4">
          <a
            href="https://github.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition-colors"
          >
            <BsGithub size={32} />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition-colors"
          >
            <BsLinkedin size={32} />
          </a>
          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-gray-400 transition-colors"
          >
            <BsTwitter size={32} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;