<script lang="ts" setup>
import { ref, computed } from 'vue'

const count = ref<number>(0)

const isMany = computed(() => {
  return count.value >= 10
})

const countdown = (): void => {
  count.value--
}
const countup = (): void => {
  count.value++
}
const reset = (): void => {
  count.value = 0
}
</script>

<template>
  <h1>カウンターアプリを作る</h1>
  <div id="counter">
    <p v-if="isMany" class="count">たくさん！</p>
    <p v-else class="count">{{ count }}</p>
    <div class="buttons">
      <button class="minus" @click="countdown">−1</button>
      <button class="plus" @click="countup">＋1</button>
      <button class="reset" @click="reset">リセット</button>
    </div>
  </div>
</template>

<style scoped>
#counter {
  display: flex;
  flex-direction: column;
  align-items: center;
}

#counter .count {
  font-size: 40px;
  font-weight: bold;
  margin: 0 0 15px;
}

#counter .buttons {
  display: flex;
  align-items: center;
  gap: 10px;
}

#counter .buttons button {
  border: none;
  line-height: 40px;
  padding: 0 20px;
  border-radius: 20px;
  color: #777;
  transition: .3s;
  font-size: 16px;
}

#counter .buttons button:hover {
  opacity: .7;
}

#counter .buttons .plus {
  color: #fff;
  background-color: #222;
}

#counter .buttons .reset {
  border: solid 1px #777;
  background-color: transparent;
}
</style>
