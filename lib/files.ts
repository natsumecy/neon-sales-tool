export function publisherDir(slug: string) {
  return `publishers/${slug}`;
}

export function publisherImgDir(slug: string) {
  return `public/img/${slug}`;
}

export function screenshotLightPath(slug: string) {
  return `public/img/${slug}/screenshot-light.png`;
}

export function screenshotDarkPath(slug: string) {
  return `public/img/${slug}/screenshot-dark.png`;
}

export function logoPath(slug: string) {
  return `public/img/${slug}/logo.png`;
}

export function configPath(slug: string) {
  return `publishers/${slug}/config.json`;
}

export function tokensJsonPath(slug: string) {
  return `publishers/${slug}/tokens.json`;
}

export function tokensLightCSSPath(slug: string) {
  return `publishers/${slug}/tokens.light.css`;
}

export function tokensDarkCSSPath(slug: string) {
  return `publishers/${slug}/tokens.dark.css`;
}
