const {
  override,
  overrideDevServer,
  watchAll
} = require("customize-cra")

const coffeeRegex = /\.coffee$/

const addCoffeeScriptAndPugSupport = () => config => {
  const rules = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf
  rules.unshift({
    test: coffeeRegex,
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
}

const addCoffeeScriptToTest = () => config => {
  const newConfig = JSON.parse(JSON.stringify(config).replace(/js,jsx,ts,tsx/g, 'js,jsx,ts,tsx,coffee'))
  newConfig.moduleFileExtensions.push('coffee')
  newConfig.transform = Object.assign({'^.+\\.coffee$': '<rootDir>/config/jestCoffeePreprocessor.js'}, newConfig.transform)
  return newConfig
}

module.exports = {
  webpack: override(
    addCoffeeScriptAndPugSupport()
  ),
  jest: override(
    addCoffeeScriptToTest()
  ),
  devServer: overrideDevServer(
    watchAll()
  )
}