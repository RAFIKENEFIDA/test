<template>
  <div v-if="isOpen" class="cookie">
    We gebruiken cookies voor analytics en het verbeteren van onze site.
    <nuxt-link class="cookie__link" to="/privacy-policy">
      Privacy Policy.
    </nuxt-link> <!--   Klik <span style="text-decoration:underline; cursor: pointer" @click="deny">hier</span> als je deze niet wilt<br>  -->
    <span class="ok-button" @click="accept">Ok</span>
  </div>
</template>

<script>

export default {
  name: 'CookieMessage',
  props: {
    buttonTextAccept: {
      type: String,
      default: 'Accept'
    },
    buttonTextDeny: {
      type: String,
      default: 'Deny'
    },
    message: {
      type: String,
      default:
        'We use cookies to provide our services and for analytics and marketing. To find out more about our use of cookies, please see our Privacy Policy. By continuing to browse our website, you agree to our use of cookies.'
    },
    position: {
      type: String,
      default: 'top'
    }
  },
  data () {
    return {
      isOpen: false
    }
  },
  computed: {
    containerPosition () {
      return `cookie--${this.position}`
    }
  },
  created () {
    if (this.getGDPR() === undefined) {
      this.isOpen = true
    }
  },
  methods: {
    getGDPR () {
      if (process.browser) {
        return this.$cookies.get('cookieconsent')
      }
    },
    accept () {
      if (process.browser) {
        this.isOpen = false
        this.$cookies.set('cookieconsent', true, {
          path: '/',
          maxAge: 60 * 60 * 24 * 365 * 2,
          sameSite: 'strict',
          secure: true
        })
        // this.$router.go(0)
        this.$gtm.init('GTM-MSCLSST')
      }
    },
    deny () {
      if (process.browser) {
        this.isOpen = false
        this.$cookies.set('cookieconsent', false, {
          path: '/',
          maxAge: 60 * 60,
          sameSite: 'strict',
          secure: true
        })
        // this.$router.go(0)
      }
    }
  }
}
</script>

<style scoped>
    .cookie {
        position: fixed;
        bottom: 0px;
        z-index: 1;
        background: #f7f7f7;
        width: 80%;
        max-width: 300px;
        left: 50%;
        transform: translate(-50%, 0);
        padding: 20px;
        border-radius: 5px;
    }
    .ok-button {
        background: #35D26A;
        box-shadow: none;
        border-radius: 5px;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
        cursor: pointer;
        transition: all .2s ease 0s;
        height: 45px;
        margin-top: 10px;
    }
    .ok-button:hover {
        background-color: #25a25a;
    }
</style>
