import { CONFIG } from 'src/global-config';

import AmenitiesView from 'src/sections/become-host/view/amenities-view';

const metadata = { title: `Amenities - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <AmenitiesView />
    </>
  );
}
