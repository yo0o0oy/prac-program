<script setup>
import { ref, computed } from 'vue'

const count = ref(0)

const countValue = computed(() => {
  return count.value < 10 ? count.value : 'たくさん！'
})

</script>

<template>
  <h1>カウンターアプリを作る</h1>
  <div id="counter">
    <p class="count">{{ countValue }}</p>
    <div class="buttons">
      <button class="minus" @click="count--">−1</button>
      <button class="plus" @click="count++">＋1</button>
      <button class="reset" @click="count = 0">リセット</button>
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
