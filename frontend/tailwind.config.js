/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite/plugin")

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite,
    require("flowbite/plugin"),
    require("tailwind-scrollbar"),
  ],
}

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
//     //require("flowbite/plugin")
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

// const flowbite = require("flowbite-react/tailwind")

// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     // ...
//     flowbite.content(),
//   ],
//   plugins: [
//     // ...
//     flowbite.plugin(),
//   ],
// }

// const flowbite = require("flowbite-react/tailwind")

// module.exports = {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "node_modules/flowbite-react/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [flowbite.plugin()],
// }
