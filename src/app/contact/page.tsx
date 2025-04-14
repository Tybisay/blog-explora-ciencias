'use client';

import { Mail, Linkedin } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { useEffect, useState } from 'react';

const XIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-x">
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);

export default function ContactPage() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <div className="container mx-auto py-10">
      <h1 className="text-3xl font-semibold mb-4 text-primary">Contact Us</h1>
      <p className="text-gray-700 mb-4">
        Contact us here.
      </p>

      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Contact Information</h2>
        <p className="flex items-center">
          <Mail className="mr-2 h-4 w-4 text-muted-foreground" />
          <a href="mailto:Exploraciencias@exploraciencias.com">
            Exploraciencias@exploraciencias.com
          </a>
        </p>
      </div>

      <div>
        <h2 className="text-xl font-semibold mb-2">Social Media</h2>
        <div className="flex space-x-4">
          {isMounted && (
            <>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://www.linkedin.com/company/Exploraciencias', '_blank')}
              >
                <Linkedin className="mr-2 h-4 w-4 text-muted-foreground" />
                LinkedIn/Exploraciencias
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => window.open('https://twitter.com/Exploraciencias', '_blank')}
              >
                <XIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                X/Exploraciencias
              </Button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
