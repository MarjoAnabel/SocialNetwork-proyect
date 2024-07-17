const basicInfo = require('./basicinfo')
const components = require('./components')
const posts = require('./posts')
module.exports = {
 ...basicInfo,
 ...components,
 ...posts,
}
