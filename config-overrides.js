const {
  override,
  overrideDevServer,
  watchAll
} = require('customize-cra')

const {
  addCoffeePugSupport,
  addStylusSupport } = require('./config/webpack')
const { addCoffeeSupport } = require('./config/jest')

module.exports = {
  webpack: override(
    addCoffeePugSupport(),
    addStylusSupport()
  ),
  jest: override(
    addCoffeeSupport()
  ),
  devServer: overrideDevServer(
    watchAll()
  )
}