import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

export function SiteHeader({ currentView }: { currentView?: string }) {
  const getPageTitle = () => {
    switch (currentView) {
      case 'dashboard':
        return 'Dashboard'
      case 'playground':
        return 'Playground'
      case 'projects':
        return 'Projects'
      case 'data-library':
        return 'Data Library'
      case 'quick-create':
        return 'Quick Create'
      default:
        return 'Dashboard'
    }
  }

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1 text-white hover:text-white" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4 bg-white/20"
        />
        <h1 className="text-base font-medium text-white">{getPageTitle()}</h1>
      </div>
    </header>
  )
}