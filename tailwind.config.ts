import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./components/**/*.{js,ts,jsx,tsx,mdx}",
		"./app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	extend: {
    		colors: {
    			brand: {
    				'100': '#F1C27D',
    				DEFAULT: '#D79C5B'
    			},
    			red: '#F56A6A',
    			error: '#B84C43',
    			green: '#A2D9A4',
    			blue: '#83CFF7',
    			pink: '#F9C7D1',
    			orange: '#F1A33D',
    			light: {
    				'100': '#F0F3F6',
    				'200': '#E6E9F2',
    				'300': '#F6F8FB',
    				'400': '#FAFAFA'
    			},
    			dark: {
    				'100': '#4F4B47',
    				'200': '#3A3028'
    			},
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		fontFamily: {
    			poppins: [
    				'var(--font-poppins)'
    			]
    		},
    		boxShadow: {
    			'drop-1': '0px 10px 30px 0px rgba(66, 71, 97, 0.1)',
    			'drop-2': '0 8px 30px 0 rgba(65, 89, 214, 0.3)',
    			'drop-3': '0 8px 30px 0 rgba(65, 89, 214, 0.1)'
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			'caret-blink': {
    				'0%,70%,100%': {
    					opacity: '1'
    				},
    				'20%,50%': {
    					opacity: '0'
    				}
    			}
    		},
    		animation: {
    			'caret-blink': 'caret-blink 1.25s ease-out infinite'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
};
export default config;
