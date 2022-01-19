<template>
  <div class="product-list-page">
    <the-breadcrumbs :items="breadcrumbItems" />
    <h1 v-if="category">
      {{ categoryName }}
    </h1>
    <h1 v-if="brand">
      {{ brandName }}
    </h1>
    <h1 v-else>
      {{ 'Zoek de beste deals' }}
    </h1>
    <div v-if="brand" class="brand-description">
      {{ brand.description }}
      aantal producten: {{ brand.numProducts }}
      gemiddelde score: {{ brand.averageProductScore }}
      aantal reviews: {{ brand.numProductReviews }}
    </div>
    <!-- <div class="search" style="margin-top:20px;margin-bottom:25px">
      <input

        type="text"
        autocomplete="off"
        placeholder="Zoek product"
        class="search is-rounded"
        @change="updateSearch()"
      >
      <span class="icon"><i class="search-icon material-icons">search</i></span>
    </div> -->
    <div class="product-list-header" style="width:100%; margin-bottom:5px">
      <div class="sort" style="">
        <label for="sort">sort:</label>
        <select id="sort" name="sort" :value="$store.state.search.sortValue" @change="changeSelect">
          <option value="relevance">
            RELEVANTIE ↓
          </option>
          <option value="price_asc">
            PRIJS ↑
          </option>
          <option value="price_desc">
            PRIJS ↓
          </option>
        </select>
      </div>
    </div>
    <div v-if="showLoadPrevious" class="load-more">
      <div class="button large load-more-button" @click="loadPreviousPages()">
        Laad vorige
      </div>
    </div>
    <product-list
      :products="products"
    />
    <div v-if="showLoadNext" class="load-more">
      <div class="button large load-more-button" @click="loadNextPages()">
        Laad volgende
      </div>
    </div>
    <style v-if="layout && layout.css" type="text/css">
      {{ layout.css }}
    </style>
  </div>
