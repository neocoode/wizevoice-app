// Função utilitária para converter string em base64 (compatível com browser e Node)
export function toBase64(str: string): string {
  if (typeof Buffer !== 'undefined') {
    return Buffer.from(str, 'utf-8').toString('base64');
  }
  // Fallback para browser
  return btoa(unescape(encodeURIComponent(str)));
} 