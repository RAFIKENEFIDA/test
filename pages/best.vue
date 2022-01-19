<template>
  <div>
    <the-breadcrumbs :items="breadcrumbItems" />
    <h1>{{ brand ? brand.brand : "Zoek de beste deals" }}</h1>
    <div v-if="brand" class="brand-description">
      {{ brand.description }}
      aantal producten: {{ brand.numProducts }} gemiddelde score:
      {{ brand.averageProductScore }} aantal reviews:
      {{ brand.numProductReviews }}
    </div>
    <div class="search" style="margin-top: 20px; margin-bottom: 15px">
      <input
        v-model="search"
        type="text"
        autocomplete="off"
        placeholder="Zoek product"
        class="search is-rounded"
        style="min-width: 400px"
        @change="updateSearch()"
      />
      <span class="icon"><i class="search-icon material-icons">search</i></span>
    </div>
    <div class="best-list">
      <div v-for="(product, i) of products" :key="i" class="product-item">
        <div class="product-image">
          <img :src="product.image" />
        </div>
        <div class="product-info">
          <div class="product-title">
            <nuxt-link :to="`/product/${product.slug}`" class="remove-style">
              {{ product.name }}
            </nuxt-link>
          </div>
          <div class="product-brand" style="color: #6e798c">
            {{ product.brand }}
          </div>
        </div>
        <div class="product-price">
          <div class="price-header">
            <div class="badge">
              <div class="rank">
                <div>
                  <div>
                    {{ i + 1 }}
                  </div>
                </div>
              </div>
              <img src="/badge.svg" />
            </div>
          </div>
          <div class="price-links">
            <div class="button green large beste-deal-button" style="">
              <span>Beste deal voor {{ formatPrice(product.price) }}</span>
            </div>
            <div class="button red large beste-deal-info">
              <span>?</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import TheBreadcrumbs from "~/components/TheBreadcrumbs.vue";
