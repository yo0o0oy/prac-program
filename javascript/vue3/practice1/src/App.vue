<script lang="ts" setup></script>

<template>
  <ul class="pagelist">
    <li><RouterLink to="/counter">カウンター</RouterLink></li>
    <li><RouterLink to="/task">タスク</RouterLink></li>
  </ul>
  <RouterView />
</template>

<style scoped>
.pagelist {
  display: flex;
  align-items: center;
  gap: 20px;
  list-style: none;
  margin: 0 0 30px;
  padding: 0;
}

.pagelist li {
  margin: 0;
}

.pagelist li a {
  color: #222;
  text-decoration: none;
  position: relative;
}

.pagelist li a::after {
  position: absolute;
  bottom: -7px;
  left: 0;
  right: 0;
  margin: auto;
  content: '';
  width: 0;
  height: 1px;
  display: block;
  background-color: #222;
  transition: .3s;
}

.pagelist li a:hover::after {
  width: 100%;
}
</style>
