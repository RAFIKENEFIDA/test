<template>
  <ul class="breadcrumbs">
    <template v-for="(item,i) of items">
      <li :key="i">
        <i v-if="i===0" class="back-icon material-icons" style="max-width:25px">chevron_left</i>

        <div v-if="!item.disabled" class="breadcrumbs-item">
          <nuxt-link :to="item.href" class="remove-style">
            {{ item.text }}
          </nuxt-link>
        </div>
        <div v-if="item.disabled" class="breadcrumbs-item breadcrumbs-item-disabled">
          {{ item.text }}
        </div>
      </li>
      <li v-if="i < items.length - 1" :key="`divider-${i}`" class="breadcrumbs-item-divider">
        <i class="material-icons" style="max-width:25px">chevron_right</i>
      </li>
    </template>
  </ul>
</template>
<script>
export default {

  // props: ['items'],
  props: {
    items: { type: Array, default: () => { return [] } }
  },
  data () {
    return {
    }
  }
}
</script>
<style>
  .breadcrumbs li:first-child:hover {
    background-color: #eaeaeab8;
  }
  .breadcrumbs li:first-child {
    background-color: #eaeaea;
    border-radius: 3px;
    position: relative;
    align-self: center;
    color: #0a0a0a;
    padding: 6px 12px;

  }
  .breadcrumbs.breadcrumbs-mobile li:first-child {
    background-color: unset;
    position: relative;
    align-self: center;
    color: #348AC7;
    padding: 6px 12px;
  }
  .breadcrumbs .back-icon {
    display:none;
  }
  .breadcrumbs.breadcrumbs-mobile .back-icon {
    display:inline-block;
  }
.breadcrumbs {
    font-family: 'Poppins';
    font-weight: 500;
    grid-area: breadcrumbs;
    padding: 0 !important;
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    flex: 0 1 auto;
    list-style-type: none;
    margin: 0;
  }
  .breadcrumbs-item {
    align-items: center;
    display: inline-flex;
    text-decoration: none;
  }
  .breadcrumbs-item-disabled {
    color: rgba(0,0,0,.38);
  }
  .breadcrumbs-item-divider {
    color: rgba(0,0,0,.54);
  }
  .breadcrumbs li {
    align-items: center;
    display: inline-flex;
    font-size: 14px;
  }
  .breadcrumbs li:nth-child(2n) {
    padding: 0 7px;
  }
</style>
