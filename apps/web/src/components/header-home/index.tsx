import { Container } from '../my-ui/container'
import { Separator } from '../ui/separator'
import { MenuLink } from './menu-link'
import { ThemeSwitcher } from './theme-switcher'

export function HeaderHome() {
  return (
    <div className="border-b">
      <Container>
        <div className="mt-8 flex flex-col items-center gap-4 px-8">
          <h1 className="text-4xl font-bold">
            XI Simpósio Catarinense de Astronomia
          </h1>
          <div className="flex items-center space-x-4">
            <nav className="flex items-center space-x-2 lg:space-x-3">
              <MenuLink href="/">home</MenuLink>
              <MenuLink href="/presentation">Apresentação</MenuLink>
              <MenuLink href="/schedule">Programação</MenuLink>
              <MenuLink href="/contact">Contato</MenuLink>
            </nav>

            <Separator orientation="vertical" className="h-6" />
            <ThemeSwitcher />
          </div>
        </div>
      </Container>
    </div>
  )
}
