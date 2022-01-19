<template>
  <div>
    Redirect page
  </div>
</template>

<script>
import { getRedirect } from '~/components/API.js'

export default {

  async asyncData (context) {
    const data = await getRedirect({ store: context.query.store, product: context.query.product, ref: context.query.ref, userAgent: context.req.headers['user-agent'] })
    context.redirect(302, data.link || '/')
  },
  data () {
    return {
    }
  },
  head () {
    return {
      title: 'generic'
    }
  },
  methods: {
  }
}
</script>

<style lang="css" >
</style>
