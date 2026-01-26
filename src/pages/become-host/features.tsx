import { CONFIG } from 'src/global-config';

import FeaturesView from 'src/sections/become-host/view/features-view';

const metadata = { title: `Features - ${CONFIG.appName}` };
export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <FeaturesView />
    </>
  );
}
