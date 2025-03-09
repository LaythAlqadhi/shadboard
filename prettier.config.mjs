/** @type {import('prettier').Config} */
const config = {
  plugins: [
    "prettier-plugin-tailwindcss",
    "@ianvs/prettier-plugin-sort-imports",
  ],
  semi: false,
  singleQuote: false,
  trailingComma: "es5",
  printWidth: 80,
  tabWidth: 2,
  bracketSpacing: true,
  arrowParens: "always",
  endOfLine: "lf",
  tailwindStylesheet: "./src/app/globals.css",
  tailwindConfig: "./tailwind.config.ts",
  tailwindFunctions: ["cn", "clsx"],
  importOrder: [
    "<BUILTIN_MODULES>",
    "",
    "^(react/(.*)$)|^(react$)",
    "^(react-dom/(.*)$)|^(react-dom$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "^(lucide-react/(.*)$)|^(lucide-react$)",
    "^(react-icons/(.*)$)|^(react-icons$)",
    "",
    ".css$",
    "",
    "/(_data|data)/(.*)$",
    "",
    "/(_schemas|schemas)/(.*)$",
    "",
    "<TYPES>^(node:)",
    "<TYPES>",
    "<TYPES>^[.]",
    "/types(.*)$",
    "",
    "/configs/(.*)$",
    "/lib/(.*)$",
    "",
    "/(_hooks|hooks)/(.*)$",
    "/(_contexts|contexts)/(.*)$",
    "/(_providers|providers)/(.*)$",
    "^@/components/ui/(.*)$",
    "/(_components|components)/(.*)$",
    "[.]",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.0.0",
}

export default config
