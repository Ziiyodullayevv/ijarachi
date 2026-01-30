import { CONFIG } from 'src/global-config';

import { RoomsView } from 'src/sections/rooms/view';

// ----------------------------------------------------------------------

const metadata = { title: `Room Details - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <RoomsView />
    </>
  );
}
