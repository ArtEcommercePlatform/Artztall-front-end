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

const Footer = () => {
  const footerSections = {
    shop: {
      title: "Shop",
      icon: <ShoppingBag className="h-4 w-4 inline mr-2" />,
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
      icon: <Info className="h-4 w-4 inline mr-2" />,
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
      icon: <HeadphonesIcon className="h-4 w-4 inline mr-2" />,
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
    { icon: <Facebook className="h-5 w-5" />, href: "#", label: "Facebook" },
    { icon: <Instagram className="h-5 w-5" />, href: "#", label: "Instagram" },
    { icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
  ];

  const contactInfo = [
    {
      icon: <Mail className="h-4 w-4" />,
      text: "contact@artsshop.com",
    },
    {
      icon: <MapPin className="h-4 w-4" />,
      text: "123 Gallery Street, Art District",
    },
    {
      icon: <Phone className="h-4 w-4" />,
      text: "+1 (555) 234-5678",
    },
  ];

  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
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
            <div className="space-y-2 pt-4">
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
        <div className="mt-12 pt-8 border-t">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
              <CreditCard className="h-5 w-5" />
              <Truck className="h-5 w-5" />
              <Users className="h-5 w-5" />
              <Heart className="h-5 w-5" />
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
