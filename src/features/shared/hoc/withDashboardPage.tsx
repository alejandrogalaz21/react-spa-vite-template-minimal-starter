import React from 'react';
import { Helmet } from 'react-helmet-async';
import { DashboardContent } from 'src/layouts/dashboard';
import { Grid } from '@mui/material';
import { CONFIG } from '@/config-global';
// import { CustomBreadcrumbs } from '@/components/custom-breadcrumbs/custom-breadcrumbs';
import { MultiAlertContainer } from '@/features/shared/components/MultiAlert';

interface PageOptions {
  title: string;
  description?: string;
  actionBtn?: React.ReactNode;
  links: Array<{ name: string; href: string }>;
  loader?: React.ComponentType<{ children: React.ReactNode }>;
}

/**
 * 🎨 Higher-Order Component (HOC) that wraps a view component with dashboard page layout and metadata
 *
 * @description
 * 🔧 This HOC provides a consistent dashboard page structure including:
 * - 📄 SEO metadata via React Helmet
 * - 🎯 Dashboard content wrapper
 * - 🚨 Multi-alert container for notifications
 * - 📦 Grid container for layout
 * - ⏳ Optional loader wrapper component
 *
 * @template P - 🎭 Props type for the wrapped component (must extend object)
 *
 * @param {React.ComponentType<P>} ViewComponent - 🧩 The component to be wrapped with dashboard layout
 * @param {PageOptions} options - ⚙️ Configuration options for the dashboard page
 * @param {string} options.title - 📝 Page title displayed in browser tab and page heading
 * @param {string} [options.description] - 📋 Optional meta description for SEO (defaults to empty string)
 * @param {React.ReactNode} [options.actionBtn] - 🔘 Optional action button to display in page header
 * @param {Array<{name: string, href: string}>} options.links - 🔗 Breadcrumb navigation links
 * @param {React.ComponentType<{children: React.ReactNode}>} [options.loader] - ⏳ Optional loader wrapper component (defaults to passthrough fragment)
 *
 * @returns {React.FC<P>} 🎁 Enhanced component with dashboard page layout and metadata
 *
 * @example
 * ```tsx
 * // 📚 Usage example
 * const MyDashboardView = ({ data }: { data: string }) => <div>{data}</div>;
 *
 * const MyDashboardPage = withDashboardPage(MyDashboardView, {
 *   title: 'My Dashboard',
 *   description: 'Dashboard overview page',
 *   links: [
 *     { name: 'Home', href: '/' },
 *     { name: 'Dashboard', href: '/dashboard' }
 *   ]
 * });
 * ```
 */
export function withDashboardPage<P extends object>(
  ViewComponent: React.ComponentType<P>,
  options: PageOptions
) {
  const {
    title,
    description = '',
    loader: LoaderWrapper = ({ children }) => <>{children}</>,
  } = options;

  const Page: React.FC<P> = (props) => {
    const metadataTitle = `${title}: ${CONFIG.site.name}`;

    return (
      <>
        <Helmet>
          <title>{metadataTitle}</title>
          <meta name="description" content={description} />
        </Helmet>

        <DashboardContent>
          <MultiAlertContainer />
          {/* <CustomBreadcrumbs heading={title} links={options.links} sx={{ mb: { xs: 3, md: 5 } }} /> */}
          <Grid container>
            <LoaderWrapper>
              <ViewComponent {...props} />
            </LoaderWrapper>
          </Grid>
        </DashboardContent>
      </>
    );
  };

  Page.displayName = `withDashboardPage(${ViewComponent.displayName || ViewComponent.name})`;

  return Page;
}
