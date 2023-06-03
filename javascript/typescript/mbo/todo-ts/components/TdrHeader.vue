<template lang="pug">
header.header
  img.logo(src="images/logo.png")
  span TODOLIST
    span - TypeScript -
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
    span
      font-size 0.55em
      margin-left 5px
      font-weight bold
</style>
