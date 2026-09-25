/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { MiniMusicPlayer } from './components/MiniMusicPlayer';

import { HomeView } from './views/HomeView';
import { ThemesView } from './views/ThemesView';
import { PortfolioView } from './views/PortfolioView';
import { MusicView } from './views/MusicView';
import { PackagesView } from './views/PackagesView';
import { ShopView } from './views/ShopView';
import { OrderWizardView } from './views/OrderWizardView';
import { CustomerAuthView } from './views/CustomerAuthView';
import { CustomerDashboardView } from './views/CustomerDashboardView';
import { InvitationLiveView } from './views/InvitationLiveView';

import { AdminLoginView } from './views/admin/AdminLoginView';
import { AdminDashboardView } from './views/admin/AdminDashboardView';

const AppContent: React.FC = () => {
  const { activeTab, setActiveTab, currentUser, logout } = useApp();

  // Handle URL changes & query parameters for direct links (e.g. ?invitation=... or ?admin=true)
  useEffect(() => {
    const handleUrl = () => {
      const params = new URLSearchParams(window.location.search);
      const path = window.location.pathname;

      if (params.get('admin') === 'true' || path.startsWith('/admin')) {
        if (currentUser?.role === 'admin' || currentUser?.role === 'super_admin') {
          setActiveTab('admin_dashboard');
        } else {
          setActiveTab('admin_login');
        }
      } else if (params.get('invitation')) {
        setActiveTab('invitation_view');
      }
    };

    handleUrl();
    window.addEventListener('popstate', handleUrl);
    return () => window.removeEventListener('popstate', handleUrl);
  }, [currentUser]);

  // 1. ISOLATED FULL LIVE DIGITAL INVITATION
  if (activeTab === 'invitation_view') {
    return <InvitationLiveView />;
  }

  // 2. ISOLATED ADMIN AREA (STRICTLY SEPARATED)
  if (activeTab === 'admin_login') {
    return <AdminLoginView />;
  }

  if (activeTab === 'admin_dashboard') {
    return <AdminDashboardView />;
  }

  // 3. PUBLIC WEBSITE & CUSTOMER DASHBOARD
  return (
    <div className="min-h-screen flex flex-col bg-[#FAF8F5] text-[#222] font-sans selection:bg-[#E2D2B0]">
      {/* Sticky Public Navbar */}
      <Navbar
        activeTab={activeTab}
        onNavigate={setActiveTab}
        currentUser={currentUser}
        onLogout={logout}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {activeTab === 'home' && <HomeView />}
        {activeTab === 'tema' && <ThemesView />}
        {activeTab === 'portfolio' && <PortfolioView />}
        {activeTab === 'musik' && <MusicView />}
        {activeTab === 'paket' && <PackagesView />}
        {activeTab === 'shop' && <ShopView />}
        {activeTab === 'order' && <OrderWizardView />}
        {activeTab === 'login' && <CustomerAuthView />}
        {activeTab === 'dashboard' && <CustomerDashboardView />}
      </main>

      {/* Public Footer */}
      <Footer onNavigate={setActiveTab} />

      {/* Persistent Floating WhatsApp (082211447129) */}
      <FloatingWhatsApp />

      {/* Persistent Mini Audio Player */}
      <MiniMusicPlayer />
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
