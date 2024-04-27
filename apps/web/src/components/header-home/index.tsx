import { Container } from '../my-ui/container'
import { Separator } from '../ui/separator'
import { LogoEvento } from './LogoEvento'
import { MenuLink } from './menu-link'
import { ThemeSwitcher } from './theme-switcher'

export function HeaderHome() {
  return (
    <div className="border-b">
      <Container>
        <div className="mt-8 flex flex-col items-center gap-4 px-8">
          <LogoEvento />
          <h1 className="text-center text-2xl font-bold md:text-3xl lg:text-4xl">
            XI Simpósio Catarinense de Astronomia
          </h1>
          <div className="flex flex-col items-center space-x-4 md:flex-row">
            <nav className="flex flex-col items-center space-x-2 md:flex-row lg:space-x-3">
              <MenuLink href="/">home</MenuLink>
              <MenuLink href="/presentation">Apresentação</MenuLink>
              <MenuLink href="/schedule">Programação</MenuLink>
              <MenuLink href="/contact">Contato</MenuLink>
            </nav>

            <Separator orientation="vertical" className="hidden h-6 md:block" />
            <ThemeSwitcher />
          </div>
        </div>
      </Container>
    </div>
  )
}
