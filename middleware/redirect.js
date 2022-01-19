import isHTTPS from 'is-https'
export default function (context) {
  if (context.req && context.req.headers && context.req.headers.host) {
    const host = context.req.headers.host
    const fullPath = context.route.fullPath
    const notHTTPS = isHTTPS(context.req) === false

    if (process.env.NODE_ENV !== 'development') {
      if (host !== 'www.rovara.nl') {
        // console.log('Redirect !isdev host !== rovara.nl')
        return context.redirect(301, 'https://www.rovara.nl' + fullPath)
      }
      if (notHTTPS) {
        // console.log('Redirect httpsOn')
        return context.redirect(301, 'https://' + host + fullPath)
      } else if (!host.startsWith('www')) {
        // console.log('Redirect doesnt start with www')
        return context.redirect(301, 'https://www.' + host + fullPath)
      } else if (fullPath.length > 1 && fullPath.endsWith('/')) {
        return context.redirect(301, 'https://' + host + fullPath.substring(0, fullPath.length - 1))
      }
    }
    // console.log('isDev', context.isDev)
    // console.log(context.req.headers)
    // console.log(context.route)
    // console.log('HOST', host, fullPath, httpsOn)
    // context.redirect(301, '/brand/bellroy')
  }
}
