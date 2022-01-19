<template>
  <div class="app">
    <client-only>
      <cookie />
    </client-only>
    <div
      v-if="OpenNavbaMobile"
      class="MobileNabBar"
      :style="
        CategorieenClicked
          ? 'height:100%;position: absolute;'
          : 'height:100vh;position:fixed;'
      "
    >
      <div class="MobileNabBar__Exit">
        <img
          @click="OpenNavbaMobile = false"
          src="../assets/Img/Exit.png"
          alt=""
        />
      </div>
      <div class="MobileNabBar__Link">
        <div class="MobileNabBar__Zone">
          <img src="../assets/Img/FirstPlaceRibbon.png" alt="" />
          <nuxt-link
            to="/toppers"
            class="remove-style header-text"
            style="font-family: 'Poppins'"
          >
            Toppers ✨
          </nuxt-link>
        </div>
      </div>
      <div class="MobileNabBar__Link">
        <div
          class="MobileNabBar__Zone"
          @click="
            CategorieenClicked
              ? (CategorieenClicked = false)
              : (CategorieenClicked = true)
          "
        >
          <img src="../assets/Img/Sorting.png" alt="" />
          <nuxt-link
            to="/toppers"
            class="remove-style header-text"
            style="font-family: 'Poppins'"
          >
            Categorieen
          </nuxt-link>
          <img
            v-if="!CategorieenClicked"
            class="DropwDownIcons"
            src="../assets/Img/VectorDown.png"
            alt=""
          />
          <img
            v-if="CategorieenClicked"
            class="DropwDownIcons"
            src="../assets/Img/VectorUp.png"
            alt=""
          />
        </div>
        <div v-if="CategorieenClicked" class="CategoryNavbar">
          <div class="CategoryNavbar__Item" v-for="n in 11" :key="n">
            <nuxt-link
              to=""
              class="remove-style header-text"
              style="font-family: 'Poppins'"
            >
              <img src="../assets/Img/Ellipse.png" alt="" />
              Test
            </nuxt-link>
          </div>
        </div>
      </div>
      <div class="MobileNabBar__Link">
        <div class="MobileNabBar__Zone">
          <img src="../assets/Img/NewProduct.png" alt="" />
          <nuxt-link
            to="/toppers"
            class="remove-style header-text"
            style="font-family: 'Poppins'"
          >
            Producten
          </nuxt-link>
        </div>
      </div>
      <div class="MobileNabBar__Link">
        <div class="MobileNabBar__Zone">
          <img src="../assets/Img/PriceTag.png" alt="" />
          <nuxt-link
            to="/toppers"
            class="remove-style header-text"
            style="font-family: 'Poppins'"
          >
            Merken
          </nuxt-link>
        </div>
      </div>
    </div>
    <header
      class="rovara-header"
      :style="SearchClicked ? 'height:140px' : 'height:80px'"
    >
      <div
        class="header-content container"
        style="height: 80px; padding: 4px 12px"
      >
        <nuxt-link
          to="/"
          :class="{ 'force-show-search': showSearch }"
          class="logo"
        >
          <img
            alt="Rovara"
            height="50px"
            src="/Rovara.svg"
            class="header-logo"
          />
        </nuxt-link>
        <div
          :class="{ 'force-show-search': showSearch }"
          class="search SearchDescktop"
        >
          <input
            v-model="searchText"
            type="text"
            autocomplete="off"
            placeholder="Zoek op product of EAN"
            class="is-rounded"
            @keyup.enter="newSearch()"
          />
          <span
            class="icon"
            style="cursor: pointer; user-select: none"
            @click="newSearch()"
            ><i class="search-icon material-icons">search</i></span
          >
        </div>
        <div class="header-links">
          <nuxt-link
            to="/toppers"
            class="remove-style header-text"
            style="font-family: 'Poppins'"
          >
            Producten
          </nuxt-link>
        </div>
        <div class="header-links">
          <nuxt-link
            to="/toppers"
            class="remove-style header-text"
            style="font-family: 'Poppins'"
          >
            Merken
          </nuxt-link>
        </div>
        <div class="header-links HeaderBtn">
          <nuxt-link
            to="/toppers"
            class="remove-style header-text"
            style="font-family: 'Poppins'"
          >
            Toppers ✨
          </nuxt-link>
        </div>
        <div class="MobileHeaderBurger">
          <div
            v-if="!SearchClicked"
            class="SearchHeader"
            @click="SearchClicked = true"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="30px"
              viewBox="0 0 24 24"
              width="30px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
          </div>
          <div
            v-if="SearchClicked"
            class="SearchHeader"
            @click="SearchClicked = false"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="#000000"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12 19 6.41z"
              />
            </svg>
          </div>
          <div class="BurgerMenu" @click="OpenNavbaMobile = true">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>
      <div
        v-if="SearchClicked"
        :class="{ 'force-show-search': showSearch }"
        class="search SearchMobile"
      >
        <input
          v-model="searchText"
          type="text"
          autocomplete="off"
          placeholder="Zoek op product of EAN"
          class="is-rounded"
          @keyup.enter="newSearch()"
        />
        <span
          class="icon"
          style="cursor: pointer; user-select: none"
          @click="newSearch()"
          ><i class="search-icon material-icons">search</i></span
        >
      </div>
    </header>
    <main>
      <div
        class="main-wrap"
        :class="{
          'product-page-wrap': isProductPage,
          'homepage-page-wrap': isHomepage,
          'toppers-page-wrap': isToppersListPage,
        }"
        style="width: 100%"
      >
        <div class="container" style="height: 100%">
          <nuxt />
        </div>
      </div>
    </main>
    <footer
      :absolute="false"
      color="white"
      class="rovara-footer"
      style="height: 100%; max-height: 145px"
    >
      <div class="container" style="color: white; font-weight: bold">
        <div class="footer-copyright">
          &copy; {{ new Date().getFullYear() }} Rovara. All rights reserved -
          <nuxt-link class="privacy-statement" to="/page/privacy-policy">
            <!-- <div class="button button-privacy-statement" style="margin-left:10px">
              <span></span>
            </div> -->
            Geen 🍪 op deze website
          </nuxt-link>

          <nuxt-link class="privacy-statement" to="/page/algemene-voorwaarden">
            <!-- <div class="button button-privacy-statement" style="margin-left:10px">
              <span></span>
            </div> -->
          </nuxt-link>
        </div>
        <div class="footer-email">
          <a href="mailto:help@rovara.nl"
            >&#9993;&#65039;&nbsp;help@rovara.nl</a
          >
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
import Cookie from "~/components/Cookie.vue";

