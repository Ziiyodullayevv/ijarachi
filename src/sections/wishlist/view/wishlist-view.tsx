import { Container } from '@mui/material';

import { WishlistCardsList } from 'src/sections/wishlist/wishlist-cards-list';

export function WishlistView() {
  return (
    <Container maxWidth="lg">
      <WishlistCardsList />
    </Container>
  );
}