import { getListingData, getBrand } from "~/components/API.js";
const imageWidth = 125;
const imageHeight = 125;
export default {
  components: {
    TheBreadcrumbs,
  },
  async asyncData({ params, query, error }) {
    const brandSlug = params.brand || "";
    let brand;
    let brandName = "";
    let breadcrumbItems = [
      {
        text: "Home",
        disabled: false,
        href: "/",
      },
      {
        text: "Producten",
        disabled: true,
        href: "/products",
      },
    ];

    if (brandSlug) {
      brand = await getBrand({ slug: brandSlug });
      if (!brand) {
        error({ statusCode: 404, message: "Page not found" });
      }
      brandName = brand.brand;
      breadcrumbItems = [
        {
          text: "Home",
          disabled: false,
          href: "/",
        },
        {
          text: "Producten",
          disabled: false,
          href: "/products",
        },
        {
          text: "Brands",
          disabled: false,
          href: "/brands",
        },
        {
          text: brand.brand,
          disabled: true,
          href: `/brand/${brand.slug}`,
        },
      ];
    }
    const search = query.search || "";
    const sortBy = query.sortBy || "name";
    const previousSearch = search;
    const page = parseInt(query.page) || 1;
    const productsPerPage = 20;
    const { count, products } = await getListingData({
      limit: 20,
      page,
      search,
      sortBy,
      desc: false,
      brand: brandName,
      imageWidth,
      imageHeight,
    });
    return {
      sortBy,
      search,
      previousSearch,
      count,
      products,
      page,
      productsPerPage,
      brand,
      brandName,
      breadcrumbItems,
    };
  },
  data() {},
  watch: {
    $route(to, from) {
      this.isLoading = false;
      this.updateFromQuery();
    },
  },
  beforeMount() {
    window.addEventListener("scroll", this.handleScroll);
  },
  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  },
  methods: {
    formatPrice(price) {
      const whole = Math.floor(price);
      const cents = price - whole;
      if (cents === 0) {
        return `€${whole},-`;
      } else {
        const centsText = Math.round(cents * 100)
          .toFixed(0)
          .padStart(2, "0");
        return `€${whole},${centsText}`;
      }
    },
    updateQuery() {
      const query = { ...this.$route.query };
      query.page = this.page;

      if (this.search) {
        query.search = this.search;
      } else {
        delete query.search;
      }

      if (this.sortBy !== "name") {
        query.sortBy = this.sortBy;
      } else {
        delete query.sortBy;
      }

      if (this.sortDesc && this.sortBy !== "score") {
        query.desc = true;
      } else {
        delete query.desc;
      }

      const pushRoute =
        query.search !== this.$route.query.search ||
        query.sortBy !== this.$route.query.sortBy ||
        query.sortDesc !== this.$route.query.sortDesc;
      if (pushRoute) {
        this.$router.push({ path: this.$route.path, query });
      } else {
        this.$router.replace({ path: this.$route.path, query });
      }
    },
    updateFromQuery() {
      this.search = this.$route.query.search || this.search;
      this.sortBy = this.$route.query.sortBy || this.sortBy;
      this.page = parseInt(this.$route.query.page) || this.page;
      this.updateSearch(false);
    },
    async updateSearch(updateQuery = true) {
      this.isLoading = false;
      if (this.search !== this.previousSearch) {
        this.page = 1;
        if (!this.search) {
          this.sortBy = "name";
        } else {
          this.sortBy = "score";
        }
        this.previousSearch = this.search;
        if (updateQuery) {
          this.updateQuery();
        }

        const { products } = await getListingData({
          limit: 20,
          page: this.page,
          search: this.search,
          sortBy: this.sortBy,
          desc: false,
          brand: this.brandName,
          imageWidth,
          imageHeight,
        });

        this.products = products;
      }
    },
    handleScroll(event) {
      // console.log('scroll scroll scroll')
      // console.log(document.documentElement.scrollTop, window.innerHeight, document.documentElement.scrollTop + window.innerHeight, document.documentElement.offsetHeight)
      // Any code to be executed when the window is scrolled
      if (
        document.documentElement.scrollTop + window.innerHeight >=
        document.documentElement.offsetHeight - 400
      ) {
        this.loadMorePages();
      }
    },
    async loadMorePages() {
      if (!this.isLoading && this.products.length) {
        this.isLoading = true;

        const { products } = await getListingData({
          limit: 20,
          page: this.page + 1,
          search: this.search,
          sortBy: this.sortBy,
          desc: false,
          brand: this.brandName,
          imageWidth,
          imageHeight,
        });

        if (products.length > 0) {
          this.page = this.page + 1;
          this.updateQuery();
          // this.$router.replace({ path: this.$router.history.current.path, query: { page: this.page } })
        }
        for (const product of products) {
          this.products.push(product);
        }

        setTimeout(
          () => {
            this.isLoading = false;
          },
          products.length > 0 ? 300 : 300000
        );
      }
    },
  },

  head() {
    return {
      title: "Zoek de beste deals",
    };
  },
};
</script>
<style lang="css">
/*. */
.best-list {
  display: grid;
  row-gap: 10px;
  grid-template-columns: 1fr;
}
.best-list .badge {
  position: relative;
  top: -15px;
}
.best-list .product-title {
  font-family: "Poppins";
  font-weight: 500;
  font-size: 20px;
}
.best-list .badge .rank {
  position: relative;
  top: -30px;
  right: -39px;
  display: inline-block;
  width: 30px;
  color: white;
  font-family: "Open Sans";
  font-weight: 800;
  font-size: 17px;
}
.best-list .badge .rank > div {
  display: grid;
  justify-content: center;
}
.best-list .product-image {
  padding-top: 20px;
  padding-bottom: 20px;
  grid-area: product-image;
  min-width: 150px;
  height: 125px;
  display: grid;
  justify-content: center;
  align-content: center;
}
.best-list .product-info {
  grid-area: product-info;
  padding-top: 30px;
  padding-left: 20px;
}
.best-list .product-price {
  grid-area: product-price;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80% 20%;
  grid-template-areas:
    "price-header"
    "price-links";
}
.best-list .price-header {
  grid-area: price-header;
  display: grid;
  justify-items: right;
  padding-right: 20px;
}
.best-list .price-links {
  grid-area: price-links;
  display: flex;
  align-items: center;
  padding-right: 10px;
  justify-content: flex-end;
}
.best-list .product-price .button {
  position: relative;
  top: calc(100% - 50px);
}
.best-list .product-price .button.beste-deal-button {
  border-radius: 4px;
  font-style: normal;
  line-height: 25px;
  text-align: center;
  background: #2ecc71;
  display: inline;
  max-width: 260px;
  width: 320px;
  margin-right: 10px;
  padding: 10px;
  font-weight: 700;
  font-family: "Open Sans";
  text-transform: uppercase;
  font-size: 13px !important;
  letter-spacing: 0.18em;
  margin-right: 25px;
}
.best-list .beste-deal-info {
  display: inline;
  width: 20px;
  padding: 10px 15px;
  margin-right: 5px;
  font-family: "Open Sans";
  font-weight: bold;
  font-size: 14px;
  text-align: center;
  color: #ffffff;
  border-radius: 18px;
  background: linear-gradient(321.69deg, #ff6188 0%, #ffb199 100%);
}
.best-list .product-item {
  display: grid;
  background: white;
  border-radius: 15px;
  grid-template-columns: max-content 1fr 450px;
  grid-template-areas: "product-image product-info product-price";
  padding-right: 40px;
  padding-left: 25px;
  padding-bottom: 15px;
  padding-top: 15px;
  padding: 15px 40px 15px 25px;
}
.best-list .breadcrumbs {
  grid-area: breadcrumbs;
}
.best-list .product-list {
  padding-left: 0;
  padding-right: 0;
}
.best-list .search {
  position: relative;
}
.best-list .search .icon {
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
.best-list input.search {
  min-width: 400px;
  padding: 0 calc((0.75em - 1px) + 0.375em) 0 2.5em;
  border-radius: 290486px;
  box-shadow: inset 0 0.0625em 0.125em hsla(0, 0%, 4%, 0.05);
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
.best-list input.search:hover {
  border-color: #b5b5b5;
}
.best-list input.search:active,
input.search:focus {
  border-color: #ee2e6354;
  box-shadow: 0 0 0 0.125em rgb(238 46 99 / 22%);
  outline: none;
}
</style>
