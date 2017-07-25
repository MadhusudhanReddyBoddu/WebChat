var path = require("path");

var DIST_DIR   = path.join(__dirname, "bin"); 
var CLIENT_DIR = path.join(__dirname, "src/scripts");

module.exports = {  
    context: CLIENT_DIR,
	entry: {
    index: './index.js',
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
         loaders: [{
             test: /\.jsx?$/,
             //exclude: /node_modules/,
             loader: 'babel-loader',
			 
			 query: {
               presets: ['es2015', 'react']
			   
            }
			
         }]
		}
	
};