export function openLink(url: string) {
  if (!url || typeof url !== "string") {
    throw new Error("[Tao Site - openLink]: Invalid URL, must be a non-empty string");
  }

  const normalizedUrl = normalizeUrl(url.trim());
  const isExternal = /^https?:\/\//.test(normalizedUrl);

  if (isExternal) {
    window.open(normalizedUrl, "_blank", "noopener,noreferrer");
    return;
  }

  window.location.assign(normalizedUrl);
}

function normalizeUrl(url: string) {
  if (/^https?:\/\//.test(url)) {
    return url;
  }

  return url;
}
