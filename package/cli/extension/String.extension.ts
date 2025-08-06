import { file } from "bun";

// String Extensions for TypeScript
declare global {
  interface String {
    /**
     * Converts kebab-case string to camelCase
     * @example "my-prop-name".toCamelCase() // "myPropName"
     */
    toCamelCase(): string;

    /**
     * Converts camelCase string to kebab-case
     * @example "myPropName".toKebabCase() // "my-prop-name"
     */
    toKebabCase(): string;

    /**
     * Converts string to PascalCase
     * @example "my-prop-name".toPascalCase() // "MyPropName"
     */
    toPascalCase(): string;

    /**
     * Converts string to snake_case
     * @example "myPropName".toSnakeCase() // "my_prop_name"
     */
    toSnakeCase(): string;

    /**
     * Capitalizes the first letter of the string
     * @example "hello world".capitalize() // "Hello world"
     */
    capitalize(): string;

    /**
     * Checks if string is empty or only whitespace
     * @example "   ".isBlank() // true
     */
    isBlank(): boolean;

    /**
     * Truncates string to specified length with optional suffix
     * @example "Hello World".truncate(5) // "Hello..."
     */
    truncate(length: number, suffix?: string): string;

    /**
     * Removes all whitespace from string
     * @example "h e l l o".removeWhitespace() // "hello"
     */
    removeWhitespace(): string;

    /**
     * Counts occurrences of substring in string
     * @example "hello world hello".countOccurrences("hello") // 2
     */
    countOccurrences(substring: string): number;

    /**
     * Removes all quotation marks (single and double) from string
     * @example '"hello world"'.removeQuotes() // "hello world"
     */
    removeQuotes(): string;

    /**
     * Converts "class" to "className" for JSX compatibility
     * @example "class".toJSXAttribute() // "className"
     */
    toJSXAttribute(): string;

  }
}

// Implementation of string extensions
String.prototype.toCamelCase = function (): string {
  return this.replace(/-([a-z])/g, (match, letter) => letter.toUpperCase());
};

String.prototype.toKebabCase = function (): string {
  return this.replace(/([a-z])([A-Z])/g, "$1-$2").toLowerCase();
};

String.prototype.toPascalCase = function (): string {
  return this.replace(/(^|-)([a-z])/g, (match, prefix, letter) =>
    letter.toUpperCase()
  );
};

String.prototype.toSnakeCase = function (): string {
  return this.replace(/([a-z])([A-Z])/g, "$1_$2").toLowerCase();
};

String.prototype.capitalize = function (): string {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

String.prototype.isBlank = function (): boolean {
  return this.trim().length === 0;
};

String.prototype.truncate = function (
  length: number,
  suffix: string = "..."
): string {
  if (this.length <= length) return this.toString();
  return this.slice(0, length) + suffix;
};

String.prototype.removeWhitespace = function (): string {
  return this.replace(/\s/g, "");
};

String.prototype.countOccurrences = function (substring: string): number {
  if (!substring) return 0;
  return (this.match(new RegExp(substring, "g")) || []).length;
};

String.prototype.removeQuotes = function (): string {
  return this.replace(/['"]/g, "");
};

String.prototype.toJSXAttribute = function (): string {
  return this === "class" ? "className" : this.toString();
};


// Export the extensions to make them available for import
export {};
