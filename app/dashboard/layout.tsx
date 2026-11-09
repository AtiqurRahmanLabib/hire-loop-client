import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/dashboard-sidebar"

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar/>
      <main className="w-full mx-auto p-4 bg-[#131314]">
        <SidebarTrigger />
        {children}
      </main>
    </SidebarProvider>
  )
}

export default DashBoardLayout
