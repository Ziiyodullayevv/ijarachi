import { CONFIG } from 'src/global-config';

import StructureView from 'src/sections/become-host/view/structure-view';

const metadata = { title: `Structure - ${CONFIG.appName}` };
export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <StructureView />
    </>
  );
}
