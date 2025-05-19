import CopyWebpackPlugin from 'copy-webpack-plugin';
import dotenv from 'dotenv';
import path from 'path';
import webpack from 'webpack';

// eslint-disable-next-line no-underscore-dangle, @typescript-eslint/naming-convention
const __dirname = path.dirname(new URL(import.meta.url).pathname);

dotenv.config({ path: './.env' });

export default {
  mode: 'production',
  entry: {
    cron: './src/index.ts',
  },
  target: 'node',
  module: {
    rules: [
      {
        test: /\.tsx?$/, // supports both .ts and .tsx
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    mainFields: ['main'],
    extensions: ['.tsx', '.ts', '.js', '.json'],
  },
  plugins: [
    new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ }),
    new CopyWebpackPlugin({
      patterns: [
        { from: '.env', to: '.' },
      ],
    }),
  ],
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: 'source-map',
};
