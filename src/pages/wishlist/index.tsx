import { CONFIG } from 'src/global-config';

import { WishlistView } from 'src/sections/wishlist/view';

const metadata = { title: `Wishlist - ${CONFIG.appName}` };

export default function Page() {
  return (
    <>
      <title>{metadata.title}</title>

      <WishlistView />
    </>
  );
}
