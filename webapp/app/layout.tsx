import type { Metadata } from 'next';
import './globals.css';
import Sidebar from '@/components/Sidebar';
import { SidebarProvider } from '@/components/SidebarContext';
import MobileHeader from '@/components/MobileHeader';

const basePath = process.env.NEXT_PUBLIC_BASE_PATH || '';

export const metadata: Metadata = {
  title: 'Doggy Talents Next Wiki',
  description: 'The official wiki for Doggy Talents Next Minecraft Mod',
  icons: {
    icon: `${basePath}/images/site-favicon.ico`,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <SidebarProvider>
          <div className="app-container">
            <MobileHeader />
            <Sidebar />
            <main className="main-content">
              {children}
            </main>
          </div>
        </SidebarProvider>
      </body>
    </html>
  );
}
