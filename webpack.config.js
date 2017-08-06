var path = require("path");

var DIST_DIR   = path.join(__dirname, "bin"); 
var CLIENT_DIR = path.join(__dirname, "src/scripts");

module.exports = {  
    context: CLIENT_DIR,
	entry: {
    index: './index.js',
	login: './login.js',
	},

    output: {
        path:     DIST_DIR,
        filename: '[name].bundle.js'
		//Names of chunks assigned for respective bundles.
    },

    resolve: {
        extensions: ['.js']
    },
	module: {
		 /*rules:[{*/
         loaders: [
		 {
             test: /\.jsx?$/,
             //exclude: /node_modules/,
             loader: 'babel-loader',
			 
			 query: {
               presets: ['es2015', 'react']
			   
               }
			
         },
		
		 {
			 test:/\.(jpg|jpeg|png|gif|svg)$/,
			 use: [
			 {
			 loader: 'file-loader',
			 options:{
			  name:'[name].[ext]',
			  outputPath:'images/',
			 // publicPath:'img/'
			 }
			 }
			 ]
		 },
		      
		 
		 {
               test: /\.html$/,
               loader: 'html-loader',
         }
		 
		 ]
		}
	
};