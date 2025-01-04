import { Outlet } from 'react-router-dom'
import { Navbar } from './Navbar'

export function MainLayout() {
  return (
    <div className="min-h-screen bg-black">
      {/* Background Layers */}
      <div className="fixed inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa')] bg-cover opacity-5" />
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMjAgMjBMNDAgMjBNMjAgMjBMMjAgNDBNMjAgMjBMMCwyME0yMCAyMEwyMCAwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wMykiIHN0cm9rZS13aWR0aD0iMC41Ii8+PC9zdmc+')] opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-black" />
      </div>
      
      {/* Content */}
      <Navbar />
      <main className="relative pt-16 z-10 fade-in">
        <Outlet />
      </main>
      
      {/* Decorative Elements */}
      <div className="fixed top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="fixed bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  )
}