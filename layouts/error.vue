<template>
  <div>
    <div v-if="error.statusCode === 404 || error.statusCode === 410">
      <p class="sorry">
        Sorry, we hebben deze pagina niet gevonden.
      </p>
      <p class="icon">
        <img src="/icons/404.png" alt="404 pagina icon">
      </p>
      <p class="button-home">
        <NuxtLink to="/">
          <button class="home" data-href="#">
            Terug naar Home
          </button>
        </NuxtLink>
      </p>
    </div>
    <div v-else>
      <h1>
        {{ otherError }}
      </h1>
      <NuxtLink to="/">
        <button class="home" data-href="#">
          Terug naar Home
        </button>
      </NuxtLink>
    </div>
  </div>
</template>

<script>
export default {
  layout: 'empty',
  props: {
    error: {
      type: Object,
      default: null
    }
  },
  data () {
    this.$store.commit('search/clearSearch')
    return {
      pageNotFound: this.error.statusCode + ' Page not found',
      otherError: this.error.statusCode + ' An error occurred'
    }
  },
  head () {
    const title =
      this.error.statusCode === 404 || this.error.statusCode === 410 ? this.pageNotFound : this.otherError
    return {
      title
    }
  }
}
</script>

<style scoped>
/* -------- DESKTOP VERSION ---------*/

.sorry {
  font-size: 32px;
  font-weight: 700;
  font-family: "Poppins";
  align-content: center;
  color: #0c0b0b;
  text-align: center;
  margin-top: 77px;
}

.icon > img {
  height: 199px;
  width: auto;
}
.icon {
  text-align: center;
  margin-top: 77px;
}

.home {
  font-size: 26px;
  font-family: "Poppins", bold;
  background: linear-gradient(0.25turn, #e96c8e, #ee2e63);
  color: white;
  border: none;
  padding: 19px 45px;
  border-radius: 6px;
  cursor: pointer;
  box-shadow: 2px 5px 15px rgb(158, 158, 158);
}

.button-home {
  text-align: center;
  margin-top: 64px;
  margin-bottom: 105px;
}

/* ------ MOBILE VERSION -------- */

@media (max-width: 500px) {
  .sorry {
    font-size: 24px;
    margin-top: 57px;
  }
  .icon > img {
    height: 199px;
    width: auto;
  }
  .icon {
    text-align: center;
    margin-top: 58px;
  }
  .home {
    font-size: 18px;
    font-family: "Poppins";
    background: linear-gradient(0.25turn, #e96c8e, #ee2e63);
    color: white;
    border: none;
    padding: 14px 34px;
    border-radius: 6px;
    cursor: pointer;
    box-shadow: 2px 5px 15px rgb(158, 158, 158);
  }

  .button-home {
    text-align: center;
    margin-top: 68px;
    margin-bottom: 120px;
  }
}

</style>
