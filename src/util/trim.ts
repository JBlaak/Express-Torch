/**
 * Trim slashes of the left of a string
 * @param str
 * @returns {string}
 */
export function trim(str: string): string {
    return str.replace(/^\/|\/$/g, '');
}
