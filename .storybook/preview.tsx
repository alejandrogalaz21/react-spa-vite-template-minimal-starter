import type { Preview } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import 'src/global.css';

import store from 'src/redux/store';
import { AuthProvider } from 'src/auth/context/jwt';
import { ThemeProvider } from 'src/theme/theme-provider';
import { SettingsProvider, defaultSettings } from 'src/components/settings';

const previewQueryClient = new QueryClient();

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <Provider store={store}>
        <AuthProvider>
          <SettingsProvider settings={defaultSettings}>
            <ThemeProvider>
              <QueryClientProvider client={previewQueryClient}>
                <MemoryRouter>
                  <Story />
                </MemoryRouter>
              </QueryClientProvider>
            </ThemeProvider>
          </SettingsProvider>
        </AuthProvider>
      </Provider>
    ),
  ],
};

export default preview;
