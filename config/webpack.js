const resolve = require('resolve')
const getCSSModuleLocalIdent = require('react-dev-utils/getCSSModuleLocalIdent')

// common function to get style loaders
const getStyleLoaders = (cssOptions, preProcessor) => {
  const loaders = [
    require.resolve('style-loader'),
    {
      loader: require.resolve('css-loader'),
      options: cssOptions,
    },
    {
      // Options for PostCSS as we reference these options twice
      // Adds vendor prefixing based on your specified browser support in
      // package.json
      loader: require.resolve('postcss-loader'),
      options: {
        // Necessary for external CSS imports to work
        // https://github.com/facebook/create-react-app/issues/2677
        ident: 'postcss',
        plugins: () => [
          require('postcss-flexbugs-fixes'),
          require('postcss-preset-env')({
            autoprefixer: {
              flexbox: 'no-2009',
            },
            stage: 3,
          }),
        ],
      },
    },
  ]
  if (preProcessor) {
    loaders.push(require.resolve(preProcessor))
  }
  return loaders
}

module.exports = {
  addCoffeePugSupport: () => config => {
    const rules = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf
    rules.unshift({
      test: /\.coffee$/,
      use: [ 
        {
          loader: 'coffee-loader',
          options: { 
            transpile: {
              "plugins": [
                'transform-react-pug-coffee',
                ["@babel/plugin-transform-react-jsx", {
                  "pragma": "React.createElement",
                  "pragmaFrag": "React.Fragment",
                  "throwIfNamespace": false
                }]
              ]
            }
          }
        }
      ]
    })
    return config
  },

  addStylusSupport: () => config => {
    const rules = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf
    rules.unshift({
      test: /\.module\.styl$/,
        use: getStyleLoaders(
          {
            importLoaders: 2,
            modules: true,
            getLocalIdent: getCSSModuleLocalIdent,
          },
          'stylus-loader'
        ),
    })
    rules.unshift({
      test: /\.styl$/,
      exclude: /\.module\.styl$/,
      use: getStyleLoaders({ importLoaders: 2 }, 'stylus-loader'),
    })
    return config
  }
}