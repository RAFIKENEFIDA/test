import https from 'https'
import axios from 'axios'
const agent = new https.Agent({ rejectUnauthorized: false, keepAlive: true })
let apiURL = 'https://www.rovara.nl/api'
let isDev = false
if (process.env.NODE_ENV === 'development') {
  apiURL = 'https://dev.welivesmart.de/api'
  isDev = true
}

const months = ['Januari', 'Februari', 'Maart', 'April', 'Mei', 'Juni', 'Juli', 'Augustus', 'September', 'Oktober', 'November', 'December']
const pageLoad = async (data) => {
  await axios.post(`${apiURL}/pageload/ping`, data)
}

const getRelatedProducts = async (ean) => {
  const { data } = await axios.get(`${apiURL}/products/relatedProducts/${ean}`)
  return data
}

const getToppers = async () => {
  const { data } = await axios.get(`${apiURL}/toppers/getToppers`)
  return data
}

const updateSearch = async (update) => {
  update.$store.commit('search/updateSearch', update)
  try {
    await getListingData(update)
  } catch (e) {
    update.$store.commit('search/addSearchResult', {
      count: update.$store.state.search.count,
      products: update.$store.state.search.products,
      page: update.$store.state.search.page
    })
  }
}

const getListingData = async ({ $store, imageWidth = 200, imageHeight = 200 }) => {
  if (!$store.state.search.needsUpdate) {
    return true
  }
  let url = `${apiURL}/products/listing?page=${$store.state.search.page}&limit=${$store.state.search.limit}&sort=${$store.state.search.sortBy}&order=${$store.state.search.desc}`

  if ($store.state.search.search) {
    url = url + `&search=${$store.state.search.search}`
  }

  if ($store.state.search.brand) {
    url = url + `&brand=${$store.state.search.brand}`
  }

  if ($store.state.search.category) {
    url = url + `&category=${$store.state.search.category}`
  }

  const { data } = await axios.get(url, { httpsAgent: agent })
  const { count, products } = data
  for (const product of products) {
    // product.imageData = product.imageData.filter(i => i.downloaded !== false)
    const downloadedImages = product.imageData.filter(i => i.downloaded !== false)
    if (downloadedImages.length > 0) {
      product.image = { filename: sizeImage(downloadedImages[0].filename, imageWidth, imageHeight), originalSource: downloadedImages[0].src }
    } else if (product.imageData.length > 0) {
      product.image = { filename: sizeImage(product.imageData[0].filename, imageWidth, imageHeight), originalSource: product.imageData[0].src }
    } else {
      product.image = { filename: '', originalSource: '' }
    }
  }
  $store.commit('search/addSearchResult', { count, products, page: $store.state.search.page })
}

const getTopper = async ({ slug, imageWidth = 200, imageHeight = 200 }) => {
  const url = `${apiURL}/topper/${slug}`
  const { data } = await axios.get(url, { httpsAgent: agent })
  if (!data) {
    return false
  }
  const { products } = data
  for (const product of products) {
    product.imageData = product.imageData.filter(i => i.downloaded !== false)

    if (product.imageData.length > 0) {
      product.image = product.imageData[0].filename // sizeImage(product.imageData[0].filename, imageWidth, imageHeight)
    }
  }
  const lastUpdate = new Date(data.updatedAt)
  data.lastUpdateMonth = months[lastUpdate.getMonth()]
  data.lastUpdateYear = lastUpdate.getFullYear()
  return data
}

const sizeImage = (image, width, height, imageType = 'product') => {
  if (width) {
    return `${apiURL}/images/${imageType}/${width}/${height}/${image}`
  } else {
    return `${apiURL}/images/${image}`
  }
}

const getBrand = async ({ slug }) => {
  if (!slug) {
    return undefined
  } else {
    const { data } = await axios.get(`${apiURL}/brand/${slug}`, { httpsAgent: agent })
    if (!data.found) {
      return undefined
    }
    return data
  }
}
const getBrands = async () => {
  const { data } = await axios.get(`${apiURL}/brands/listing`, { httpsAgent: agent })
  if (!data) {
    return { brands: [] }
  } else {
    data.sort((a, b) => a.brand.localeCompare(b.brand))
    return { brands: data }
  }
}
const getCategory = async ({ slug }) => {
  if (!slug) {
    return undefined
  } else {
    const { data } = await axios.get(`${apiURL}/category/${slug}`, { httpsAgent: agent })
    if (!data.found) {
      return undefined
    }
    return data
  }
}

const getPage = async ({ lastPart }) => {
  const { data } = await axios.get(`${apiURL}/page/${lastPart}`, { httpsAgent: agent })
  return data
}

const getRedirect = async ({ store, product, ref = '', userAgent = '' }) => {
  const { data } = await axios.get(`${apiURL}/storeproduct/getLink?store=${store}&product=${product}&ref=${ref}`, { httpsAgent: agent, headers: { 'user-agent': userAgent } })
  return data
}

const getProduct = async ({ slug }) => {
  const { data } = await axios.get(`${apiURL}/product/${slug}`, { httpsAgent: agent })
  return data
}

const getLayout = async (page) => {
  if (!isDev) {
    return false
  }
  const { data } = await axios.get(`${apiURL}/layout/${page}`)
  return data
}
const getPostcode = async (postcode) => {
  const { data } = await axios.get(`${apiURL}/geocode/getlocation?postcode=${postcode}`)
  return data
}
const searchYoutube = (search) => {
  return false
  /*
  let ytresult = {}
  try {
    const headers = {}
    if (process.server) {
      headers.Referer = 'https://www.rovara.nl'
      return false
    }
    ytresult = await axios.get('https://www.googleapis.com/youtube/v3/search', {
      params: { key: 'AIzaSyD9XtpAHNXkVk5VvR2YBNSAe3co6xhePGI', ...search },
      headers
    })
  } catch (e) { }

  return ytresult */
}

const formatPrice = (price) => {
  const whole = Math.floor(price)
  const cents = price - whole
  if (cents === 0) {
    return `€${whole},-`
  } else {
    const centsText = Math.round(cents * 100).toFixed(0).padStart(2, '0')
    return `€${whole},${centsText}`
  }
}
const getBestDeal = (product, ref) => {
  let besteDealUrl
  let besteDealStore
  let lowestPrice = Number.MAX_VALUE
  let besteDealStoreImage
  for (const storeproduct of product.storeproducts) {
    if (storeproduct.price < lowestPrice && storeproduct.isAvailable) {
      besteDealUrl = getAffiliateLink(storeproduct, ref || 'besteDeal')
      besteDealStore = storeproduct.storeName
      lowestPrice = storeproduct.price
      besteDealStoreImage = storeproduct.image
    }
  }
  return { besteDealUrl, lowestPrice, besteDealStore, besteDealStoreImage }
}
const isDevelop = process.env.NODE_ENV === 'development'

const getAffiliateLink = (storeproduct, ref = '') => {
  if (isDevelop) {
    return '#'
  } else {
    return `/redirect?store=${storeproduct.store}&product=${storeproduct.product}&ref=${ref}`
  }
}
export {
  searchYoutube,
  getListingData,
  sizeImage,
  getBrand,
  getCategory,
  getBrands,
  getPage,
  getRedirect,
  getProduct,
  getLayout,
  getTopper,
  getPostcode,
  pageLoad,
  formatPrice,
  getBestDeal,
  getAffiliateLink,
  getRelatedProducts,
  getToppers,
  updateSearch

}

export default {}
