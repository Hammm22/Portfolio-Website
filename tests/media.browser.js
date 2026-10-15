// On Vite page: await (await import('/tests/media.browser.js')).checkAudio()
export async function checkHeroImage() {
  const image = document.querySelector('#home img');
  if (!image.srcset || !image.sizes) throw new Error('Hero must provide srcSet and sizes');
  await image.decode();
  if (image.currentSrc.endsWith('/Photo.webp')) throw new Error('Hero must use a resized image');
  for (const candidate of image.srcset.split(',')) {
    const [url, width] = candidate.trim().split(/\s+/);
    const response = await fetch(url);
    const blob = await response.blob();
    const bitmap = await createImageBitmap(blob);
    if (bitmap.width !== Number.parseInt(width, 10)) throw new Error(`Incorrect width: ${url}`);
    if (blob.size >= 571578) throw new Error(`Image not smaller: ${url}`);
    bitmap.close();
  }
  return `PASS: responsive hero image (${image.currentSrc})`;
}

export async function checkShareMetadata() {
  const html = new DOMParser().parseFromString(await (await fetch('/')).text(), 'text/html');
  const title = 'Ilham Dwi Arsandy | Web Developer';
  const canonical = 'https://main.d4q1r6pqxwpp4.amplifyapp.com/';
  const meta = name => html.querySelector(`meta[property="${name}"], meta[name="${name}"]`)?.content;
  if (html.title !== title) throw new Error('Missing descriptive title');
  if (html.querySelector('link[rel="canonical"]')?.href !== canonical) throw new Error('Incorrect canonical');
  if (meta('og:url') !== canonical || meta('og:type') !== 'website') throw new Error('Missing Open Graph URL/type');
  for (const prefix of ['og', 'twitter']) {
    if (meta(`${prefix}:title`) !== title || !meta(`${prefix}:description`) || !meta(`${prefix}:image:alt`)) {
      throw new Error(`Missing ${prefix} metadata`);
    }
    const url = new URL(meta(`${prefix}:image`));
    if (url.origin !== new URL(canonical).origin) throw new Error('Share image must use canonical origin');
    const response = await fetch(url.pathname);
    if (!response.ok || !response.headers.get('content-type')?.startsWith('image/')) throw new Error('Missing share image');
  }
  if (!['summary', 'summary_large_image'].includes(meta('twitter:card'))) throw new Error('Missing Twitter card');
  return 'PASS: static SEO and share metadata';
}

export async function checkAudio() {
  const assert = (condition, message) => {
    if (!condition) throw new Error(message);
  };
  const flush = () => new Promise(resolve => setTimeout(resolve, 50));
  const audio = document.querySelector('audio');
  const button = audio.parentElement.querySelector('button');
  const originalPlay = audio.play;
  const originalPause = audio.pause;
  try {
    audio.play = () => Promise.reject(new Error('Playback blocked for regression test'));
    button.click();
    await flush();
    assert(button.textContent.includes('Audio OFF'), 'Rejected play() must leave audio OFF');
    assert(audio.preload === 'none', 'Audio must not preload');
    assert(button.getAttribute('aria-pressed') === 'false', 'Muted state must be accessible');

    let resolvePlay;
    audio.play = () => new Promise(resolve => { resolvePlay = resolve; });
    button.click();
    await flush();
    assert(button.textContent.includes('Audio OFF'), 'Pending play() must not display playing');
    assert(button.disabled, 'Pending playback must prevent duplicate clicks');
    resolvePlay();
    await flush();
    assert(button.getAttribute('aria-pressed') === 'true', 'Successful play() must enable playing state');

    audio.pause = () => audio.dispatchEvent(new Event('pause'));
    button.click();
    await flush();
    assert(button.getAttribute('aria-pressed') === 'false', 'Pause must clear playing state');
    audio.play = () => Promise.resolve();
    button.click();
    await flush();
    audio.dispatchEvent(new Event('error'));
    await flush();
    assert(button.getAttribute('aria-pressed') === 'false', 'Media error must clear playing state');
    return 'PASS: audio preload, rejection, pending, success, pause, media error';
  } finally {
    audio.play = originalPlay;
    audio.pause = originalPause;
    audio.pause();
  }
}
