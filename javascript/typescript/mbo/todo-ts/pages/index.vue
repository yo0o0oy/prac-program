<template lang="pug">
.page-top
  .title-area
    h1 買い物リスト
    .buttons
      button.filter(@click="isShowAll = !isShowAll" :class="{ 'show-all': isShowAll }")
        font-awesome-icon(:icon="`eye${isShowAll ? '-slash' : ''}`")
        | 実行済みを{{ isShowAll ? '非表示' : '表示' }}
  ul
    li(v-for="todo, i in todos" :class="{ done: todo.isDone }")
      .task-area
        .check(@click="toggleStatus(todo)")
          font-awesome-icon(icon="check")
        //- FIXME: 2行以上入力した場合は改行して全量表示
        textarea(
          type="text"
          ref="task"
          rows="1"
          v-model="todos[i].task"
          @keypress.enter="updateTask(i, $event)"
          @blur="updateTask(i, $event)"
        )
      button.del(@click="del(todo)")
        font-awesome-icon(icon="trash-can")
    li.add(@click="addTask")
      .task-area
        .check
          font-awesome-icon(icon="plus")
        span タスクを追加
</template>

<script lang="ts">
import Vue from 'vue'

export type Todo = {
  id: number,
  isDone: boolean,
  task: string,
}

export default Vue.extend({
  data() {
    return {
      todos: [] as Todo[],
      isShowAll: false,
    }
  },
  computed: {
    allTodos(): Todo[] {
      return this.$store.state.todo.list
    },
  },
  watch: {
    allTodos(): void {
      this.setTodos()
    },
    isShowAll(): void {
      this.setTodos()
    },
  },
  mounted() {
    this.$store.dispatch('todo/getTodos')
  },
  methods: {
    setTodos(): void {
      const allTodos: Todo[] = JSON.parse(JSON.stringify(this.allTodos))
      this.todos = this.isShowAll ? allTodos : allTodos.filter((todo: Todo): boolean => !todo.isDone)
    },
    updateTask() {
      alert('updateTask')
    },
    del() {
      alert('del')
    },
    trim() {
      alert('trim')
    },
    toggleStatus() {
      alert('toggleStatus')
    },
    addTask() {
      alert('addTask')
    },
  },
}
)
</script>

<style lang="stylus">
.page-top
  width 90%
  max-width 500px
  margin 20px auto
  .title-area
    display flex
    align-items center
    justify-content space-between
    margin-bottom 10px
    h1
      font-weight bold
      font-size 22px
      color color-main
    .filter
      display flex
      gap 5px
      align-items center
      padding 3px 10px
      color color-font-light
      border solid 1px color-font-light
      border-radius 4px
      font-size 12px
      transition .3s
      &:hover
        background-color #eee
  ul
    li
      display grid
      gap 10px
      align-items center
      grid-template-columns 1fr 30px
      padding 10px 0
      border-bottom solid 1px color-border
      .task-area
        display grid
        grid-template-columns 25px 1fr
        align-items center
        gap 10px
        .check
          width 25px
          aspect-ratio 1 / 1
          border solid 1px color-border
          border-radius 50%
          transition .3s
          position relative
          cursor pointer
          display flex
          align-items center
          justify-content center
          color white
        textarea
          width 100%
          border none
          outline none
          resize none
          display flex
          align-items center
        span
          color color-font
      .del
        width 30px
        aspect-ratio 1 / 1
        display flex
        align-items center
        justify-content center
        background-color color-caution
        color white
        border-radius 4px
        transition .3s
        &:hover
          background-color darken(color-caution, 4)
      &.done
        .task-area
          .check
            background color-main
          textarea
            text-decoration line-through
            opacity 0.5
            pointer-events none
      &.add
        cursor pointer
        .task-area
          .check
            color color-main
            border-color color-main
            &:hover
              color white
              background-color color-main
</style>