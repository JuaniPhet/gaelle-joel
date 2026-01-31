/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ["./index.html", "./app.js"],
    theme: {
        extend: {
            colors: {
                primary: {
                    DEFAULT: '#3854b7',
                    light: '#5d78d3',
                    lighter: '#99ceff',
                },
                secondary: {
                    DEFAULT: '#feb28e',
                    light: '#ffd5c5',
                },
                dark: '#1a1a2e',
                'light-bg': '#fafbfc',
                'gray-light': '#e5e7eb',
            },
            fontFamily: {
                heading: ['"Cormorant Garamond"', 'serif'],
                body: ['"Montserrat"', 'sans-serif'],
            },
            container: {
                center: true,
                padding: '2rem',
                screens: {
                    sm: '600px',
                    md: '728px',
                    lg: '984px',
                    xl: '1200px',
                    '2xl': '1200px',
                },
            },
        },
    },
    plugins: [],
}
