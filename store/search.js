import https from 'https'
import axios from 'axios'
import { sizeImage } from '~/components/API.js'
const agent = new https.Agent({ rejectUnauthorized: false, keepAlive: true })
let apiURL = 'https://www.rovara.nl/api'
if (process.env.NODE_ENV === 'development') {
  apiURL = 'https://dev.welivesmart.de/api'
}
const emptySearch = {
  search: '',
  sortBy: 'relevance',
  order: 'desc',
  page: 1,
  limit: 20,
  category: '',
  brand: '',
  color: ''
}
const startState = {
  ...emptySearch,
  isNewState: true,
  reachedEnd: false,
  isLoading: false,
  products: [],
  count: 0,
  loadedPages: [],
  needsUpdate: true,
  query: {},
  params: {},
  sortValue: 'relevance'
}

export const state = () => ({ ...startState, products: [], loadedPageS: [], query: {}, params: {} })
export const actions = {
  async updateFromQueryParam ({ state, dispatch }, { query, params }) {
    const brandSlug = params.brand || query.brand || ''
    const categorySlug = params.category || query.category || ''
    const color = query.color || ''
    const searchObj = { ...emptySearch, ...query }
    if (brandSlug) {
      searchObj.brand = brandSlug
    } else {
      searchObj.brand = ''
    }
    if (color) {
      searchObj.color = color
    } else {
      searchObj.color = ''
    }
    if (categorySlug) {
      searchObj.category = categorySlug
    } else {
      searchObj.category = ''
    }
    await dispatch('search', searchObj)
  },
  async search ({ state, dispatch, commit }, update) {
    commit('updateSearch', update)
    try {
      await dispatch('getListingData', update)
    } catch (e) {
      console.log('ERROR', e)
      commit('addSearchResult', {
        count: state.count,
        products: state.products,
        page: state.page
      })
    }
    return true
  },
  async loadNextPage ({ dispatch, state }) {
    await dispatch('search', { page: state.page + 1 })
  },
  async loadPreviousPage ({ dispatch, state }) {
    await dispatch('search', { page: Math.max(1, state.loadedPages[0] - 1) })
  },
  async updateSort ({ dispatch, state }, sorting) {
    const sortUpdate = {}
    if (sorting === 'relevance') {
      sortUpdate.sortBy = 'relevance'
    } else if (sorting === 'price_asc') {
      sortUpdate.sortBy = 'price'
      sortUpdate.order = 'asc'
    } else if (sorting === 'price_desc') {
      sortUpdate.sortBy = 'price'
      sortUpdate.order = 'desc'
    }
    await dispatch('search', sortUpdate)
  },
  async getListingData  ({ state, commit }, { imageWidth = 200, imageHeight = 200 }) {
    if (!state.needsUpdate) {
      return true
    }
    // &limit=${state.limit}
    let url = `${apiURL}/products/listing?page=${state.page}&sort=${state.sortBy}&order=${state.order}`

    if (state.search) {
      url = url + `&search=${state.search}`
    }

    if (state.brand) {
      url = url + `&brand=${state.brand}`
    }

    if (state.category) {
      url = url + `&category=${state.category}`
    }

    if (state.color) {
      url = url + `&color=${state.color}`
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
    commit('addSearchResult', { count, products, page: state.page })

    return true
  }
}
export const mutations = {
  clearSearch (state) {
    Object.assign(state, startState)
    state.products = []
    state.loadedPages = []
    state.query = {}
    state.params = {}
  },
  updateSearch (state, { search, page, sortBy, order, limit, category, brand, color }) {
    if (page) { page = parseInt(page) }
    if (limit) { limit = parseInt(limit) }

    let isNewSearch = false
    let needsUpdate = false
    if (search !== undefined) {
      isNewSearch = isNewSearch || state.search !== search
      needsUpdate = needsUpdate || state.search !== search
      state.search = search
    }
    if (sortBy !== undefined) {
      isNewSearch = isNewSearch || state.sortBy !== sortBy
      needsUpdate = needsUpdate || state.sortBy !== sortBy
      state.sortBy = sortBy
    }
    if (order !== undefined) {
      isNewSearch = isNewSearch || state.order !== order
      needsUpdate = needsUpdate || state.order !== order
      state.order = order
    }
    if (limit !== undefined) {
      isNewSearch = isNewSearch || state.limit !== limit
      needsUpdate = needsUpdate || state.limit !== limit
      state.limit = limit
    }

    if (category !== undefined) {
      isNewSearch = isNewSearch || state.category !== category
      needsUpdate = needsUpdate || state.category !== category
      state.category = category
    }
    if (brand !== undefined) {
      isNewSearch = isNewSearch || state.brand !== brand
      needsUpdate = needsUpdate || state.brand !== brand
      state.brand = brand
    }
    if (color !== undefined) {
      isNewSearch = isNewSearch || state.color !== color
      needsUpdate = needsUpdate || state.color !== color
      state.color = color
    }
    if (isNewSearch) {
      state.loadedPages = []
      state.products = []
      state.reachedEnd = true
      state.count = 0
      state.page = 1
    }
    if (page !== undefined) {
      state.page = page
      needsUpdate = needsUpdate || !state.loadedPages.includes(page)
    }
    state.isLoading = true
    state.needsUpdate = needsUpdate

    const query = {}
    const params = {}
    if (state.search) {
      query.search = state.search
    }
    if (state.sortBy) {
      query.sortBy = state.sortBy
    }
    if (state.order) {
      query.order = state.order
    }
    if (state.page) {
      query.page = state.page
    }
    // if (state.limit) {
    //   query.limit = state.limit
    // }
    if (state.category) {
      params.category = state.category
    }
    if (state.brand) {
      query.brand = state.brand
    }
    if (state.search) {
      query.search = state.search
    }
    if (state.color) {
      query.color = state.color
    }
    state.query = query
    state.params = params

    if (state.sortBy === 'relevance') {
      state.sortValue = 'relevance'
    } else if (state.sortBy === 'price' && state.order === 'asc') {
      state.sortValue = 'price_asc'
    } else if (state.sortBy === 'price' && state.order === 'desc') {
      state.sortValue = 'price_desc'
    }
  },

  addSearchResult (state, { products, page, count }) {
    if (page > state.loadedPages[0]) {
      state.products = [...state.products, ...products]
    } else {
      state.products = [...products, ...state.products]
    }
    state.count = count
    state.page = page
    const loadedPages = [...state.loadedPages, page]
    loadedPages.sort((a, b) => a - b)
    state.loadedPages = loadedPages
    state.reachedEnd = products.length === 0
    state.isLoading = false
    state.needsUpdate = false
    state.isNewState = false
  }
}
