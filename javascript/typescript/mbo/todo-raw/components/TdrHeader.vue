<template lang="pug">
header.header
  img.logo(src="images/logo.png")
  span TODO LIST
</template>

<style lang="stylus">
color-main = #42a798
.header
  height 70px
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
    font-family 'Arial'
</style>
