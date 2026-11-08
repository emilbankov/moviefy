export function handleImageError(event, fallbackSrc = '/images/no-image.jpg') {
    const img = event.currentTarget;
    const fallbackUrl = new URL(fallbackSrc, img.ownerDocument.baseURI).href;

    // React still calls onError if the fallback fails; avoid assigning it again.
    if (img.src !== fallbackUrl) {
        img.src = fallbackSrc;
    }
}
