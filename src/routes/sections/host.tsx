import type { RouteObject } from 'react-router';

import { Outlet } from 'react-router';
import { lazy, Suspense } from 'react';

import { HostLayout as HostLayoutComponent } from 'src/layouts/host';

import { LoadingScreen } from 'src/components/loading-screen';

const HostLayout = {
  AboutYourPlace: lazy(() => import('src/pages/become-host/about-your-place')),
  Structure: lazy(() => import('src/pages/become-host/structure')),
  Feautures: lazy(() => import('src/pages/become-host/features')),
  Amenities: lazy(() => import('src/pages/become-host/amenities')),
  Location: lazy(() => import('src/pages/become-host/location')),
  Photos: lazy(() => import('src/pages/become-host/photos')),
  Title: lazy(() => import('src/pages/become-host/title')),
  Description: lazy(() => import('src/pages/become-host/description')),
  Price: lazy(() => import('src/pages/become-host/price')),
};

export const hostRoutes: RouteObject[] = [
  {
    path: 'host',
    element: (
      <HostLayoutComponent>
        <Suspense fallback={<LoadingScreen />}>
          <Outlet />
        </Suspense>
      </HostLayoutComponent>
    ),
    children: [
      { path: ':id/about-your-place', element: <HostLayout.AboutYourPlace /> },
      { path: ':id/structure', element: <HostLayout.Structure /> },
      { path: ':id/features', element: <HostLayout.Feautures /> },
      { path: ':id/amenities', element: <HostLayout.Amenities /> },
      { path: ':id/location', element: <HostLayout.Location /> },
      { path: ':id/photos', element: <HostLayout.Photos /> },
      { path: ':id/title', element: <HostLayout.Title /> },
      { path: ':id/description', element: <HostLayout.Description /> },
      { path: ':id/price', element: <HostLayout.Price /> },
    ],
  },
];
