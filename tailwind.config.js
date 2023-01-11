/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
		extend: {
      fontFamily: {
				'theme-1': ['DM Sans', 'sans-serif'],
			},
		},
	},
  plugins: [],
}
