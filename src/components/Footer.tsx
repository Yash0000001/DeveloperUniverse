import manOnFountain from "@/app/manOnMountain.png";
import Image from "next/image";

const Footer = () => {
  return (
    <footer className="relative bg-[#120727] text-gray-300 py-8 border-t-2">
      <div className="absolute inset-0">
        <Image
          src={manOnFountain}
          alt="Background Image"
          className="w-full h-full object-cover opacity-30"
          width={800}
          height={800}
        />
        <div className="bg-gradient-to-t from-[#120727] to-transparent opacity-75 w-full "></div>
      </div>

      <div className="mx-auto px-6 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div className="">
            <h4 className="text-2xl font-bold mb-4">Developer Universe</h4>
            <p className="text-lg">
              Join a global community of developers, learn in real-time, and get
              recognized for your contributions. Developer Universe is your
              go-to platform for innovation and growth.
            </p>
          </div>

          {/* Navigation Links */}
          <div>
            <h4 className="text-2xl font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/events" className="hover:underline text-xl">
                  Events
                </a>
              </li>
              <li>
                <a href="/leaderboard" className="hover:underline text-xl">
                  Leaderboard
                </a>
              </li>
              <li>
                <a href="/discussion" className="hover:underline text-xl">
                  Discussion Forum
                </a>
              </li>
              <li>
                <a href="/dashboard" className="hover:underline text-xl">
                  Dashboard
                </a>
              </li>
            </ul>
          </div>

          {/* Social Media & Contact */}
          <div>
            <h4 className="text-2xl font-bold mb-4">Stay Connected</h4>
            <p className="text-xl mb-4">
              Follow us on social media and stay updated!
            </p>
            <div className="flex space-x-4">
              <a href="#" className="hover:text-white transition-colors">
                <Image
                  src="/icons/twitter.svg"
                  alt="Twitter"
                  width={100}
                  height={100}
                  className="w-6 h-6"
                />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Image
                  src="/icons/linkedin.svg"
                  alt="LinkedIn"
                  width={100}
                  height={100}
                  className="w-6 h-6"
                />
              </a>
              <a href="#" className="hover:text-white transition-colors">
                <Image
                  src="/icons/github.svg"
                  alt="GitHub"
                  width={100}
                  height={100}
                  className="w-6 h-6"
                />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-600 mt-8 pt-4 text-center text-sm">
          <p>&copy; 2024 Developer Universe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
