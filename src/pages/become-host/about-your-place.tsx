import { CONFIG } from 'src/global-config';

import AboutYourPlaceView from 'src/sections/become-host/view/about-your-place-view';

const metadata = { title: `About Your Place - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <AboutYourPlaceView />
    </>
  );
}
