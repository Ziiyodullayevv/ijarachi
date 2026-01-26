import { CONFIG } from 'src/global-config';

import DescriptionView from 'src/sections/become-host/view/description-view';

const metadata = { title: `Become a Host - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <DescriptionView />
    </>
  );
}
