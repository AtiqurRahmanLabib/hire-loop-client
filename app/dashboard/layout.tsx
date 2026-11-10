import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/dashboard-sidebar"
import { Toaster } from "@/components/ui/toast"

const DashBoardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="mx-auto w-full bg-[#131314] p-4">
        <SidebarTrigger />
        {children}
      </main>
        <Toaster />
    </SidebarProvider>
  )
}

export default DashBoardLayout
