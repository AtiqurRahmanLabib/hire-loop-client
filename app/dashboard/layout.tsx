import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/dashboard-sidebar"
import { Toaster } from "@/components/ui/toast"

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="min-w-0 flex-1 bg-[#0a0a0a] p-2">{children}</main>
      <Toaster />
    </SidebarProvider>
  )
}

export default DashBoardLayout