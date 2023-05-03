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


<style lang="stylus">
// TODO: 共通ファイル作成
body
  font-size 14px
  font-family 'Yu Gothic', 'メイリオ'
  margin 0
</style>
