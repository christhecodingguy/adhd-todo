export function confirm(message) {
    // eslint-disable-next-line no-restricted-globals
    return new Promise((resolve) => {
        const confirmed = window.confirm(message);
        resolve(confirmed);
    });
}