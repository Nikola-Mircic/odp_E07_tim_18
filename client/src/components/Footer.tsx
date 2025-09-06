import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-8">
      <div className="container mx-auto px-4 text-center text-sm">
        © {new Date().getFullYear()} MyNews. Sva prava zadržana.
      </div>
    </footer>
  );
};

export default Footer;
