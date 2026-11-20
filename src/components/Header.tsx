import { Link } from 'react-router-dom';

import Navbar from './Navbar';

export default function Header() {
  return (
    <header className="flex w-full items-center justify-between bg-zinc-800 p-3 text-white">
      <Link to="/about" className="text-lg font-bold">
        BN<span className="sr-only"> (Blessmore Ndlovu, home)</span>
      </Link>
      <Navbar />
    </header>
  );
}
