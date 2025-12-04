import React from 'react';
import { Instagram, Twitter, Facebook, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer: React.FC = () => {
  return (
    <footer className='bg-white pt-20 pb-10 border-t border-gray-100'>
      <div className='container-custom'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16'>
          <div className='lg:col-span-2'>
            <Link
              href='/'
              className='text-2xl font-bold tracking-tight text-text-dark  mb-6'
            >
              <span className='text-primary'>events</span>hub
            </Link>
            <p className='text-muted-foreground mb-8 max-w-sm leading-relaxed'>
              Connecting people through shared experiences. Find your community,
              explore new hobbies, and make lasting memories.
            </p>
            <div className='flex gap-4'>
              <a
                href='#'
                className='w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300'
              >
                <Instagram size={18} />
              </a>
              <a
                href='#'
                className='w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300'
              >
                <Twitter size={18} />
              </a>
              <a
                href='#'
                className='w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300'
              >
                <Facebook size={18} />
              </a>
              <a
                href='#'
                className='w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center text-muted-foreground hover:bg-primary hover:text-white transition-all duration-300'
              >
                <Linkedin size={18} />
              </a>
            </div>
          </div>

          <div>
            <h4 className='font-bold text-text-dark mb-6'>Platform</h4>
            <ul className='space-y-4'>
              <li>
                <Link
                  href='/events'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Browse Events
                </Link>
              </li>
              <li>
                <Link
                  href='/events'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Communities
                </Link>
              </li>

              <li>
                <Link
                  href='/events'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-bold text-text-dark mb-6'>Company</h4>
            <ul className='space-y-4'>
              <li>
                <Link
                  href='/about'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href='/events'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Careers
                </Link>
              </li>
              <li>
                <Link
                  href='/events'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href='/events'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className='font-bold text-text-dark mb-6'>Support</h4>
            <ul className='space-y-4'>
              <li>
                <Link
                  href='/events'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Help Center
                </Link>
              </li>
              <li>
                <Link
                  href='/events'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Safety Guidelines
                </Link>
              </li>
              <li>
                <Link
                  href='/events'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link
                  href='/events'
                  className='text-muted-foreground hover:text-primary transition-colors'
                >
                  Privacy Policy
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className='pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4'>
          <p className='text-sm text-muted-foreground'>
            © 2025 eventshub Inc. All rights reserved.
          </p>
          <div className='flex gap-8'>
            <span className='text-sm text-muted-foreground flex items-center gap-2'>
              <span className='w-2 h-2 rounded-full bg-green-500'></span>
              All systems operational
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
