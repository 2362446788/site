const DEFAULT_SITE_URL = "https://xzztao.com";

function normalizeSiteUrl(value: string) {
  return value.replace(/\/+$/, "");
}

function getConfiguredSiteUrl() {
  const candidate = process.env.NEXT_PUBLIC_SITE_URL ?? process.env.SITE_URL;

  if (!candidate) {
    return DEFAULT_SITE_URL;
  }

  try {
    return normalizeSiteUrl(new URL(candidate).toString());
  } catch {
    return DEFAULT_SITE_URL;
  }
}

export function getSiteUrl() {
  return getConfiguredSiteUrl();
}

export function getSiteUrlObject() {
  return new URL(getConfiguredSiteUrl());
}

export function createSiteUrl(pathname: string) {
  return new URL(pathname, getConfiguredSiteUrl()).toString();
}