</template>
<script>
import TheBreadcrumbs from '~/components/TheBreadcrumbs.vue'
import { getBrand, getCategory, getLayout } from '~/components/API.js'
export default {
  components: {
    TheBreadcrumbs
  },
  async asyncData ({ params, query, error, store, route, app }) {
    const layout = await getLayout('category_page')

    const brandSlug = params.brand || query.brand || ''
    const categorySlug = params.category || query.category || ''
    let brand
    let category
    let brandName = ''
    let categoryName = ''
    let breadcrumbItems = [
      {
        text: 'Home',
        disabled: false,
        href: '/'
      },
      {
        text: 'Alle producten',
        disabled: true,
        href: '/category/alle-producten'
      }]

    if (brandSlug) {
      brand = await getBrand({ slug: brandSlug })
      if (!brand || brand.found === false) {
        error({ statusCode: 404, message: 'Page not found' })
      } else {
        brandName = brand.brand
        breadcrumbItems = [
          {
            text: 'Home',
            disabled: false,
            href: '/'
          },
          {
            text: 'Alle producten',
            disabled: false,
            href: '/category/alle-producten'
          },
          {
            text: `Brand: ${brand.brand}`,
            disabled: true,
            href: `/brand/${brand.slug}`
          }]
      }
    }

    if (categorySlug) {
      category = await getCategory({ slug: categorySlug })
      if (!category) {
        error({ statusCode: 404, message: 'Page not found' })
      } else {
        categoryName = category.name
        breadcrumbItems = [
          {
            text: 'Home',
            disabled: false,
            href: '/'
          },
          ...category.breadcrumbs]
      }
    }
    await store.dispatch('search/updateFromQueryParam', { params, query })
    // updateQuery({ router: app.router, route, store })
    return {
      brand,
      brandName,
      brandSlug,
      category,
      categoryName,
      categorySlug,
      breadcrumbItems,
      layout
    }
  },
  data () {
    return {
    }
  },
  head () {
    if (this.brand) {
      return {
        titleTemplate: '%s',
        title: `De beste deals van ${this.brandName}`
      }
    } else if (this.category) {
      return {
        titleTemplate: '%s',
        title: `${this.categoryName} categorie - Zoek de beste deals `
      }
    }
    return {
      title: 'Zoek de beste deals'
    }
  },
  computed: {
    products () {
      return this.$store.state.search.products
    },
    count () {
      return this.$store.state.search.count
    },
    showLoadPrevious () {
      return this.$store.state.search.loadedPages[0] > 1
    },
    showLoadNext () {
      return (!this.reachedEnd &&
      this.products.length < this.count // &&
      // (this.page - 1) * this.productsPerPage + this.products.length < this.count)
      )
    }
  },
  watch: {
    $route (to, from) {
      this.$store.dispatch('search/updateFromQueryParam', { params: to.params, query: to.query })
    }
  },
  /*
  beforeMount () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  }, */
  methods: {
    async changeSelect (e) {
      await this.$store.dispatch('search/updateSort', e.target.value)
      this.updateQuery()
    },
    updateQuery () {
      const query = this.$store.state.search.query
      const params = this.$store.state.search.params
      const pushRoute = query.search !== this.$route.query.search ||
                    query.sortBy !== this.$route.query.sortBy ||
                    query.order !== this.$route.query.order
      if (pushRoute) {
        this.$router.push({ path: this.$route.path, query, params })
      } else {
        this.$router.replace({ path: this.$route.path, query, params })
      } /* */
    },
    /* handleScroll (event) {
      // console.log('scroll scroll scroll')
      // console.log(document.documentElement.scrollTop, window.innerHeight, document.documentElement.scrollTop + window.innerHeight, document.documentElement.offsetHeight)
      // Any code to be executed when the window is scrolled
      if (document.documentElement.scrollTop + window.innerHeight >= document.documentElement.offsetHeight - 400) {
        // this.loadMorePages()
      }
    }, */
    async loadPreviousPages () {
      await this.$store.dispatch('search/loadPreviousPage')
      this.updateQuery()
    },
    async loadNextPages () {
      await this.$store.dispatch('search/loadNextPage')
      this.updateQuery()
    }
  }
}
</script>

<style lang="css" >
  .product-list-page .breadcrumbs {
    grid-area: breadcrumbs;
  }
  .product-list-page .product-list {
    padding-left:0;
    padding-right:0;

  }
  .product-list-page  .search {
    position:relative;
  }
  .product-list-page .load-more {
    padding: 40px;
    display:grid;
    justify-content:center;
    user-select: none;
  }
  .product-list-page .search .icon {
    align-items: center;
    display: inline-flex;
    justify-content: center;
    left: 0;
    color: #dbdbdb;
    height: 2.5em;
    pointer-events: none;
    position: absolute;
    top: 0;
    width: 2.5em;
    z-index: 4;
  }
  .product-list-page input.search {
    width: calc(100% - (.75em - 1px) - .375em - 2.5em);
    padding: 0 calc((.75em - 1px) + .375em) 0 2.5em;
    border-radius: 290486px;
    box-shadow: inset 0 0.0625em 0.125em hsla(0,0%,4%,.05);
    background-color: #fff;
    border-color: #dbdbdb;
    color: #363636;
    align-items: center;
    border: 1px solid #dbdbdb;
    display: inline-flex;
    font-size: 1rem;
    height: calc(2.5em - 2px);
    justify-content: flex-start;
    line-height: 1.5;
    position: relative;
    vertical-align: top;
  }
  .product-list-page .product-list-header {
    width: 100%;
    margin-bottom: 5px;
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
  @media (min-width: 960px) {
    .product-list-page  input.search {
      width:400px;
    }
  }

  /*
  .product-list-page input.search:hover {
    border-color: #b5b5b5;
  }
  .product-list-page input.search:active, input.search:focus {
    border-color: #ee2e6354;
    box-shadow: 0 0 0 0.125em rgb(238 46 99 / 22%);
    outline: none;
  } */
</style>