import { pageLoad } from "~/components/API.js";
export default {
  components: {
    Cookie,
  },
  data(ctx) {
    return {
      searchText: this.$store.state.search.search,
      showSearch: this.$store.state.search.search !== "",
      isToppersListPage: this.$router.currentRoute.name === "toppers",
      isProductPage: this.$router.currentRoute.name === "product-slug",
      isHomepage: this.$router.currentRoute.name === "index",
      clipped: true,
      drawer: false,
      fixed: false,
      items: [
        {
          icon: "mdi-apps",
          title: "Products",
          to: "/products",
        },
      ],
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: "Rovara",
      CategorieenClicked: false,
      OpenNavbaMobile: false,
      SearchClicked: false,
    };
  },
  watch: {
    $route(to, from) {
      this.isToppersListPage = this.$router.currentRoute.name === "toppers";
      this.isProductPage = this.$router.currentRoute.name === "product-slug";
      this.isHomepage = this.$router.currentRoute.name === "index";
      this.searchText = this.$store.state.search.search;
      if (window && process.env.NODE_ENV !== "development") {
        pageLoad({
          ua: navigator.userAgent,
          url: to.fullPath,
          fromUrl: from.fullPath,
          toUrl: to.fullPath,
          referrer: document.referrer,
        });
      }
    },
  },
  mounted() {
    if (
      window &&
      navigator &&
      process.env.NODE_ENV !== "development" &&
      !navigator.userAgent.includes("bot")
    ) {
      pageLoad({
        ua: navigator.userAgent,
        url: window.location.pathname,
        referrer: document.referrer,
        fromUrl: "",
        toUrl: this.$router.currentRoute.fullPath,
      });
    }
  },
  methods: {
    async newSearch() {
      // await updateSearch({ $store: this.$store, search: this.searchText })

      if (
        this.$router.currentRoute.name !== "category-all" &&
        this.$router.currentRoute.name !== "brand-brand"
      ) {
        // this.$router.push({ path: this.$route.path, query })
        // this.$router.push({ name: 'category-all', params: { category: 'alle-producten' }, query: { search: this.searchText } })
        await this.$store.dispatch("search/search", {
          search: this.searchText,
          category: "alle-producten",
        });

        this.$router.push({
          name: "category-all",
          params: this.$store.state.search.params,
          query: this.$store.state.search.query,
        });
      } else {
        await this.$store.dispatch("search/search", {
          search: this.searchText,
        });

        this.$router.push({
          path: this.$route.path,
          params: this.$store.state.search.params,
          query: this.$store.state.search.query,
        });
      }
      /* else {
        const name = this.$router.currentRoute.name
        const params = this.$router.currentRoute.params
        const query = this.$router.currentRoute.query
        query.search = this.search
        this.$router.push({ name, params, query })
        console.log('PUSH', name, params, query)
      }
      console.log(this.$router)
      console.log(this.$router.currentRoute.name) */
    },
  },
};
</script>
<style lang="css">
.CategoryNavbar__Item {
  padding-left: 60px;
}
.CategoryNavbar__Item a {
  display: flex;
  align-items: center;
  padding: 30px 0px;
  font-size: 17px !important;
  font-weight: 200 !important;
}
.CategoryNavbar__Item a img {
  width: 25px !important;
}
.MobileNabBar {
  width: 100%;
  background-color: #eeeeee;
  z-index: 10000;
}
.DropwDownIcons {
  width: 30px !important;
  position: absolute;
  right: 0 !important;
}
.MobileNabBar__Exit {
  padding: 30px 20px;
  text-align: -webkit-right;
  border: 1px solid #727171;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.36);
  text-align: -moz-right;
}
.MobileNabBar__Exit img {
  width: 50px;
}
.MobileNabBar__Zone {
  display: flex;
  align-items: center;
}
.MobileNabBar__Link {
  padding: 20px 20px;
  border-bottom: 1px solid #727171;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.36);
  position: relative;
}
.MobileNabBar__Link img {
  width: 70px;
  margin: 0px 39px 0px 100px;
}
.MobileNabBar__Link a {
  color: #34294b !important;
  font-size: 35px !important;
  font-weight: 700 !important;
}

