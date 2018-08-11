const path = require('path');
const {styles} = require('@ckeditor/ckeditor5-dev-utils');
const CKEditorWebpackPlugin = require( '@ckeditor/ckeditor5-dev-webpack-plugin' );

module.exports = {
  entry: './app/controllers/main.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  plugins: [
    // ...
    new CKEditorWebpackPlugin({
      // See https://docs.ckeditor.com/ckeditor5/latest/features/ui-language.html
      language: 'pl'
    })
  ],
  module: {
    rules: [
      {
        test: /\.scss$/,
        use:['style-loader','css-loader','sass-loader']
      },
      {
        // Or /ckeditor5-[^/]+\/theme\/icons\/[^/]+\.svg$/ if you want to limit this loader
        // to CKEditor 5 icons only.
        test: /\.svg$/,
        use: ['raw-loader']
      },
      {
        // Or /ckeditor5-[^/]+\/theme\/[^/]+\.css$/ if you want to limit this loader
        // to CKEditor 5 theme only.
        test: /\.css$/,
        use: [{
            loader: 'style-loader',
            options: {
              singleton: true
            }
          },
          
          {
            loader: 'postcss-loader',
            options: styles.getPostCssConfig({
              themeImporter: {
                themePath: require.resolve('@ckeditor/ckeditor5-theme-lark')
              },
              minify: true
            })
          },
        ]
      },
      
    ],
  },
};