import Link from 'next/link';
import NavLinks from './nav_links';
import { PowerIcon } from '@heroicons/react/24/outline';

export default function SideNav() {
  return (
    <div className="flex h-full flex-col">

      <Link
        className="mb-2 flex p-4 md:h-40 items-center justify-center"  style={{ backgroundColor: '#0c4160ff'}}
        href="/dashboard"
        >
        <div className="flex items-center justify-center text-white" style={{alignItems: 'center'}}>
          <img src="/YGEIA.png" alt="YGEIA" style={{ width: '150px', height: '150px'}} />
        </div>
      </Link>

      <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
        <NavLinks />
        
        <div className="hidden h-auto w-full grow rounded-md bg-gray-100 md:block"></div>
        <Link href="/">
            <button className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-orange-300 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3">
              <PowerIcon className="w-6" />
              <div className="hidden md:block">Sign Out</div>
            </button>
        </Link>

      </div>
    </div>
  );
}
