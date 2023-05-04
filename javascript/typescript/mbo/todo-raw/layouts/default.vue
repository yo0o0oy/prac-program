<template lang="pug">
.layout-default
  TdrHeader
  .main
    Nuxt
</template>

<script>
import TdrHeader from '~/components/TdrHeader'

export default {
  name: 'layout-default',
  components: { TdrHeader },
}
</script>
