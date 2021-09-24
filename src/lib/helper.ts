export function basename(str: string): string {
    return str.substr(str.lastIndexOf('/') + 1);
}
