export function generateUniqueId(prefix = '') {
    return prefix + Math.random().toString(36).substring(2); // .substring(2) removes "0."
}