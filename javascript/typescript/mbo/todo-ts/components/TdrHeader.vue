<template lang="pug">
header.header
  img.logo(src="images/logo.png")
  span TODOLIST
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
</style>
