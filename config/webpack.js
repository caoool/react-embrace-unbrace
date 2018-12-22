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
  }
}