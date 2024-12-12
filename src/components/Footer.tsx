import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  MapPin,
  Phone,
  Palette,
  ShoppingBag,
  Info,
  HeadphonesIcon,
  CreditCard,
  Truck,
  Users,
  Heart,
} from "lucide-react";
import React from 'react';
const Footer = () => {
  const footerSections = {
    shop: {
      title: "Shop",
      icon: <ShoppingBag className="inline w-4 h-4 mr-2" />,
      links: [
        "Paintings",
        "Sculptures",
        "Digital Art",
        "Photography",
        "Limited Editions",
      ],
    },
    about: {
      title: "About",
      icon: <Info className="inline w-4 h-4 mr-2" />,
      links: [
        "Our Story",
        "Artists Community",
        "Gallery Locations",
        "Exhibition Space",
        "Press & Media",
      ],
    },
    support: {
      title: "Support",
      icon: <HeadphonesIcon className="inline w-4 h-4 mr-2" />,
      links: [
        "Contact Us",
        "Shipping Info",
        "Returns Policy",
        "Payment Options",
        "FAQ",
      ],
    },
  };

  const socialLinks = [
    { icon: <Facebook className="w-5 h-5" />, href: "#", label: "Facebook" },
    { icon: <Instagram className="w-5 h-5" />, href: "#", label: "Instagram" },
    { icon: <Twitter className="w-5 h-5" />, href: "#", label: "Twitter" },
  ];

  const contactInfo = [
    {
      icon: <Mail className="w-4 h-4" />,
      text: "contact@artsshop.com",
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      text: "123 Gallery Street, Art District",
    },
    {
      icon: <Phone className="w-4 h-4" />,
      text: "+1 (555) 234-5678",
    },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="px-4 py-12 mx-auto max-w-7xl sm:px-6">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Palette className="h-6 w-6 text-[#094129]" />
              <h4 className="font-bold text-xl text-[#094129]">ArtsShop</h4>
            </div>
            <p className="text-gray-600">
              Connecting artists with art lovers worldwide. Discover unique
              artworks from emerging and established artists.
            </p>

            {/* Contact Information */}
            <div className="pt-4 space-y-2">
              {contactInfo.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-2 text-gray-600"
                >
                  {item.icon}
                  <span>{item.text}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Navigation Sections */}
          {Object.entries(footerSections).map(([key, section]) => (
            <div key={key}>
              <h4 className="font-bold text-[#094129] mb-4 flex items-center">
                {section.icon}
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, index) => (
                  <li key={index}>
                    <a
                      href="#"
                      className="text-gray-600 hover:text-[#094129] transition-colors duration-200"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Social Links & Copyright */}
        <div className="pt-8 mt-12 border-t">
          <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
            <div className="flex items-center gap-6">
              {socialLinks.map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="text-gray-600 hover:text-[#094129] transition-colors duration-200"
                  aria-label={social.label}
                >
                  {social.icon}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-4 text-gray-600">
              <span>Payment Partners:</span>
              <CreditCard className="w-5 h-5" />
              <Truck className="w-5 h-5" />
              <Users className="w-5 h-5" />
              <Heart className="w-5 h-5" />
            </div>

            <p className="text-gray-600">
              &copy; {new Date().getFullYear()} ArtsShop. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
