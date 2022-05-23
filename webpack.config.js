const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path') //importa o path pra dentro do arquivo
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin')

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = { 
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'eval-source-map' : 'source-map',
    entry: path.resolve(__dirname, 'src', 'index.tsx'), //melhor forma de passar o caminho de uma dist pois assim impede erro de sistemos operacionais
    output: {  //Fala o arquivo que vou gerar com o webpack usando o babel
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js' //passa o nome do arquivo gerado
  },
  resolve: { //diz o nome dos arquivos que podem ser lidos
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  devServer:{
    static: path.resolve(__dirname,'public'),
    hot: true,
  },
  plugins: [
    isDevelopment && new ReactRefreshWebpackPlugin(),
    new HtmlWebpackPlugin(
      {
        template: path.resolve( __dirname, 'public', 'index.html')
      }
    )
  ].filter(Boolean),
  module: {
      rules: [
        {
          test: /\.(j|t)sx$/, //expressão regular pra saber se é js ou não 
          exclude: /node_modules/, 
          use: { 
            loader: 'babel-loader',
            options: { 
              plugins: [ 
                isDevelopment && require.resolve('react-refresh/babel')
              ].filter(Boolean)
            }
          }
      }, 
      {
        test: /\.scss$/, //expressão regular pra saber se é js ou não 
        exclude: /node_modules/, 
        use: ['style-loader', 'css-loader', 'sass-loader'],
      }         
    ],
  }
};
