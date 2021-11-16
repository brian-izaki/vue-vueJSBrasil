<template>
  <div>
    <content-loader
      class="mt-3 rounded"
      width="90%"
      height="30px"
      animation-duration="2s"
    />

    <content-loader
      class="mt-3 rounded"
      width="30%"
      height="30px"
      animation-duration="2.3s"
    />

    <content-loader
      class="mt-3 rounded"
      width="80%"
      height="30px"
      animation-duration="2.7s"
    />

    <content-loader
      class="mt-3 rounded"
      width="50%"
      height="30px"
      animation-duration="3s"
    />
  </div>
</template>

<script>
import ContentLoader from '../../components/ContentLoader'

export default {
  name: 'FeedbacksFiltersLoading',
  components: {
    ContentLoader
  }
}
</script>
