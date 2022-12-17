/** @type {import("prettier").Config} */
module.exports = {
  plugins: [require.resolve("prettier-plugin-tailwindcss")],
  importOrder: [
    "^react(.*)",
    "antd/(.*)",
    "<THIRD_PARTY_MODULES>",
    "@/(.*)",
    "^[./]",
  ],
  importOrderSeparation: true,
  importOrderSortSpecifies: true,
};
