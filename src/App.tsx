import React from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import { AuthProvider } from '@/hooks/use-auth';
import { ProtectedRoute } from '@/components/protected-route';
import DashboardPage from '../app/dashboard/page';

function App() {
  return (
    <div className="h-screen bg-sidebar overflow-hidden">
      <ThemeProvider defaultTheme="dark" attribute="class">
        <AuthProvider>
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        </AuthProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;