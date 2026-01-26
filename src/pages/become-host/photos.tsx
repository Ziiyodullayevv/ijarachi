import { CONFIG } from 'src/global-config';

import PhotosView from 'src/sections/become-host/view/photos-view';

const metadata = { title: `Photos - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <PhotosView />
    </>
  );
}
