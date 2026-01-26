declare global {
  interface Window {
    ymaps?: any;
  }
}

let loadingPromise: Promise<any> | null = null;

export function loadYandexMaps(apiKey: string, lang: string = 'uz_UZ'): Promise<any> {
  if (typeof window === 'undefined') return Promise.reject(new Error('No window'));
  if (window.ymaps) return Promise.resolve(window.ymaps);

  if (loadingPromise) return loadingPromise;

  loadingPromise = new Promise((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>('script[data-yandex-maps="1"]');
    if (existing) {
      existing.addEventListener('load', () => resolve(window.ymaps));
      existing.addEventListener('error', () => reject(new Error('Yandex Maps script load error')));
      return;
    }

    const script = document.createElement('script');
    script.dataset.yandexMaps = '1';
    script.src = `https://api-maps.yandex.ru/2.1/?apikey=${encodeURIComponent(apiKey)}&lang=${encodeURIComponent(lang)}`;
    script.async = true;

    script.onload = () => {
      if (!window.ymaps) reject(new Error('ymaps not found after load'));
      else resolve(window.ymaps);
    };
    script.onerror = () => reject(new Error('Failed to load Yandex Maps'));

    document.head.appendChild(script);
  });

  return loadingPromise;
}
