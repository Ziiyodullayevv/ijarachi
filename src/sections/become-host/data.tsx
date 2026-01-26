import { Iconify } from 'src/components/iconify';

export const RENT_TYPES = [
  {
    id: 'apartment',
    title: 'Kvartira (butun joy)',
    description:
      'Barcha xonalar to‘liq ijarachilar ixtiyorida bo‘ladi. Joy hech kim bilan bo‘lishilmaydi.',
    icon: <Iconify icon="custom-icon:kvartira" width={35} />,
  },
  {
    id: 'house',
    title: 'Uy (butun joy)',
    description:
      'Uy to‘liq holda ijaraga beriladi. Barcha xonalar faqat mehmonlar foydalanishi uchun.',
    icon: <Iconify icon="custom-icon:home" width={35} />,
  },
  {
    id: 'room',
    title: 'Xona',
    description:
      'Mehmonlar faqat alohida xonani ijaraga oladi. Boshqa joylar umumiy bo‘lishi mumkin.',
    icon: <Iconify icon="custom-icon:room" width={35} />,
  },
  {
    id: 'hostel',
    title: 'Hostel (umumiy xona)',
    description:
      'Mehmonlar umumiy xonada turadi va boshqa mehmonlar bilan xonani bo‘lishadi. Xodimlar doimiy mavjud.',
    icon: <Iconify icon="custom-icon:hotel" width={35} />,
  },
];
