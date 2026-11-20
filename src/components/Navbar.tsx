import { NavLink } from 'react-router-dom';

import { Button } from '@/components/ui/button';

const navItems = [
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/blog', label: 'Blog' },
  { to: '/contact', label: 'Contact' },
];

export default function Navbar() {
  return (
    <nav aria-label="Main" className="flex items-center py-2 sm:p-4">
      <div className="flex gap-1 sm:gap-4">
        {/* NavLink sets aria-current="page" on the active route */}
        {navItems.map(({ to, label }) => (
          <Button
            key={to}
            variant="ghost"
            className="px-2 text-white underline-offset-4 hover:bg-white/10 hover:text-white aria-[current=page]:underline sm:px-2.5"
            asChild
          >
            <NavLink to={to}>{label}</NavLink>
          </Button>
        ))}
      </div>
    </nav>
  );
}
