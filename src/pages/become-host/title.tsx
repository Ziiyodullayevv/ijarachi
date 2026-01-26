import { CONFIG } from 'src/global-config';

import TitleView from 'src/sections/become-host/view/title-view';

const metadata = { title: `Title - ${CONFIG.appName}` };

export default function Page() {
  return (
    <div>
      <title>{metadata.title}</title>

      <TitleView />
    </div>
  );
}
