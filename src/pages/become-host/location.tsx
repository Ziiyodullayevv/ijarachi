import { CONFIG } from 'src/global-config';

import LocationView from 'src/sections/become-host/view/location-view';

const metadata = { title: `Location - ${CONFIG.appName}` };
export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <LocationView />
    </>
  );
}
