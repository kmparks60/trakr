module.exports = {
	content: [
		'./src/**/*.{js,jsx,ts,tsx}', 
		'./src/index.css',            
		'./src/components/**/*.{js,jsx,ts,tsx}',  
		],
	theme: {
		extend: {
		colors: {
			darkBlue: '#001F3F',
			softPink: '#FFE8F0',
			brightOrange: '#FF8532',
			white: '#FFFFFF',
		},
		},
	},
	plugins: [],
}
  