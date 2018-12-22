module.exports = {
  addCoffeeSupport: () => config => {
    const newConfig = JSON.parse(JSON.stringify(config).replace(/js,jsx,ts,tsx/g, 'js,jsx,ts,tsx,coffee'))
    newConfig.moduleFileExtensions.push('coffee')
    newConfig.transform = Object.assign({'^.+\\.coffee$': '<rootDir>/config/jestCoffeeSupport.js'}, newConfig.transform)
    return newConfig
  }
}