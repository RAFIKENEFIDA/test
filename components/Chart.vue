<script>
import { Line } from 'vue-chartjs'

export default {
  extends: Line,
  // props: ['chartdata', 'options'],
  props: {
    chartdata: { type: Object, default: () => { return {} } },
    options: { type: Object, default: () => { return {} } }
  },
  mounted () {
    this.renderChart(this.chartdata, this.options)
  }
}
</script>

<style>
</style>