.SearchMobile input {
  width: -webkit-fill-available !important;
  width: -moz-available !important;
}
.MobileHeaderBurger {
  display: none;
}
.HeaderBtn {
  border: 1px solid white;
  padding: 15px 20px;
  border-radius: 10px;
}

@media (max-width: 600px) {
  .MobileNabBar__Link .MobileNabBar__Zone img {
    width: 50px !important;
    margin: 0px 20px 0px 20px !important;
  }
  .MobileNabBar__Link .MobileNabBar__Zone a {
    font-size: 24px !important;
  }
  .MobileNabBar__Link .MobileNabBar__Zone .DropwDownIcons {
    width: 20px !important;
  }
  .CategoryNavbar__Item a img {
    width: 17px !important;
    margin: 0px 20px 0px 0px !important;
  }
  .CategoryNavbar__Item a {
    font-size: 25px !important;
    padding: 20px 0px;
  }
}
.header-text {
  color: white !important;
}
@media (max-width: 1024px) {
  .header-links,
  .SearchDescktop {
    display: none;
  }
  .MobileHeaderBurger {
    display: block;
    display: flex;
    align-items: center;
  }
  .BurgerMenu span {
    display: block;
    background-color: white;
    height: 7px;
    width: 50px;
    border-radius: 2px;
    margin-bottom: 10px;
  }
  .SearchHeader svg {
    fill: white;
    width: 50px;
    height: 50px;
    margin-right: 30px;
  }
}
@media (max-width: 560px) {
  .BurgerMenu span {
    height: 5px;
    width: 40px;
  }
}
a:hover {
  text-decoration: none !important;
}
.app {
  flex: 1 1 auto;
  backface-visibility: hidden;
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  max-width: 100%;
  position: relative;
}
footer {
  font-size: 15px;
  align-items: center;
  display: flex;
  flex: 0 1 auto !important;
  flex-wrap: wrap;
  padding: 6px 16px;
}
main {
  display: flex;
  flex: 1 0 auto;
  max-width: 100%;
  position: relative;
}
.v-rating .v-icon {
  padding: 0 !important;
}
.rovara-header {
  left: 0px;
  right: 0px;
  height: 80px;
  padding: 20px;
}
.header-content .open-search {
  display: none;
}
@media (max-width: 450px) {
  .header-content .logo.force-show-search {
    display: none;
  }
  .rovara-header {
    /* height: 125px; */
    /* height: 65px; */
  }
  .rovara-header .header-content {
    /* flex-direction: column; */
  }
  .search input {
    width: 200px;
  }
  .header-content .open-search {
    display: inline-block;
  }
}
.rovara-header {
  font-family: "Poppins";
  background: linear-gradient(90deg, #5f347d 0%, #49a09d 100%);
}
.rovara-footer {
  font-family: "Poppins";
  background-color: #eff0f3;
}

.rovara-header .container {
  justify-content: space-between;
}
.rovara-footer {
  height: 90px;
}
.rovara-footer a {
  color: #000000 !important;
  text-decoration: none;
  display: inline-block;
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 28px;
}
.rovara-footer a:hover {
  text-decoration: underline;
}
.rovara-footer .container {
  display: grid;
  grid-template-columns: 100fr 1fr;
  grid-template-areas: "copyright email";
  align-items: center;
}
.header-content {
  align-items: center;
  display: flex;
  position: relative;
  z-index: 0;
}

.header-content .search.force-show-search {
  display: inline-block !important;
}
.header-content .search.force-show-search {
  display: inline-block !important;
}

footer .container {
  width: 100%;
}
.footer-copyright,
.footer-email {
  font-size: 14px;
  font-family: "Poppins";
  font-weight: 500;
}
.footer-copyright {
  grid-area: copyright;
  color: #000000;
  font-style: normal;
  font-weight: 500;
  font-size: 19px;
  line-height: 28px;
}
.footer-email {
  grid-area: email;
  justify-self: end;
}
@media (max-width: 768px) {
  .rovara-footer {
    height: 110px;
  }
  .rovara-footer .container {
    padding-top: 20px;
    padding-bottom: 0;
    grid-template-columns: 1fr;
    grid-template-areas:
      "email"
      "copyright";
    row-gap: 20px;
    align-items: center;
  }
  .footer-email,
  .footer-copyright {
    justify-self: center;
  }
}
/*body {
    font-family: Cabin;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    color: #000000;
  }*/
.header-logo {
  padding-left: 0;
  width: 140px;
  margin-top: 5px;
  margin-left: -6px;
}
.header-links {
  font-size: 18px;
  font-weight: 500;
}
.header-content .header-links {
  user-select: none;
}
.header-content .header-links:hover {
  text-decoration: underline;
}
@media (max-width: 500px) {
  .header-content .header-links {
    display: none;
  }
}
.main-wrap {
  background-color: #eff0f3;
  padding-bottom: 30px;
}
.main-wrap.product-page-wrap {
  background-color: white;
}
.main-wrap.homepage-page-wrap {
  background: linear-gradient(90deg, #5f347d 0%, #49a09d 100%);
}
</style>
