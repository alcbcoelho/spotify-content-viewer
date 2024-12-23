export function capitalizeStrings(strings: string[]): string {
  const capitalizedStrings: string[] = [];

  strings.forEach((str) => {
    const chars = str.split('');
    chars[0] = chars[0].toUpperCase();
    capitalizedStrings.push(chars.join(''));
  });

  return capitalizedStrings.join('\n');
}

export function hiphenize(str: string): string {
  return str.replace(/\s/g, '-');
}
