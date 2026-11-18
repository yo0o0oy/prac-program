<script lang="ts" setup>
import { ref, computed } from 'vue'
import type { ComputedRef } from 'vue' // ComputedRef は実行時に使う値ではなく、型だけなので import type を使う

type TaskStatus = 'todo' | 'doing' | 'done'

const status = ref<TaskStatus>('todo')
const statuses: TaskStatus[] = ['todo', 'doing', 'done']
const changeStatus = (): void => {
  let index = statuses.indexOf(status.value) + 1
  if (index === statuses.length) index = 0
  status.value = statuses[index]
}
const taskName: ComputedRef<string> = computed(() => {
  switch(status.value) {
    case 'todo':
      return '未着手'
    case 'doing':
      return '作業中'
    case 'done':
      return '完了！'
  }
})
</script>

<template>
  <h1>タスク管理</h1>
  <div id="tasks">
    <dl class="task">
      <dt>タスク１<span v-if="status == 'done'" class="message">完了！</span></dt>
      <dd :class="['status', status]">{{taskName}}</dd>
      <dd>
        <button class="update" @click="changeStatus">
          <img src="../assets/images/ico-update.svg" alt="ステータス更新" width="34"/>
        </button>
      </dd>
    </dl>
  </div>
</template>

<style scoped>
h1 {
  padding: 0.3em 1em;
  background: linear-gradient(135deg, #10b981, #3b82f6);
  color: #fff;
  letter-spacing: .05em;
  font-size: 20px;
}

#tasks .task {
  display: grid;
  grid-template-columns: 1fr 8em 100px;
  align-items: start;
}

#tasks .task dt {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
  margin-top: 5px;
}

#tasks .task dt .message {
  white-space: nowrap;
  color: #1e820f;
}

#tasks .task dd.status {
  padding: 5px 15px;
  color: #fff;
  border-radius: 20px;
  text-align: center;
}

#tasks .task dd.status.todo {
  background-color: rgb(179, 40, 40);
}

#tasks .task dd.status.doing {
  background-color: rgb(199, 149, 22);
}

#tasks .task dd.status.done {
  background-color: #1e820f
}

#tasks .task dd .update {
  border: 0;
  background: none;
  transition: .3s;
}

#tasks .task dd .update:hover {
  opacity: .75;
}

</style>
