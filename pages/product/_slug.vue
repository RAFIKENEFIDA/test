<template>
  <div class="product-page">
    <the-breadcrumbs class="breadcrumbs-desktop" :items="breadcrumbItems" />
    <the-breadcrumbs class="breadcrumbs-mobile" :items="breadcrumbItemsMobile" />
    <div id="image-area" class="image-area">
      <div class="main-image-area">
        <template v-if="mainImage !== undefined && mainImage.filename !== ''">
          <img
            :src="sizeImage(mainImage.filename,750,750)"
            @error="(e) => onerrorImage(e,mainImage.originalSource)"
          >
        </template>
      </div>
      <div class="product-thumbnails-container">
        <div id="product-thumbnails" class="product-thumbnails">
          <div
            v-for="(slide, i) in slides"
            :id="'slide-'+i"
            :key="i"
            class="product-thumbnail"
            :class="{'active-thumbnail': (activeThumbnail === i)}"
            @click="mainImage=slide; scrollLeft(i);"
          >
            <img
              :src="sizeImage(slide.filename,150,150)"
              class="lazy"
              alt=""
              @error="(e) => onerrorImage(e,slide.originalSource)"
            >
          </div>
        </div>
      </div>
    </div>
    <div class="product-info">
      <div class="product-title">
        <h1>{{ product.name }}</h1>
      </div>
      <div v-if="numProductRatings>0" class="product-rating" style="margin-bottom: 0px;">
        <template v-for="starRating of [1,2,3,4,5]">
          <i v-if="productRating >= starRating" :key="starRating" class="material-icons-round star-full" style="max-width:30px">star</i>
          <i v-else-if="productRating > starRating - 1" :key="starRating" class="material-icons-round star-half" style="max-width:30px">star_half</i>
          <i v-else :key="starRating" class="material-icons-round star-outline" style="max-width:30px">star_outline</i>
        </template>
        <div class="num-reviews" style="position:relative; bottom:6px;display:inline-block">
          ({{ numProductRatings }})
        </div>
      </div>
      <div class="product-short-description">
        {{ shortDescription }}... <a href="#product-description" class="remove-style" style="white-space: nowrap;"><span style="text-decoration:underline">Lees meer</span><i class="material-icons" style="max-width:25px; position: relative;bottom: -8px; display:inline;">expand_more</i></a>
      </div>
      <div class="product-deals-short">
        <div v-if="besteDealUrl" style="font-size:14px; opacity:0.35">
          Bekijk deal op {{ besteDealStore }}
        </div>
        <a :href="besteDealUrl" target="_blank" class="remove-style" rel="nofollow">
          <div
            class="button green best-deal button-green-productpage"
            style="min-width:200px;height:63px;"
          >
            <span v-if="besteDealUrl" class="beste-deal-button-text" style="white-space:pre-wrap">Beste deal <span class="beste-deal-button-text-small">voor</span> {{ formatPrice(product.price) }}</span>
            <span v-if="!besteDealUrl">
              Helaas geen deal gevonden
            </span>
          </div>
        </a>

        <!--
        <div v-if="false">
          <div
            class="button gray large beste-deal-info button-explain-productpage"
            style="height:45px; min-width:200px;cursor:pointer"
            @click="dialog = !dialog"
          >
            <span>Hoe bepalen we de beste deal?<i style="font-size:18px;padding-left:5px" class="material-icons">info</i></span>
          </div>
          <div id="myModal" class="modal" :style="`display: ${dialog ? 'block' : 'none'}`" @click="dialog = !dialog">
            <div class="modal-content">
              <p>
                We selecteren op de bekende websites de top aanbieder op dit moment.
                Op Bol.com is het mogelijk dat dit niet de meest goedkope aanbieder is.
              </p>
            </div>
          </div>
        </div>
        -->
      </div>
      <!--
      <div v-if="false && affiliates.filter(item => item.isDatasource).length > 0" class="data-sources">
        <div>Databronnen:</div>
        <div class="data-sources-list">
          <template v-for="(item, index) in affiliates.filter(item => item.isDatasource) ">
            <div
              :key="index"
              style="padding:0"
              class="data-source"
            >
              <a :id="`link-${index}`" :href="item.link" target="_blank" class="remove-style" rel="nofollow">
                <img
                  :src="sizeImage(item.image,150,45,'brand')"
                  class="lazy"
                  :alt="item.title"
                ></a>
            </div>
          </template>
        </div>
      </div> -->

      <div v-if="product.brandSlug" class="related-links">
        <nuxt-link :to="`/brand/${product.brandSlug}`" class="remove-style">
          <div class="button more-info">
            <span>Meer van {{ product.brand }}
            </span>
          </div>
        </nuxt-link>
      </div>
      <div class="related-products-container">
        <h2>
          Gerelateerde producten
        </h2>
        <div class="related-products-thumbnails">
          <div v-for="(relatedProduct) of relatedProducts.slice(0,3)" :key="relatedProduct.ean" class="related-product">
            <nuxt-link :to="`/product/${relatedProduct.slug}`" class="remove-style" :title="relatedProduct.name">
              <div class="related-product-image">
                <img
                  v-if="relatedProduct.mainImage.filename !== ''"
                  :src="sizeImage(relatedProduct.mainImage.filename,75,75)"
                  class="lazy"
                  :alt="relatedProduct.name"
                  @error="(e) => onerrorImage(e,relatedProduct.mainImage.originalSource)"
                >
              </div>
              <!-- <div
                class="product-title"
                style="white-space: nowrap;overflow: hidden;text-overflow: ellipsis;    max-width: 180px;
    width: 100%;"
              >
                {{ relatedProduct.name }}
              </div> -->
            </nuxt-link>
            <div class="product-item-price">
              {{ formatPrice(relatedProduct.price) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--
    <div class="product-info-header">
      <h2>Productinformatie</h2>
      <div>Wij hebben alle belangrijke productinformatie voor je verzameld.</div>
    </div> -->
    <div class="product-description-deals">
      <div id="product-description" class="product-description">
        <h2>Over de {{ product.name }}</h2>
        <!-- eslint-disable vue/no-v-html -->
        <div v-if="product.showOriginalDescription" class="" v-html="product.description" />
        <!-- eslint-enable -->
        <template v-if="!product.showOriginalDescription">
          <div v-for="(description,index) in descriptions" :key="index" class="">
            <div v-if="product.showTranslatedText" class="" v-html="product.description" />
            <div v-if="!product.showTranslatedText">
              {{ description.description }} ...
            </div>

            <a :href="description.link" target="_blank" class="remove-style">
              <div class="button more-info">
                <span>Lees meer op {{ description.store }} <i style="font-size:18px;padding-left:5px" class="material-icons">launch</i>
                </span>
              </div>
            </a>
          </div>
        </template>
      </div>
      <div class="product-deals">
        <h2>Deals</h2>
        <div class="stores">
          <template v-for="(item, index) in affiliates">
            <div
              :key="index"
              style="padding:0"
              class="store-item"
              :class="{'out-of-stock': (!item.isAvailable || item.price <= 0)}"
            >
              <div
                style="padding-right:20px"
              >
                <img :src="sizeImage(item.image,150,45,'brand')" style="max-width:100%; max-height:100%; width:auto;height:auto;">
              </div>

              <div class="store-info">
                <!-- eslint-disable vue/no-v-html -->
                <div class="store-name" v-html="item.title" />
                <div class="store-description" v-html="item.subtitle" />
                <div v-if="item.shippingCost > 0" class="shipping-cost">
                  verzendkosten: {{ formatPrice(item.shippingCost) }}
                </div>
                <div v-if="!item.isAvailable && item.price > 0" class="out-of-stock-message">
                  Uitverkocht
                </div>
                <div v-if="item.price <= 0 || !item.price" class="out-of-stock-message">
                  Prijs niet bekend
                </div>
                <!-- eslint-enable -->
              </div>
              <div class="store-link">
                <a :id="`link-${index}`" :href="item.link" target="_blank" class="remove-style" rel="nofollow">
                  <div
                    class="button green large offer button-beste-deal"
                    style="height:46px;max-width:100px"
                  >
                    <span>
                      {{ formatPrice(item.price) }}
                    </span>
                  </div>
                </a>
              </div>
            </div>
          </template>
        </div>
      </div>
      <div class="price-history">
        <h2>Prijsgeschiedenis</h2>
        <line-chart v-if="numPriceHIstoryDataPoints > 0" class="line-chart" :chart-data="datacollection" :options="options" />
        <div id="google_chart" />
      </div>

      <div v-if="gismapEnabled" class="gismap">
        <h2>Afhaallocaties</h2>
        <!-- <div class="search search-postcode">
          <div>Zoom naar postcode: </div>
          <input
            ref="inputLocation"
            v-model="postcode"
            maxlength="6"
            type="text"
            autocomplete="off"
            placeholder="1234AB"
            class="is-rounded"
            @keyup.enter="getLocation()"
          >
        </div> -->
        <div ref="productGisMap" class="gismap" style="width:100%; height:300px" />
      </div>
      <div v-if="relatedProducts && relatedProducts.length > 0" class="related-products">
        <h2>Gerelateerde producten</h2>
        <div class="related-products-grid">
          <div v-for="(relatedProduct) of relatedProducts" :key="relatedProduct.ean" class="related-product">
            <nuxt-link :to="`/product/${relatedProduct.slug}`" class="remove-style" :title="relatedProduct.name">
              <h2 class="product-title">
                {{ relatedProduct.name }}
              </h2>
              <div class="related-product-image">
                <img
                  v-if="relatedProduct.mainImage.filename !== ''"
                  :src="sizeImage(relatedProduct.mainImage.filename,100,100)"
                  class="lazy"
                  :alt="relatedProduct.name"
                  @error="(e) => onerrorImage(e,relatedProduct.mainImage.originalSource)"
                >
              </div>
            </nuxt-link>
            <div v-if="relatedProduct.differentAttributes.length > 0" class="different-attributes-wrapper">
              <div class="different-attributes" :class="{'show-all': relatedProduct.showMore} ">
                <div v-for="attribute of relatedProduct.differentAttributes" :key="attribute.key" class="different-attribute">
                  <!-- {{ `${attribute.group} ${attribute.label} ${attribute.mainProductValue} -> ${attribute.value}` }} -->
                  <div class="related-attribute-label">
                    {{ attribute.label }}
                  </div>
                  <div class="related-attribute-value">
                    {{ attribute.value }}
                  </div>
                </div>
              </div>
              <div v-if="relatedProduct.differentAttributes.length > 2" class="show-more" :class="{'show-all': relatedProduct.showMore} ">
                <div class="show-more-text" @click="toggleShowMore(relatedProduct)">
                  <div v-if="relatedProduct.showMore">
                    minder
                  </div>
                  <div v-else>
                    meer
                  </div>
                </div>
              </div>
            </div>
            <div class="product-item-price">
              {{ formatPrice(relatedProduct.price) }}
              <div v-if="besteDealUrl" class="price-difference">
                <div>verschil:</div>
                <div v-if="relatedProduct.price - product.price > 0" class="price-higher">
                  +{{ formatPrice(Math.abs(relatedProduct.price - product.price)) }}
                </div>
                <div v-if="relatedProduct.price - product.price < 0" class="price-lower">
                  -{{ formatPrice(Math.abs(relatedProduct.price - product.price)) }}
                </div>
                <div v-if="relatedProduct.price === product.price" class="price-equal">
                  ( == )
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="youtubeVideos.length > 0" class="videos">
        <h2>Videos</h2>
        <div style="margin-bottom:10px">
          Van plan om dit product op te zoeken op youtube? Hier hebben we alvast de top 4 resultaten weergegeven
        </div>
        <a v-for="video of youtubeVideos" :key="video.id" :href="`https://www.youtube.com/watch?v=${video.id}`" target="_blank" class="remove-style">
          <div class="video">

            <img :src="video.thumbnail">
            <div class="video-details">
              <div class="video-title">
                {{ video.title }}
              </div>
              <div class="video-channel">
                Kanaal: {{ video.channel }}
              </div>
            </div>

          </div>
        </a>
        <a :href="`https://www.youtube.com/results?search_query=${product.name}`" target="_blank" class="search-youtube remove-style">Zoek meer op youtube <i class="material-icons" style="font-size: 18px; padding-left: 5px;">launch</i></a>
      </div>
    </div>
    <div class="product-attributes">
      <h2>Productspecificaties</h2>
      <div v-for="(attributeGroup,i) in attributeGroups" :key="i">
        <div class="attribute-group">
          <div class="attribute-group-title">
            {{ attributeGroup.title }}
          </div>
        </div>
        <div v-for="attribute of attributeGroup.attributes" :key="attribute.key" class="attribute-group-item">
          <div class="attribute-label">
            {{ attribute.label }}
          </div>
          <div class="attribute-value">
            {{ attribute.value }}
          </div>
        </div>
      </div>
      <div />
    </div>

    <!--
    <div v-if="false" class="product-reviews">
      <h2>Reviews</h2>
    </div>
    -->
    <style v-if="layout && layout.css" type="text/css">
      {{ layout.css }}
    </style>
  </div>
</template>

<script>
/* <p>Info beschikbaar:</p>
            <div v-html="JSON.stringify(product,null,4).replace(/\r\n|\n/g,'<br>' ).replace(' ','&nbsp;')">

            </div> */
import MarkerClusterer from '@googlemaps/markerclustererplus'
import TheBreadcrumbs from '~/components/TheBreadcrumbs.vue'
import LineChart from '~/components/LineChart.js'
import { sizeImage, getProduct, searchYoutube, getLayout, getPostcode, getRelatedProducts } from '~/components/API.js'

const bestDeal = (product, ref) => {
  let besteDealUrl
  let besteDealStore
  let lowestPrice = Number.MAX_VALUE
  let besteDealSP
  for (const storeproduct of product.storeproducts) {
    if (storeproduct.price < lowestPrice && storeproduct.isAvailable) {
      besteDealUrl = getAffiliateLink(storeproduct, ref || 'besteDeal')
      besteDealStore = storeproduct.storeName
      lowestPrice = storeproduct.price
      besteDealSP = storeproduct
    }
  }
  return { besteDealUrl, lowestPrice, besteDealStore, besteDealSP }
}

const processRelatedProducts = (relatedProducts, product) => {
  if (relatedProducts && Array.isArray(relatedProducts)) {
    for (const relatedProduct of relatedProducts) {
      if (Array.isArray(relatedProduct.imageData) && relatedProduct.imageData.length > 0) {
        relatedProduct.imageData.sort((a, b) => a.position - b.position)
        relatedProduct.mainImage = { filename: relatedProduct.imageData[0].filename, originalSource: relatedProduct.imageData[0].src }
        // for (const image of relatedProduct.imageData) {
        //   if (image.isBaseImage) {
        //     relatedProduct.mainImage = image.filename
        //   }
        //  }
      } else {
        relatedProduct.mainImage = { filename: '', originalSource: '' }
      }
      const relatedProductAttributes = relatedProduct.productAttributes
      const differentAttributes = []
      for (const relatedProductAttribute of relatedProductAttributes) {
        if (relatedProductAttribute.group !== 'Overige kenmerken') {
          const mainAttributes = product.productAttributes.filter(a => a.group === relatedProductAttribute.group &&
                                                                  a.key === relatedProductAttribute.key)
          if (mainAttributes.length > 0) {
            const mainAttribute = mainAttributes[0]
            if (mainAttribute.value !== relatedProductAttribute.value) {
              relatedProductAttribute.mainProductValue = mainAttribute.value
              differentAttributes.push(relatedProductAttribute)
            }
          }
        }
      }
      relatedProduct.showMore = differentAttributes.length <= 2
      relatedProduct.differentAttributes = differentAttributes
    }
    return relatedProducts
  }
}
const isDevelop = process.env.NODE_ENV === 'development'
const getAffiliateLink = (storeproduct, ref = '') => {
  if (isDevelop) {
    return '#'
  } else {
    return `/redirect?store=${storeproduct.store}&product=${storeproduct.product}&ref=${ref}`
  }
}
const API_KEY = 'AIzaSyBDlOluaJuA8q4BgSbk3DChTTpCRdvM2TY'

export default {
  components: {
    TheBreadcrumbs,
    LineChart
  },
  async asyncData ({ params, query, error }) {
    const breadcrumbItems = [
      {
        text: 'Home',
        disabled: false,
        href: '/'
      }]
    const breadcrumbItemsMobile = []

    const layout = await getLayout('product_page')
    const slug = params.slug
    const data = await getProduct({ slug })
    const productRating = data.productRating
    const numProductRatings = data.numProductRatings

    if (data.found === false) {
      return error({ statusCode: 404, message: 'Page not found' })
    }

    const categories = data.categories
    const relatedProducts = data.relatedProducts
    categories.sort((a, b) => a.path.split('>').length - b.path.split('>').length)

    const categoryTree = { '/': { subcategories: [], path: '/', name: 'Home' } }
    const categoryList = []
    for (const category of categories) {
      const path = category.slug.split('/')
      if (path.length === 1) {
        categoryTree['/'].subcategories.push(category.slug)
      } else {
        categoryTree['/' + path.slice(0, path.length - 1).join('/')].subcategories.push(category.slug)
      }
      categoryTree['/' + category.slug] = { ...category, subcategories: [] }
    }
    for (const category of categories) {
      if (categoryTree['/' + category.slug].subcategories.length === 0) {
        categoryList.push(category)
      }
    }
    categoryList.sort((a, b) => a.slug.split('/') - b.slug.split('/'))
    if (categoryList.length > 0) {
      const selectedCategory = categoryList[categoryList.length - 1]
      const paths = selectedCategory.slug.split('/')
      const names = selectedCategory.path.split('>')
      for (let i = 0; i < paths.length; i++) {
        breadcrumbItems.push({ text: names[i], disabled: false, href: `/category/${paths.slice(0, i + 1).join('/')}` })
        if (i === paths.length - 1) {
          breadcrumbItemsMobile.push({ text: names[i], disabled: false, href: `/category/${paths.slice(0, i + 1).join('/')}` })
        }
      }
    } else if (query.breadcrumbs) {
      const queryBreadcrumbs = query.breadcrumbs.split(';')
      for (const queryBreadcrumb of queryBreadcrumbs) {
        const [name, path] = queryBreadcrumb.split(':')
        const href = path.replace(/\|/g, '/')
        breadcrumbItems.push({ text: name, disabled: false, href })
      }
    } else {
      breadcrumbItems.push(
        {
          text: 'Producten',
          disabled: false,
          href: '/products'
        })
    }

    breadcrumbItems.push({ text: data.name.slice(0, 30) + (data.name.length > 30 ? '...' : ''), disabled: true, href: data.slug })
    const slides = []
    let mainImage = { filename: '', originalSource: '' }
    const imageCountMap = new Map()
    data.imageData.forEach(function (img) {
      imageCountMap.set(img.source, (imageCountMap.get(img.source) || 0) + 1)
    })
    data.imageData.sort((a, b) => (a.position - b.position) - 100 * (imageCountMap.get(a.source) - imageCountMap.get(b.source)))
    /* data.imageData = [...data.imageData.filter(img => img.source === maxSource),
      ...data.imageData.filter(img => img.source !== maxSource)]
*/
    if (Array.isArray(data.imageData) && data.imageData.length > 0) {
      mainImage = { filename: data.imageData[0].filename, originalSource: data.imageData[0].src }
      for (const image of data.imageData) {
        // if (image.isBaseImage) {
        //   mainImage = image.filename
        // }
        slides.push({ filename: image.filename, originalSource: image.src })
      }
    }
    if (data.relatedProducts && Array.isArray(data.relatedProducts)) {
      processRelatedProducts(data.relatedProducts, data)
    }
    /* *
      for (const relatedProduct of data.relatedProducts) {
        if (Array.isArray(relatedProduct.imageData) && relatedProduct.imageData.length > 0) {
          relatedProduct.imageData.sort((a, b) => a.position - b.position)
          relatedProduct.mainImage = relatedProduct.imageData[0].filename
          // for (const image of relatedProduct.imageData) {
          //   if (image.isBaseImage) {
          //     relatedProduct.mainImage = image.filename
          //   }
          //  }
        }
        const relatedProductAttributes = relatedProduct.productAttributes
        const differentAttributes = []
        for (const relatedProductAttribute of relatedProductAttributes) {
          if (relatedProductAttribute.group !== 'Overige kenmerken') {
            const mainAttributes = data.productAttributes.filter(a => a.group === relatedProductAttribute.group &&
                                                                    a.key === relatedProductAttribute.key)
            if (mainAttributes.length > 0) {
              const mainAttribute = mainAttributes[0]
              if (mainAttribute.value !== relatedProductAttribute.value) {
                relatedProductAttribute.mainProductValue = mainAttribute.value
                differentAttributes.push(relatedProductAttribute)
              }
            }
          }
        }
        relatedProduct.showMore = differentAttributes.length <= 2
        relatedProduct.differentAttributes = differentAttributes
      }
    } */

    const attributeGroups = []

    const attributeGroupNames = new Set()
    for (const attribute of data.productAttributes) {
      attributeGroupNames.add(attribute.group)
    }
    for (const attributeGroupName of attributeGroupNames) {
      const attributeGroup = { title: attributeGroupName, attributes: [] }
      const attributes = data.productAttributes.filter(a => a.group === attributeGroupName)
      for (const attribute of attributes) {
        attributeGroup.attributes.push(attribute)
      }
      attributeGroups.push(attributeGroup)
    }

    let structuredDataImage
    if (slides.length > 0) {
      structuredDataImage = sizeImage(slides[0].filename, 750, 750)
    }
    const { besteDealUrl, lowestPrice, besteDealStore, besteDealSP } = bestDeal(data)
    const structuredData = {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: data.name,
      image: structuredDataImage, // slides.map(s => sizeImage(s.filename,750,750)),
      description: data.description,
      gtin13: data.ean,
      sku: data.sku,
      brand: {
        '@type': 'Brand',
        name: data.brand
      }
    }
    // console.log('Product rating', productRating, numProductRatings)
    if (productRating && numProductRatings) {
      structuredData.aggregateRating = {
        '@type': 'AggregateRating',
        ratingValue: productRating,
        reviewCount: numProductRatings,
        bestRating: 5,
        worstRating: 1
      }
    }

    if (data.storeproducts.filter(sp => sp.isAvailable).length > 0) {
      const offers = {
        '@type': 'AggregateOffer',
        offerCount: data.storeproducts.filter(sp => sp.isAvailable).length,
        lowPrice: lowestPrice, // data.storeproducts.reduce((a, b) => Math.min(a, b.price), 10000),
        highPrice: data.storeproducts.filter(sp => sp.isAvailable).reduce((a, b) => Math.max(a, b.price), 0),
        priceCurrency: 'EUR',
        availability: 'InStock'
      }
      structuredData.offers = offers
    } else {
      const offers = {
        '@type': 'AggregateOffer',
        lowPrice: data.price,
        highPrice: data.price,
        priceCurrency: 'EUR',
        offerCount: 0,
        availability: 'OutOfStock'
      }
      structuredData.offers = offers
    }
    const affiliates = []
    for (const storeproduct of data.storeproducts) {
      if (storeproduct.price > 0 && storeproduct.isAvailable) {
        affiliates.push({ isDatasource: storeproduct.storeName === 'Bol.com', avatar: '', isAvailable: storeproduct.isAvailable, title: storeproduct.storeName, subtitle: storeproduct.deliveryText, price: storeproduct.price, image: storeproduct.image, shippingCost: storeproduct.shippingCost, link: getAffiliateLink(storeproduct, 'storeList') })
      }
    }
    for (const storeproduct of data.storeproducts) {
      if (storeproduct.price <= 0 || !storeproduct.isAvailable) {
        affiliates.push({ isDatasource: storeproduct.storeName === 'Bol.com', avatar: '', isAvailable: storeproduct.isAvailable, title: storeproduct.storeName, subtitle: storeproduct.deliveryText, price: storeproduct.price, image: storeproduct.image, shippingCost: storeproduct.shippingCost, link: getAffiliateLink(storeproduct, 'storeListSoldOut') })
      }
    }
    let firstPriceHistory = new Date()
    for (const sp of data.storeproducts) {
      for (const ph of sp.priceHistory) {
        if (ph.price > 0) {
          firstPriceHistory = Math.min(firstPriceHistory, new Date(ph.date))
        }
      }
    }
    firstPriceHistory = new Date(firstPriceHistory)
    let numLocations = 0
    for (const sp of data.storeproducts) {
      if (sp.storeInfo && sp.storeInfo.locations) {
        numLocations += sp.storeInfo.locations.length
      }
    }
    const gismapEnabled = numLocations > 0

    const youtubeSearch = await searchYoutube({ q: data.name, type: 'video', part: 'snippet', safeSearch: 'moderate', maxResults: 4, regionCode: 'NL', relevanceLanguage: 'nl' })
    let youtubeVideos = []
    if (youtubeSearch) {
      try {
        youtubeVideos = youtubeSearch.data.items.filter(v => v.id.kind === 'youtube#video')
          .map((v) => { return { id: v.id.videoId, thumbnail: v.snippet.thumbnails.default.url, title: v.snippet.title, channel: v.snippet.channelTitle } })
      } catch (e) {

      }
    }

    let descriptions = []
    let shortDescription = data.description.replace(/(<([^>]+)>)/gi, '').substring(0, 200)

    for (const sp of data.storeproducts) {
      // if (sp.storeName === 'Bol.com') {
      if (sp.storeName === besteDealStore && sp.productDescription && sp.productDescription.description) {
        shortDescription = sp.productDescription.description.replace(/(<([^>]+)>)/gi, '').substring(0, 200)
        descriptions.push({
          store: sp.storeName,
          description: shortDescription,
          link: getAffiliateLink(sp, 'description')
        })
      }
    }

    if (descriptions.length === 0) {
      for (const sp of data.storeproducts) {
        if (sp.storeName === 'Bol.com' && sp.isAvailable && sp.productDescription && sp.productDescription.description) {
          shortDescription = sp.productDescription.description.replace(/(<([^>]+)>)/gi, '').substring(0, 200)

          descriptions.push({
            store: sp.storeName,
            description: shortDescription,
            link: getAffiliateLink(sp, 'description')
          })
        }
      }
    }
    if (descriptions.length === 0) {
      for (const sp of data.storeproducts) {
        if (sp.productDescription && sp.productDescription.description) {
          shortDescription = sp.productDescription.description.replace(/(<([^>]+)>)/gi, '').substring(0, 200)

          descriptions.push({
            store: sp.storeName,
            description: shortDescription,
            link: getAffiliateLink(sp, 'description')
          })
        }
      }
    }
    for (const sp of data.storeproducts) {
      if (sp.productDescription && sp.productDescription.wordai_en_to_nl) {
        shortDescription = sp.productDescription.wordai_en_to_nl.replace(/(<([^>]+)>)/gi, '').substring(0, 200)
        descriptions = []
        /* const descrs = `NL: ${sp.productDescription.description}
        <br/><br/><br/>

        NL_EN ${sp.productDescription.nl_to_en}
<br/><br/><br/>

        WORDAI_EN: ${sp.productDescription.wordai_en}
<br/><br/><br/>

        WORDAI_EN_TO_NL: ${sp.productDescription.wordai_en_to_nl}` */
        const descrs = sp.productDescription.wordai_en_to_nl
        // data.showOriginalDescription = true
        data.showTranslatedText = true

        data.description = descrs // sp.productDescription.nl_to_en
        descriptions.push({
          store: besteDealSP.storeName,
          description: descrs, // sp.productDescription.nl_to_en,
          link: getAffiliateLink(besteDealSP, 'description wordai')
        })
      }
    }
    /*
    const extraDescriptions = data.storeproducts.filter(sp => sp.productDescription &&
                            sp.productDescription.description &&
                            sp.storeName !== 'Bol.com' &&
                            sp.storeName !== 'Bol.com BE').map((sp) => {
      return {
        store: sp.storeName,
        description: sp.productDescription.description.replace(/(<([^>]+)>)/gi, '').substring(0, 200),
        link: getAffiliateLink(sp,'additionalDescriptions)
      }
    })
    descriptions = [...descriptions, ...extraDescriptions.slice(0, 2)]
    */

    // console.log(youtubeSearch, foundYoutubeIds)
    return {
      numImageErrors: 0,
      youtubeVideos,
      relatedProducts,
      numLocations,
      gismapEnabled,
      firstPriceHistory,
      categoryTree,
      shortDescription,
      affiliates,
      productRating,
      numProductRatings,
      structuredData,
      breadcrumbItems,
      breadcrumbItemsMobile,
      product: data,
      slides,
      mainImage,
      attributeGroups,
      besteDealUrl,
      besteDealStore,
      layout,
      descriptions
    }
  },

  data () {
    return {
      dialog: false,
      datacollection: {},
      options: {},
      numPriceHIstoryDataPoints: 0,
      location: null,
      activeThumbnail: 0,
      map: null,
      postcode: ''
    }
  },
  head () {
    /**/
    // const priceHistoryMonths = Math.floor((new Date() - this.firstPriceHistory) * 12 / (31556926 * 1000))
    // const priceHistoryWeeks = Math.floor((new Date() - this.firstPriceHistory) * 52 / (31556926 * 1000))
    // let priceHistoryText = ''
    // if (priceHistoryMonths >= 1) {
    //   priceHistoryText = `${priceHistoryMonths} ${priceHistoryMonths === 1 ? 'Maand' : 'Maanden'} prijshistorie`
    // } else if (priceHistoryWeeks >= 1) {
    //   // priceHistoryText = `${priceHistoryWeeks} ${priceHistoryWeeks === 1 ? 'Week' : 'Weken'} prijshistorie`
    // }
    /**/
    const meta = [
      {
        hid: 'description',
        name: 'description', // content: `Vergelijk hier de beste deals op dit moment voor ${this.product.name}. Bekijk ${priceHistoryText}.` }
        // content: `Vergelijk prijzen van ${this.product.name} bij alle online aanbieders. Altijd de beste deal! Bekijk de specificaties en reviews op Rovara`
        // content: `Vergelijk prijzen van ${this.product.name} met ${priceHistoryText}. Altijd de beste deal! Bekijk de specificaties en reviews op Rovara`
        content: 'Vergelijk prijzen van alle grote online winkels. Bespaar tijd en geld. Wij houden de prijzen voor je bij zodat je altijd weet of je een goede deal hebt.'
        // content: `Vergelijk prijzen van ${this.product.name} met ${priceHistoryText}. Wij houden de prijzen voor je bij zodat je altijd weet of je een goede deal hebt.`
        // content: 'Sta je op het punt om dit product aan te schaffen? Bekijk bij ons wat de beste deal is! Zodat jij tijd en geld bespaart op je online aankoop.'
      }

    ]
    /**/
    if (!this.product.indexProductPage) {
      meta.push({
        name: 'robots',
        content: 'noindex'
      })
    } /**/

    return {
      titleTemplate: '%s',
      // title: `${this.product.name} - ${priceHistoryText} - De beste deals`,
      title: `👍 ${this.product.name} kopen? Vergelijk | Rovara`,
      // title: `👍 ${this.product.name} kopen? ${priceHistoryText} | Rovara`,
      meta,
      __dangerouslyDisableSanitizers: ['script'],
      script: [{ type: 'application/ld+json', json: this.structuredData }]
    }
  },
  mounted () {
    this.fillData()
    if (this.gismapEnabled) {
      this.checkAndAttachMapScript(this.initLocationSearch)
    }
    if (window && this.relatedProducts.length === 0) {
      this.getRelatedProducts(this.product.ean)
    }
    // this.attachGoogleCharts(this.drawPriceHistory)
  },
  methods: {
    onerrorImage (e, originalSource) {
      this.numImageErrors++
      if (e.target.src !== originalSource && this.numImageErrors < 100) {
        e.target.src = originalSource
      }
    },
    async getRelatedProducts (ean) {
      const relatedProducts = await getRelatedProducts(ean)
      this.relatedProducts = processRelatedProducts(relatedProducts, this.product)
    },
    async getLocation () {
      const location = await getPostcode(this.postcode)
      if (location) {
        /**/
        // this.$refs.productGisMap.fitBounds(location.result.results[0].geometry.viewport)
        this.map.panTo(location.result.results[0].geometry.location)
        this.map.setZoom(11)
      }
    },
    toggleShowMore (relatedProduct) {
      relatedProduct.showMore = !relatedProduct.showMore
    },
    initLocationSearch () {
      const center = { lat: 52.224943476141746, lng: 5.537092784476041 }

      const map = new window.google.maps.Map(this.$refs.productGisMap, {
        zoom: 6,
        center
      })
      this.map = map
      let openInfowindows = []
      const markers = []
      for (const sp of this.product.storeproducts) {
        if (sp.storeInfo && sp.storeInfo.locations && sp.isAvailable) {
          for (const storeLocation of sp.storeInfo.locations) {
            const markerSettings = {
              position: { lat: storeLocation.latitude, lng: storeLocation.longitude },
              title: storeLocation.name,
              optimized: true
              // icon: '/markers/blokker-marker.svg'

            }
            if (sp.storeInfo.mapMarker) {
              /* var image = {
              url: place.icon,
              size: new google.maps.Size(71, 71),
              origin: new google.maps.Point(0, 0),
              anchor: new google.maps.Point(17, 34),
              scaledSize: new google.maps.Size(25, 25)
            }; */
              let origin = null
              if (sp.storeInfo.markerSettings && sp.storeInfo.markerSettings.origin) {
                origin = new window.google.maps.Point(sp.storeInfo.markerSettings.origin.x, sp.storeInfo.markerSettings.origin.y)
              } else {
                origin = new window.google.maps.Point(0, 0)
              }
              let anchor = null
              if (sp.storeInfo.markerSettings && sp.storeInfo.markerSettings.anchor) {
                anchor = new window.google.maps.Point(sp.storeInfo.markerSettings.anchor.x, sp.storeInfo.markerSettings.anchor.y)
              }
              let size = null
              if (sp.storeInfo.markerSettings && sp.storeInfo.markerSettings.size) {
                size = new window.google.maps.Size(sp.storeInfo.markerSettings.size.width, sp.storeInfo.markerSettings.size.height)
              }
              let scaledSize = null
              if (sp.storeInfo.markerSettings && sp.storeInfo.markerSettings.scaledSize) {
                scaledSize = new window.google.maps.Size(sp.storeInfo.markerSettings.scaledSize.width, sp.storeInfo.markerSettings.scaledSize.height)
              } else {
                scaledSize = new window.google.maps.Size(30, 30)
              }
              markerSettings.icon = new window.google.maps.MarkerImage(sp.storeInfo.mapMarker,
                size, origin, anchor, scaledSize)
            }
            let contentString = `<div> 
              <h1 style="font-size:14px">${sp.storeName} ${storeLocation.name}</h1>
              <div>
                <div class="store-link"> 
                  <a href="${getAffiliateLink(sp, 'gisMapMarker')}" target="_blank" class="remove-style">
                  Bestel nu voor 
                    <div
                      class="button green button-beste-deal"
                      style="height:20px;max-width:80px;font-size:14px!important"
                    >
                      <span>
                        ${this.formatPrice(sp.price)}
                      </span>
                    </div>
                  </a>`
            if (storeLocation.googlePlaces) {
              if (storeLocation.googlePlaces.adr_address) {
                // contentString += `<div class="address">${storeLocation.googlePlaces.adr_address}</div>`
              } else {
                // contentString += `<div class="address">${storeLocation.address}</div>`
              }
              if (storeLocation.googlePlaces.opening_hours && storeLocation.googlePlaces.opening_hours.weekday_text) {
                contentString += '<div>Openingstijden: </div>'
                contentString += storeLocation.googlePlaces.opening_hours.weekday_text.map(t => `<div class="dag">${t}</div>`).join('')
              }
              if (storeLocation.googlePlaces.international_phone_number) {
                contentString += `<div >Telefoon: </div><div class="phone-number">${storeLocation.googlePlaces.international_phone_number}</div><br/>`
              }
            }
            contentString += `
                </div>  
              </div>`
            const infowindow = new window.google.maps.InfoWindow({
              content: contentString,
              maxWidth: 200
            })
            const marker = new window.google.maps.Marker(markerSettings)
            marker.addListener('click', () => {
              for (const iw of openInfowindows) {
                iw.close()
              }
              openInfowindows = []
              infowindow.open(map, marker)
              openInfowindows.push(infowindow)
            })
            // marker.setMap(map)
            markers.push(marker)
          }
        }
      }
      new MarkerClusterer(map, markers, { imagePath: '/markers/clusters/m', gridSize: 40 })

      // console.log(map)
      // autocomplete.addListener('place_changed', function () {
      //  const place = autocomplete.getPlace()
      //  if (place && place.address_components) {
      //    console.log(place.address_components)
      //  }
      //  })
    },
    attachGoogleCharts (callback) {
      if (window.google) {
        callback()
        return true
      }
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.src = 'https://www.gstatic.com/charts/loader.js'
      document.body.appendChild(script)
    },
    drawPriceHistory () {
      // Load the Visualization API and the corechart package.
      window.google.charts.load('current', { packages: ['corechart'] })

      // Set a callback to run when the Google Visualization API is loaded.
      window.google.charts.setOnLoadCallback(drawChart)

      // Callback that creates and populates a data table,
      // instantiates the pie chart, passes in the data and
      // draws it.
      function drawChart () {
        // Create and populate the data table.
        const data = new window.google.visualization.DataTable()
        data.addColumn('date', 'Date')
        data.addColumn('number', 'Quantity')
        data.addRow([new Date(2011, 0, 1), 10])
        data.addRow([new Date(2011, 1, 1), 15])
        data.addRow([new Date(2011, 3, 1), 40])
        data.addRow([new Date(2011, 6, 1), 50])

        // Create and draw the visualization.
        const chart = new window.google.visualization.ScatterChart(
          document.getElementById('google_chart'))
        chart.draw(data, {
          title: 'Test',
          vAxis: { title: 'cr', titleTextStyle: { color: 'green' } },
          hAxis: { title: 'time', titleTextStyle: { color: 'green' } },
          lineWidth: 1
        }
        )
      }
    },
    checkAndAttachMapScript (callback) {
      if (window.google) { // If you're using vue cli, then directly checking
        // 'google' obj will throw an error at the time of transpiling.
        callback()
        return true
      }

      window.mapApiInitialized = callback
      const script = document.createElement('script')
      script.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}&libraries=&callback=mapApiInitialized`
      document.body.appendChild(script)
    },
    fillData () {
      let minPrice = Number.MAX_VALUE
      let maxPrice = 0
      for (const store of this.product.storeproducts) {
        for (const ph of store.priceHistory) {
          minPrice = Math.min(minPrice, ph.price)
          maxPrice = Math.max(maxPrice, ph.price)
        }
      }
      this.options = {
        responsive: true,
        maintainAspectRatio: false,
        title: {
          display: true
        },
        tooltips: {
          enabled: true,
          intersect: false,
          // mode: 'index',
          mode: 'nearest'
        },
        legend: {
          display: true,
          usePointStyle: true,
          boxWidth: 10
        },
        scales: {
          xAxes: [{
            type: 'time',
            distribution: 'series',
            time: {
              tooltipFormat: 'YYYY MMM D',
              unit: 'day',
              displayFormats: { day: 'YYYY MMM D' }
            }
            /* ,
            scaleLabel: {
              display: true,
              labelString: 'Date'
            } */
          }],
          yAxes: [{
            ticks: {
              suggestedMin: Math.floor(minPrice * 0.95),
              suggestedMax: Math.ceil(maxPrice * 1.05)
            }
          }]

        }
      }
      this.numPriceHIstoryDataPoints = 0
      const currentTime = new Date()
      this.datacollection = {
        datasets: this.product.storeproducts.map((sp) => {
          const returnObj = {
            label: sp.storeName,
            steppedLine: true,
            fill: false,
            borderColor: sp.isAvailable ? (sp.storeName === 'Coolblue' ? 'orange' : 'blue') : 'gray',
            data: sp.priceHistory.filter(ph => ph.price > 0).map((ph) => { this.numPriceHIstoryDataPoints++; return { label: 'test', x: new Date(ph.date).setHours(12), y: ph.price } })

          }

          if (sp.priceHistory.length > 0) {
            returnObj.data.push({ label: 'test', x: currentTime, y: sp.priceHistory[sp.priceHistory.length - 1].price })
          }

          return returnObj
        })
      }
    },
    getRandomInt () {
      return Math.floor(Math.random() * (50 - 5 + 1)) + 5
    },
    sizeImage (image, width, height, imagetype = 'product') {
      return sizeImage(image, width, height, imagetype)
    },
    formatPrice (price) {
      if (!price) {
        return '€ -'
      }
      const whole = Math.floor(price)
      const cents = price - whole
      if (cents === 0) {
        return `€${whole},-`
      } else {
        const centsText = Math.round(cents * 100).toFixed(0).padStart(2, '0')
        return `€${whole},${centsText}`
      }
    },
    formatDeltaPrice (delta) {
      const price = this.formatPrice(Math.abs(delta))
      if (delta > 0) {
        return `<span class="material-icons-outlined">arrow_upnward</span> ${price}`
      } else if (delta < 0) {
        return `<span class="material-icons-outlined">arrow_downward</span> ${price}`
      } else if (delta === 0) {
        return '--'
      }
    },
    scrollLeft (item) {
      this.activeThumbnail = item
      // console.log(this.activeThumbnail)
      const content = document.querySelector('.product-thumbnails-container')
      const firstElement = document.querySelector('#slide-0')
      const clickedElement = document.querySelector(`#slide-${item}`)
      const sliderWidth = content.getBoundingClientRect().width
      const thumbnailWidth = clickedElement.getBoundingClientRect().width
      // console.log('Element', content, content.getBoundingClientRect(), 'Width', sliderWidth) // 'Offset:', content.offsetLeft, 'offset parent: ', content.offsetParent)
      const offsetDifference = clickedElement.offsetLeft - firstElement.offsetLeft
      // console.log('offset difference', offsetDifference)
      const left = Math.max(0, offsetDifference - Math.round((sliderWidth - thumbnailWidth) / 2))
      const options = { top: 0, left, behavior: 'smooth' }
      content.scrollTo(options)
    }
  }

}
</script>

<style lang="css" >
  .product-page .videos {

    padding: 35px 40px 20px 35px;
    display: flex;
    flex-direction: column;
    row-gap: 10px;
    grid-area: videos
  }
  .product-page .videos .video {
    display:flex;
    flex-direction:row;
    column-gap: 10px;
  }
  .product-page .videos .video .video-details .video-channel {
    font-size: 12px;
  }
  .product-page .related-products-grid {
    display:grid;
    grid-template-columns: 1fr;
    font-size:16px;
    row-gap:30px;
    column-gap:20px;
  }
  .product-page .related-products  {
    padding: 35px 40px 20px 35px;
    grid-area: related-products
  }
  .product-page .related-products .related-product .product-title {
    font-size: 16px;
    margin-top:0;
    margin-bottom:15px;
  }
  .product-page .related-products .different-attributes-wrapper {
    position: relative;
    word-break:break-all;
  }
  .product-page .related-product .different-attributes {
    max-height: 95px;
    overflow: hidden;
    transition: all .4s ease 0s;
    display: grid;
    row-gap:5px;
    grid-template-columns: 1fr 1fr;
    margin-top: 10px;
  }
  .product-page .related-product .related-attribute-value {
    justify-self: right;
    text-align: right;
  }
  .product-page .related-product .different-attributes .different-attribute {
    display:contents;
  }
  .product-page .related-product .price-difference {
    font-size: 11px;
    padding-left:8px;
  }
  .product-page .related-product .price-difference .price-lower {
    color:green;
  }
  .product-page .related-product .price-difference .price-higher {
    color:#dd0044;
  }
  .product-page .related-product .show-more {
    user-select: none;
    position: absolute;
    bottom: 0;
    background: linear-gradient(rgba(255,255,255,0),#fff 70%);
    height: 3em;
    width:100%;
    border-bottom: 1px solid #a5a5a5;
    display: flex;
    justify-content: center;
  }
  .product-page .related-product .different-attributes.show-all {
    max-height:1000px;
    padding-bottom: 25px;
  }
  .product-page .related-product .show-more.show-all {
    background: none;
  }

  .product-page .related-product .show-more .show-more-text, .product-page .videos .search-youtube {
    text-align: center;
    padding: 5px 10px;
    cursor: pointer;
    background-color: #fff;
    border: 1px solid #e6e6e6;
    border-radius: .25em;
    outline: 0;
  }

  .product-page .related-product .show-more .show-more-text {
    position:absolute;
    bottom: -17px;
  }
  .product-page .related-product .product-item-price {
    font-size: 16px;
    padding-top: 16px;
    justify-content: flex-end;
  }
  .product-page .related-product .product-item-price div {
    display: inline-block;
  }
  .product-page .related-product-image {
    display:flex;
    justify-content: center;
    height:105px;
  }
  .product-page .related-product-image img {
    max-width: 100%;
    max-height: 100%;
    width: 110px;
    object-fit: contain;
    object-position: center;
    box-sizing: border-box;
  }
  .product-page .data-sources {
    grid-area: data-sources;
  }
  .product-page .data-sources-list {
    display:flex;
    flex-direction:row;
  }
  .product-page h1 {
    font-family: "Poppins"
  }
  .product-page .product-description-deals {
    grid-area: product-description-deals;
    display: grid ;
    grid-template-columns: 1fr;
    row-gap:15px;
    grid-template-rows: min-content min-content min-content min-content min-content;
    grid-template-areas:
    "product-deals"
    "product-description"
    "price-history"
    "gismap"
    "related-products"
    "videos"
    "."
  }
  .product-page .product-info-header {
    grid-area: product-info-header;
    padding: 0 15px
  }
  .product-page .related-links {
    grid-area: related-links;
  }
  .product-page .related-products-container {
    grid-area: related-products-thumbnails;
  }
  .product-page .related-products-container .related-products-thumbnails {
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    column-gap:5px
  }
  .product-page .gismap {
    grid-area: gismap;
  }
  .product-page .gismap .search{
    margin-bottom:15px
  }
  .product-page .gismap .search input {
    /* height: 35px; */
    font-size: 24px;
    padding: 0 20px;
    width: 150px;
  }
  .product-page .search-postcode div {
    display: inline-block;
    padding-right: 20px;
    font-family:'Poppins';
    font-size: 20px;
    padding-bottom: 10px;
  }
  .product-page .stores {
    grid-area: stores;
    display: flex;
    flex-direction:column;
    align-items:center;
    padding-bottom:20px;
    row-gap: 10px;
  }
  .product-page .attribute-group {
    background: linear-gradient(90deg, #7474BF 0%, #348AC7 100%);
    border-radius: 7px 7px 1px 1px;
    color:white;
    display:grid;
    justify-items:center;
    align-items:center;
    height:55px;
    font-family: "Poppins"
  }
  .product-page .attribute-group-item {
    border-radius: 2px 2px 1px 1px;
    /* background: #F1F0F0; */
    background: #fff;
    display: grid;
    grid-template-columns: 1fr 1fr;
    justify-items:center;
    align-items:center;
    font-size: 14px;
    padding: 7px;
    text-align: center;
  }
  .product-page.attribute-group-item:not(:last-child) {
    border-bottom: 0.5px solid #CCC6C6;
  }
  .product-page .attribute-group-item:last-child {
    border-radius:1px 1px 7px 7px
  }
  .product-page .store-item > div {
    align-self: center;
  }
  .product-page .store-item .store-link {
    justify-self: flex-end;
    min-width: 100px;
  }
  .product-page .store-item {
    width:100%;
    display:grid;
    grid-template-columns: 100px 1fr 1fr;
  }
  .product-page .store-item.out-of-stock {
    opacity: 0.25;
  }
  .product-page .price-history {
    overflow-x: auto;
    grid-area: price-history;
    padding: 35px 40px 20px 35px;
  }
  .product-page .price-history .line-chart {
    height:300px;
    max-width:99%;
  }
  .product-page canvas#line-chart {
    width: 100%!important;
  }
  .product-page .product-rating {
    grid-area: product-rating;
  }
  .product-page {
    display:grid;
    grid-template-columns: 1fr 1fr;
    column-gap:15px;
    row-gap:0;
    grid-template-rows: min-content;
    grid-template-areas:
    "breadcrumbs breadcrumbs"
    "image product-info"
    "product-info-header product-info-header"
    "product-description-deals product-attributes"
    "product-description-deals ."
  }
  .product-page > *:first-child {
    margin-bottom: 30px;
  }
  .product-page > *:not(:first-child):not(:last-child) {
    margin-bottom: 50px;
  }
  @media(max-width: 768px) {
    .product-page > *:first-child {
      margin-bottom: 0;
    }
    .product-page > *:not(:first-child):not(:last-child) {
      margin-bottom: 0;
    }
    .image-area {
      margin-bottom: 5px !important;
    }
  }
  .product-page .breadcrumbs {
    grid-area: breadcrumbs;
  }
  .product-page .product-info {
    padding-left: 7%;
    padding-right: 7%;
    grid-area: product-info;
    display:grid;
    grid-template-columns: 1fr;
    column-gap:15px;
    row-gap: 0px;
    grid-template-rows: 10px max-content max-content max-content max-content max-content;
    grid-template-areas:
    "."
    "product-title"
    "product-rating"
    "product-short-description"
    "product-deals-short"
    "related-links"
    "related-products-thumbnails"
    "data-sources"
  }
  .product-page .product-info > *:not(:last-child) {
    margin-bottom: 15px;
  }
  .product-page .product-title {
    grid-area: product-title;
    word-break: break-word;
  }
  .product-page .product-description {
    grid-area: product-description;
    padding: 40px;/* 5% 0% 3%;*/
  }
  .product-page .product-description > div:not(first-child):not(:nth-child(2)) {
    padding-top: 40px;
  }
  .product-page .product-description,
  .product-page .product-deals,
  .product-page .product-attributes,
  .product-page .price-history,
  .product-page .related-products,
  .product-page .videos
   {
    background: #f9f9f9;
    border-radius: 8px;
  }
  .product-page .product-short-description {
    grid-area: product-short-description;
    padding-top: 10px;
    padding-bottom: 10px;
  }
  .product-page .product-deals {
    grid-area: product-deals;
    padding: 35px 40px 20px 35px;
  }
  .product-page .button.green.best-deal span {
    font-size:21px;
    font-weight:600;
    font-family: "Poppins";
  }
  .product-page .button.green.best-deal .beste-deal-button-text-small {
    font-weight: 400;
  }
  .product-page .product-deals-short {
    grid-area: product-deals-short;
    display: grid;
    grid-template-columns: 1fr;
    column-gap:15px;
    row-gap:0px;
    grid-template-rows: max-content max-content;
    grid-template-areas:
    "green-button"
    "explain-button"
  }
  .product-page .product-reviews {
    grid-area: product-reviews
  }
  .product-page .product-attributes {
    grid-area: product-attributes;
    padding: 45px 45px 25px 45px;
    grid-template-rows: max-content max-content;
    display: grid;
    row-gap: 35px;
  }
  .product-page .product-attributes > div:nth-child(2) {
    margin-top:-35px;
  }
  .product-page .button-green-productpage, .button-beste-deal {
    grid-area: green-button;
  }
  .product-page .button-explain-productpage {
    border: 0.5px solid #FFFFFF;
    box-shadow: none;
    border-radius: 5px;
    grid-area: explain-button;
    color: rgba(7, 7, 7, 0.7) !important;
  }
  .product-page .product-thumbnails-container {
    overflow-x: scroll;
    user-select: none;
    scrollbar-width: none; /* Firefox */

  }
  .product-page .product-thumbnails-container::-webkit-scrollbar {
    display: none;
  }
  .product-page .product-thumbnails {
    height: 100%;
    scroll-snap-type: y mandatory;
    flex-grow: 1;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    /*
    align-items: center;
    min-width:0;
    overflow-x: hidden;
    overflow-y: hidden;*/
    scroll-behavior: smooth;
    column-gap:10px;
  }
  .product-page .product-thumbnail {
    cursor: pointer;
    scroll-snap-align: start;
    height:100%;
    box-sizing: border-box;
    width:115px;
    min-width:115px;
    border:1px black solid;
    display:flex;
    justify-content:center;
  }
  .product-page .product-thumbnail img {
    max-width: 100%;
    max-height:100%;
    object-fit:contain;
    object-position:center;
    padding: 15px;
    box-sizing: border-box;
  }
  .product-page .product-thumbnail.active-thumbnail {
    border-color: red;
  }
  .product-page .image-area {
    display:grid;
    grid-template-rows: 500px 115px;
    row-gap: 15px;
    grid-area: image;
    background-color: white;
    border-radius: 15px;
  }
  .product-page .breadcrumbs.breadcrumbs-mobile {
    display: none;
  }
  @media (max-width: 768px) {
    .product-page .product-info > *:not(:last-child) {
      margin-bottom: 5px;
    }
    .product-page .breadcrumbs.breadcrumbs-mobile {
      display: flex;
    }
    .product-page .breadcrumbs.breadcrumbs-desktop {
      display: none;
    }
    .product-page .image-area {
      display:grid;
      grid-template-rows: 200px 75px;
    }
    .product-page .product-thumbnail {
      min-width: 75px;
    }
  }
  .product-page .main-image-area {
    align-self: center;
    display:flex;
    justify-content:center;
    height:100%;
    width:100%;
  }
  .product-page .main-image-area img {
    max-width:100%;
    max-height:100%;
    object-position: center;
    object-fit: contain;
  }
  .product-page .modal {
    display: none; /* Hidden by default */
    position: fixed; /* Stay in place */
    z-index: 1; /* Sit on top */
    left: 0;
    top: 0;
    width: 100%; /* Full width */
    height: 100%; /* Full height */
    overflow: auto; /* Enable scroll if needed */
    background-color: rgb(0,0,0); /* Fallback color */
    background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
  }

  /* Modal Content/Box */
  .product-page .modal-content {
    background-color: #fefefe;
    margin: 15% auto; /* 15% from the top and centered */
    padding: 20px;
    border: 1px solid #888;
    width: 80%; /* Could be more or less, depending on screen size */
    max-width:400px;
  }
  .product-page .attribute-name, .product-page .attribute-value {
    align-items: center;
    align-self: center;
    display: flex;
    flex-wrap: wrap;
    flex: 1 1;
    overflow: hidden;
    padding: 8px 0;
  }
  .product-page .button.more-info {
    font-size: 16px;
    margin-top: 10px;
    padding: 12px 45px 12px 50px;
    width:max-content;
  }
  .product-page .button.more-info i {
    font-size: 20px;
    padding-left: 10px;
    color: #464643
  }
  .product-page .product-rating i{
    font-size:24px !important
  }
  .product-page .related-attribute-label,
  .product-page .product-short-description,
  .product-page .product-description{
    line-break: loose;
    word-break: break-word;
  }
 @media (max-width: 768px) {
    .product-page h1 {
      font-size: 22px;
    }
    .product-page h2 {
      font-size: 20px;
    }
    .product-page .product-short-description {
      display:none;
    }
    .product-page .product-description {
      padding: 40px 15px;
    }
    .product-page .button.more-info {
      padding: 12px 25px 12px 25px;
      width:auto;
    }
    .product-page .product-deals,
    .product-page .price-history,
    .product-page .related-products,
    .product-page .videos {
      padding: 35px 15px 20px 15px;
    }
    .product-page .product-attributes {
      grid-area: product-attributes;
      padding: 45px 15px 25px 15px;
    }
    .product-page .product-info-header {
      padding: 0
    }
    .product-page .product-rating {
      max-height: 38px;
    }
    .product-page {
      display:grid;
      grid-template-columns: 1fr;
      column-gap:15px;
      row-gap:0;
      grid-template-rows: max-content;
      grid-template-areas:
      "breadcrumbs"
      "product-title"
      "product-rating"
      "image"
      "product-short-description"
      "product-deals-short"
      "related-links"
      "related-products-thumbnails"
      "product-info-header"
      "product-description-deals"
      "related-products"
      "videos"
      "product-attributes"
      "gismap"
      "product-reviews"
    }
    .product-page .product-info {
      display: contents;
    }
  }
   @media (max-width: 360px) {
    .product-page .related-products-container .related-products-thumbnails {
      grid-template-columns: 1fr 1fr;
    }
    .product-page .button.more-info {
      font-size: 14px;
    }
    .product-page .product-deals .stores .store-item .store-name {
       display:none;
    }
    .product-page h2 {
      font-size: 20px;
    }
   }
</style>
