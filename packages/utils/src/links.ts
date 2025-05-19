export function appendWithBaseUrl(url: string): string {
  const baseUrl = process.env.BASE_URL || '';
  const cleanBaseUrl = baseUrl.replace(/\/$/, '');
  const cleanUrl = url.replace(/^\//, '');

  return `${cleanBaseUrl}/${cleanUrl}`;
}
