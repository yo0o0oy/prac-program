<template lang="pug">
header.header
  img.logo(src="images/logo.png")
  span TODOLIST
    span TS
</template>

<style lang="stylus">
.header
  height 60px
  position sticky
  top 0
  z-index 10
  background-color color-main
  display flex
  align-items center
  justify-content center
  gap 8px
  .logo
    max-height 50%
    margin-top -5px
  span
    color white
    font-size 24px
    font-family-arial()
    display flex
    align-items center
    gap 10px
    span
      padding 3px 5px
      border-radius 4px
      font-size 0.55em
      font-weight bold
      color color-main
      background-color white
</style>
