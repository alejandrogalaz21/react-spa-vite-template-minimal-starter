// src/features/shared/hoc/withRightPane.tsx
import React from 'react';
import { MultiAlert } from '@/features/shared/components/MultiAlert';
import { NotFound } from '@/features/shared/components/NotFound';
import { SkeletonView } from '@/features/shared/components/SkeletonView';
import { LoadingOverlay } from '@/features/shared/components/LoadingOverlay';


/**
 * Higher-Order Component used to wrap right-pane views inside a layout.
 *
 * It standardizes:
 * - Loading overlay
 * - Skeletons
 * - Multi alerts
 * - Not found views
 * - Layout consistency for right-pane screens
 *
 * @template P - Props of the wrapped component
 * @param WrappedComponent - React component representing the main content of the view.
 */
export function withRightPane<P extends object>(WrappedComponent: React.ComponentType<P>) {
  const ComponentWithRightPane: React.FC<P & { adapter: any }> = (props) => {
    const { adapter } = props;

    // Adapter exposed values (Facade / Adapter pattern)
    const { data, isLoading, isFetching, hasError, alerts, notFound } = adapter;

    // 1. Loading overlay
    if (isLoading) {
      return <LoadingOverlay />;
    }

    // 2. Skeleton for slow fetches
    if (isFetching && !data) {
      return <SkeletonView />;
    }

    // 3. Not found
    if (notFound) {
      return <NotFound message="No se encontraron resultados." />;
    }

    return (
      <div style={{ padding: 24 }}>
        {/* 4. Multi alert */}
        {alerts?.length > 0 && <MultiAlert alerts={alerts} />}

        {/* 5. Error fallback */}
        {hasError && (
          <MultiAlert alerts={[{ type: 'error', message: 'Ocurrió un error inesperado.' }]} />
        )}

        {/* 6. Render the actual view */}
        {data && <WrappedComponent {...(props as P)} />}
      </div>
    );
  };

  ComponentWithRightPane.displayName = `withRightPane(${WrappedComponent.displayName || WrappedComponent.name})`;

  return ComponentWithRightPane;
}
