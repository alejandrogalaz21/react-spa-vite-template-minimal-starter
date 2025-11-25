import 'src/global.css';

import { Provider } from 'react-redux';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { Router } from 'src/routes/sections';

import { useScrollToTop } from 'src/hooks/use-scroll-to-top';

import store from 'src/redux/store';
import { ThemeProvider } from 'src/theme/theme-provider';

import { ProgressBar } from 'src/components/progress-bar';
import { MotionLazy } from 'src/components/animate/motion-lazy';
import { SettingsDrawer, defaultSettings, SettingsProvider } from 'src/components/settings';

import { AuthProvider } from 'src/auth/context/jwt';

/**
 * Create a React Query client instance
 * @type {QueryClient}
 */
const queryClient = new QueryClient();

/**
 * Main App component
 * @returns {JSX.Element}
 */
export default function App(): JSX.Element {
  useScrollToTop();

  return (
    <Provider store={store}>
      <AuthProvider>
        <SettingsProvider settings={defaultSettings}>
          <ThemeProvider>
            <QueryClientProvider client={queryClient}>
              <MotionLazy>
                <ProgressBar />
                <SettingsDrawer />
                <Router />
              </MotionLazy>
              {import.meta.env.DEV && <ReactQueryDevtools initialIsOpen={false} />}
            </QueryClientProvider>
          </ThemeProvider>
        </SettingsProvider>
      </AuthProvider>
    </Provider>
  );
}
