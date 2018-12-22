const {
  override,
  overrideDevServer,
  watchAll
} = require('customize-cra')

const { addCoffeePugSupport } = require('./config/webpack')
const { addCoffeeSupport } = require('./config/jest')
console.log(addCoffeeSupport)

module.exports = {
  webpack: override(
    addCoffeePugSupport()
  ),
  jest: override(
    addCoffeeSupport()
  ),
  devServer: overrideDevServer(
    watchAll()
  )
}