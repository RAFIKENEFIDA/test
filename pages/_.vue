<template>
  <div :class="slug" v-html="contents" />
</template>

<script>
/* <p>Info beschikbaar:</p>
            <div v-html="JSON.stringify(product,null,4).replace(/\r\n|\n/g,'<br>' ).replace(' ','&nbsp;')">

            </div> */

import { getPage } from '~/components/API.js'

export default {

  async asyncData (context) {
    const { params, error } = context

    const { pathMatch } = params
    const split = pathMatch.split('/')

    let lastPart = split[split.length - 1]
    if (!lastPart && split.length >= 2) {
      lastPart = split[split.length - 2]
    }

    const data = await getPage({ lastPart })

    if (!data.found) {
      return error({ statusCode: 410, message: 'Page not found' })
    }
    if (data.pageType === 'product') {
      return context.redirect(301, `/product/${data.page}`)
    }
    if (data.pageType === 'brand') {
      return context.redirect(301, `/brand/${data.page}`)
    }
    return {
      contents: data.contents,
      slug: data.page
    }
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
