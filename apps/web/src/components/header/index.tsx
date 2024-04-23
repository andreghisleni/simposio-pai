import Image from 'next/image'

import GClinicLogo from '@/assets/simposio-pai-logo.svg'

import { Separator } from '../ui/separator'
import { MenuLink } from './menu-link'
import { ThemeSwitcher } from './theme-switcher'
import { UserProfileButton } from './user-profile-button'

export function Header() {
  return (
    <div className="border-b">
      <div className="flex items-center justify-between px-8">
        <div className="flex items-center space-x-4">
          <Image
            src={GClinicLogo}
            alt="gl"
            className="h-8"
            width={78.74}
            height={24}
          />

          <Separator orientation="vertical" className="h-6" />

          <nav className="flex items-center space-x-2 lg:space-x-3">
            <MenuLink href="/dashboard">Dashboard</MenuLink>
            <MenuLink href="/schedule">Agenda</MenuLink>
            <MenuLink href="/clients">Pacientes</MenuLink>
            {/* <MenuLink href="/months">Meses</MenuLink>
            <MenuLink href="/uploads">Uploads</MenuLink> */}
          </nav>
        </div>

        <div className="flex items-center space-x-4">
          {/* <Search />

          <Separator orientation="vertical" className="h-6" />

          <Button size="sm" asChild>
            <Link href="/upload">
              <PlusCircle className="mr-2 size-4" />
              Upload video
            </Link>
          </Button>

          <Separator orientation="vertical" className="h-6" /> */}

          <ThemeSwitcher />
          <UserProfileButton />
        </div>
      </div>
    </div>
  )
}
