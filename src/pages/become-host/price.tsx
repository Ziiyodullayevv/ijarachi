import { CONFIG } from 'src/global-config';

import PriceView from 'src/sections/become-host/view/price-view';

const metadata = { title: `Price - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <PriceView />
    </>
  );
}
