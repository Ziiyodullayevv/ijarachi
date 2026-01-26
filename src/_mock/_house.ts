import { CONFIG } from 'src/global-config';

import { _mock } from './_mock';

// 🧩 Random tartibda, lekin takrorlanmas indexlar yaratish
function uniqueRandomIndexes(total: number, count: number): number[] {
  const indexes = Array.from({ length: total }, (_, i) => i);
  for (let i = indexes.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [indexes[i], indexes[j]] = [indexes[j], indexes[i]];
  }
  return indexes.slice(0, count);
}

// 🏠 Bitta shahar uchun 16 ta uy yaratish
function generateHouses(houseCount: number, totalImages: number) {
  const randomIndexes = uniqueRandomIndexes(totalImages, houseCount);

  return Array.from({ length: houseCount }, (_, i) => ({
    title: _mock.houseTitle(i),
    hostType: _mock.hostType(i),
    pricePerNight: _mock.number.pricePerNight(i),
    totalPrice: _mock.number.price(i),
    nights: _mock.number.nativeS(i),
    rating: _mock.number.rating(i),
    // endi har biriga unikal rasm
    coverUrl: `${CONFIG.assetsDir}/assets/images/mock/house/house-${randomIndexes[i] + 1}.webp`,
  }));
}

// 🌆 8 ta shahar uchun 16 tadan uy
export const housesByCity = Array.from({ length: 8 }, (_, index) => ({
  id: _mock.id(index),
  title: `Popular homes in ${_mock.countryNames(index)}`,
  data: generateHouses(16, 16), // (uy soni, mavjud rasm soni)
}));
