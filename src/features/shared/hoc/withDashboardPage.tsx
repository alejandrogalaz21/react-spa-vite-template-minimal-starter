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
 * 🧩 HOC to standardize dashboard pages.
 *
 * It wraps:
 * - Helmet metadata
 * - DashboardContent layout
 * - MUI Grid container
 * - Optional loader wrapper
 *
 * @example
 * export default withDashboardPage(UserProvisioningView, {
 *   title: "User Provisioning",
 *   description: "Provisioning flow for users",
 *   loader: WizardLoader
 * });
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
