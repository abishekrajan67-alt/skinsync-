import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-br from-espresso via-dark-sienna to-espresso text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🎨</span>
              <span className="font-serif text-xl font-bold">Skin Sync</span>
            </div>
            <p className="text-primary-200 text-sm leading-relaxed">
              India's #1 shade matching tool. Find your perfect foundation, concealer, and skin tint shades across 10+ beauty brands.
            </p>
            <div className="flex gap-4 mt-6">
              {["facebook", "instagram", "youtube", "twitter"].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors">
                  <span className="text-sm font-medium capitalize">{social.charAt(0).toUpperCase()}</span>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Explore</h3>
            <ul className="space-y-3">
              <li><Link to="/quiz" className="text-primary-200 hover:text-white text-sm transition-colors">Shade Quiz</Link></li>
              <li><Link to="/learn" className="text-primary-200 hover:text-white text-sm transition-colors">Learn About Undertones</Link></li>
              <li><Link to="/learn#brands" className="text-primary-200 hover:text-white text-sm transition-colors">Brands We Match</Link></li>
              <li><Link to="/learn#faq" className="text-primary-200 hover:text-white text-sm transition-colors">FAQs</Link></li>
              <li><Link to="/learn#blog" className="text-primary-200 hover:text-white text-sm transition-colors">Blog</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Supported Brands</h3>
            <ul className="space-y-3 text-sm text-primary-200">
              <li>Maybelline New York</li>
              <li>L'Oréal Paris</li>
              <li>Lakmé</li>
              <li>M·A·C Cosmetics</li>
              <li>Sugar Cosmetics</li>
              <li>Nykaa Cosmetics</li>
              <li>Fenty Beauty</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Get in Touch</h3>
            <ul className="space-y-3 text-sm text-primary-200">
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                hello@skinsync.in
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                Mumbai, Maharashtra, India
              </li>
              <li className="mt-4">
                <p className="text-xs text-primary-300">This site contains affiliate links. We may earn a commission when you purchase through our links.</p>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 mt-10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-primary-300 text-sm">&copy; 2026 Skin Sync. All rights reserved.</p>
          <div className="flex items-center gap-4 text-primary-300 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>|</span>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
