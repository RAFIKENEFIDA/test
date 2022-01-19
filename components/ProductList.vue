<template>
  <div class="product-list">
    <div v-for="(item,index) in products" :key="index" class="product-item">
      <nuxt-link :to="`/product/${item.slug}`" class="remove-style">
        <div class="product-item-details">
          <div class="product-image">
            <img
              :src="item.image.filename"
              style="height:auto;display:block; max-width:100%;align-self:center;max-height:150px"
              @error="(e) => onerrorImage(e,item.image.originalSource)"
            >
          </div>
          <div class="bold product-item-title">
            {{ item.name }}
          </div>
          <div v-if="item.numReviews > 0" class="product-rating">
            <template v-for="starRating of [1,2,3,4,5]">
              <i v-if="(item.reviewScore||0) >= starRating" :key="starRating" class="material-icons-round star-full" style="max-width:20px">star</i>
              <i v-else-if="(item.reviewScore||0) > starRating - 1" :key="starRating" class="material-icons-round star-half" style="max-width:20px">star_half</i>
              <i v-else :key="starRating" class="material-icons-round star-outline" style="max-width:20px">star_outline</i>
            </template>
            ({{ item.numReviews }})
          </div>
          <div class="product-brand">
            <div class="button red">
              <span>{{ item.brand }}</span>
            </div>
          </div>
          <div v-if="false" dense class="product-item-attributes">
            <div
              v-for="(key, keyIndex) in filteredKeys"
              :key="keyIndex"
              class="attribute-item"
            >
              <div class="attribute-name">
                {{ key.text }}:
              </div>
              <div
                class="attribute-value align-end"
              >
                {{ item[key.value.toLowerCase()] }}
              </div>
            </div>
          </div>
          <div class="product-item-price">
            <div class="product-price">
              {{ formatPrice(item.price) }}<span class="best-price">/beste prijs</span>
            </div>
          </div>
        </div>
      </nuxt-link>
    </div>
  </div>
</template>

<script>

export default {
  props: {
    products: { type: Array, default: () => { return [] } }
  },

  data () {
    /*
    for (const product of this.products) {
      product.reviewScore = 4.5
      product.numReviews = 1
    } */
    return {
      keys: [
        { value: 'name', text: 'Titel' },
        { value: 'price', text: 'Prijs' },
        { value: 'brand', text: 'Merk' },
        { value: 'score', text: 'Relevantie' }
      ],
      localItems: this.localItems || [],
      noResults: 'Geen producten gevonden',
      numImageErrors: 0
    }
  },
  computed: {
    filteredKeys () {
      return this.keys.filter(key => key.value !== 'name' && key.value !== 'price' && key.value !== 'score')
    }
  },

  methods: {
    onerrorImage (e, originalSource) {
      this.numImageErrors++
      if (e.target.src !== originalSource && this.numImageErrors < 100) {
        e.target.src = originalSource
      }
    },
    formatPrice (price) {
      const whole = Math.floor(price)
      const cents = price - whole
      if (cents === 0) {
        return `€${whole}`
      } else {
        const centsText = Math.round(cents * 100).toFixed(0).padStart(2, '0')
        return `€${whole}.${centsText}`
      }
    }
  }
}
</script>
<style lang="css" >
  .product-list .product-rating {
    grid-area: product-rating;
    display:flex;
    padding: 5px 0;
  }
  .product-list .product-item-price {
    justify-content:flex-end;
    font-size: 26px;
  }
  .product-list .product-item-price .best-price {
    font-size: 14px;
  }
  .product-list .product-brand {
    grid-area: product-brand;
    padding: 5px 0 15px 0;
  }
  .product-list .product-brand .button {
    padding: 0 15px;
    width: 100%;
    background: linear-gradient(321.69deg, #FF6188 0%, #FFB199 100%);
    border-radius: 4px;
    max-width: max-content;
  }
  .product-list .product-brand .button span {
    font-family: Open Sans;
    font-weight: bold;
    font-size: 10px;
    line-height: 25px;
    text-align: center;
    letter-spacing: 0.2em;
    text-transform: uppercase;
  }
  .product-list .product-rating i {
    font-size: 18px !important;
  }
  .product-list .product-item-details {
    display: flex!important;
    flex-direction: column;
    height: 100%;
  }
  .product-list .product-item-title {
    overflow-wrap: anywhere;
    font-size:18px;
  }

  .product-list .attribute-item {
    align-items: center;
    display: flex;
    flex: 1 1 100%;
    letter-spacing: normal;
    min-height: 48px;
    outline: none;
    padding: 0 0;
    position: relative;
    text-decoration: none;
  }
  .product-list .attribute-name, .attribute-value {
    align-items: center;
    align-self: center;
    display: flex;
    flex-wrap: wrap;
    flex: 1 1;
    overflow: hidden;
    padding: 8px 0;
  }
  .product-list .align-end {
    align-items: flex-end!important;
  }
  .product-list {
    display:grid;
    grid-template-columns: 1fr;
    row-gap:15px;
    column-gap: 10px;
    padding-left:0;
    padding-right:0;
  }
  .product-list .product-item {
    background-color: white;
    border-radius: 15px;
    transition: all .2s ease 0s;
  }
  .product-list .product-item a {
    padding: 35px 30px 15px 30px;
    display: block;
    height: 100%;
    width: 100%;
    box-sizing: border-box;
  }
  .product-list .product-item:hover {
    box-shadow: rgb(14 14 14 / 25%) 0px 0px 8px 0px;
    transform: translateY(-2px);
  }
  .product-list .product-item-details {
    display: flex !important;
    flex-direction:column;
    height:100%;
  }
  .product-list .product-item-title {
    align-content:start;
    flex-grow:0;
    padding-top:20px;
  }
  .product-list .product-item-attributes {
    flex-grow: 0;
  }
  .product-list .product-item .product-image {
    display:grid;
    justify-items: center;
    flex-grow: 1;
  }

  @media (min-width: 320px) {
    .product-list {
      grid-template-columns: 1fr;
    }
  }

  @media (min-width: 480px) {
    .product-list {
      grid-template-columns: 1fr 1fr;
    }
  }

  @media (min-width: 600px) {
    .product-list {
      grid-template-columns: 1fr 1fr;
    }
  }
  @media (min-width: 768px) {
    .product-list {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }

  @media (min-width: 960px) {
    .product-list {
      grid-template-columns: 1fr 1fr 1fr;
    }
  }
  @media (min-width: 1264px) {
    .product-list {
      grid-template-columns: 1fr 1fr 1fr 1fr;
    }
  }
  @media (min-width: 1904px) {
    .product-list {
      grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    }
  }
</style>
