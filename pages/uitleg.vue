<template>
  <div>
    <the-breadcrumbs :items="breadcrumbItems" />
    <h1>Hoe zoeken we de beste deals?</h1>
    <div style="padding-bottom:50px">
      We selecteren op de bekende websites de top aanbieder op dit moment.
      Op Bol.com is het mogelijk dat dit niet de meest goedkope aanbieder is.
    </div>
    <a class="remove-style" style="cursor:pointer" @click="$router.back()">
      <div
        class="button green large button-green-productpage"
        style="min-width:200px;height:45px;max-width:200px"
      >
        <span>
          Terug
        </span>
      </div>
    </a>
  </div>
</template>
<script>
import TheBreadcrumbs from '~/components/TheBreadcrumbs.vue'

export default {
  components: {
    TheBreadcrumbs
  },
  data () {
    const breadcrumbItems = [
      {
        text: 'Home',
        disabled: false,
        href: '/'
      },
      {
        text: 'Uitleg',
        disabled: true,
        href: '/uitleg'
      }]
    return {
      breadcrumbItems
    }
  },

  head () {
    return {
      title: 'Hoe zoeken we de beste deals?'
    }
  }
}
</script>

<style lang="css" >
  .breadcrumbs {
    grid-area: breadcrumbs;
  }
  .product-list {
    padding-left:0;
    padding-right:0;

  }
</style>
