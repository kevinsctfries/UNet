import React from "react";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="fixed bottom-0 left-0 w-full h-16 bg-blue-600 text-white flex items-center justify-center">
      <div className="container mx-auto px-4">
        <p className="text-center">
          © {currentYear} UNet. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
