/**
 * Preloads images to improve loading performance
 */
export const preloadImage = (src: string): Promise<void> => {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = () => resolve();
        img.onerror = reject;
        img.src = src;
    });
};

/**
 * Preloads multiple images
 */
export const preloadImages = async (srcs: string[]): Promise<void> => {
    await Promise.all(srcs.map(src => preloadImage(src)));
};

/**
 * Preload critical images that are likely to be needed soon
 */
export const preloadCriticalImages = () => {
    // Preload images that are commonly used across pages
    const criticalImages: string[] = [
        // Add paths to your critical images here
        // Example: '/src/assets/logo.png'
    ];
    
    // Preload in the background without blocking
    preloadImages(criticalImages).catch(err => {
        console.warn('Failed to preload some images:', err);
    });
};

