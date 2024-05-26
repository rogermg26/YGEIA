'use client'

import {
  UserGroupIcon,
  HomeIcon,
  BuildingOffice2Icon,
  ChartBarIcon,
  GlobeAltIcon,
  ArrowTrendingUpIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Mapa dels links per a mostrar a la Barra de Navegació
const links = [
  { name: 'Visió Global', href: '/dashboard', icon: HomeIcon },
  { name: 'Visió Local', href: '/dashboard/visiolocal', icon: UserGroupIcon },
  { name: 'Comparativa Municipis', href: '/dashboard/comparativa', icon: BuildingOffice2Icon },
  { name: 'Anàlisi Determinants', href: '/dashboard/estadistica', icon: ChartBarIcon },
  { name: 'Predicció', href: '/dashboard/prediccio', icon: ArrowTrendingUpIcon },
  
];

export default function NavLinks() {
const pathname = usePathname()  
  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon;
        return (
          /**Amb Link aconseguim que no es recarregui cada vegada la pàgina quan canviem de pestanya! */
          <Link
            key={link.name}
            href={link.href}
            className={`flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-100 p-3 text-sm font-medium hover:bg-orange-100 hover:text-black md:flex-none md:justify-start md:p-2 md:px-3
            
            ${pathname == link.href ? 'bg-orange-100 text-black' : ''}
            `}
          >
            <LinkIcon className="w-6" />
            <p className="hidden md:block">{link.name}</p>
          </Link>
        );
      })}
    </>
  );
}
