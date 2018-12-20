const {
  override,
  overrideDevServer,
  watchAll
} = require("customize-cra")

const coffeeRegex = /\.coffee$/

const addCoffeeScriptSupport = () => config => {
  const rules = config.module.rules.find(rule => Array.isArray(rule.oneOf)).oneOf
  rules.unshift({
    test: coffeeRegex,
    use: [ 
      {
        loader: 'coffee-loader',
        options: { 
          transpile: {
            "plugins": [
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
  console.log(JSON.parse(JSON.stringify(config).replace(/js,jsx,ts,tsx/g, 'js,jsx,ts,tsx,coffee')))
  return JSON.parse(JSON.stringify(config).replace(/js,jsx,ts,tsx/g, 'js,jsx,ts,tsx,coffee'))
}

module.exports = {
  webpack: override(
    addCoffeeScriptSupport()
  ),
  jest: override(
    addCoffeeScriptToTest()
  ),
  devServer: overrideDevServer(
    watchAll()
  )
}