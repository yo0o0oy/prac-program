<template lang="pug">
.page-top
  .title-area
    h1 買い物リスト
    .buttons
      button(@click="hideDoneTask" :class="{ 'show-all': isShowAll }")
        font-awesome-icon(:icon="`eye${isShowAll ? '-slash' : ''}`")
        | 実行済みを{{ isShowAll ? '非表示' : '表示' }}
  ul
    li(v-for="todo, i in todos" :class="{ done: todo.isDone }")
      .check(@click="toggleStatus(i)")
      input(
        type="text"
        ref="task"
        v-model="todos[i].task"
        @keypress.enter="updateTask(i, $event)"
        @blur="updateTask(i, $event)"
      )
    li.add(@click="addTask")
      .check
      span タスクを追加
</template>

<script>
export default {
  name: 'page-index',
  layout: 'layout-default',
  data: () => ({
    allTodos: [
      {
        isDone: false,
        task: 'たまご',
      },
      {
        isDone: true,
        task: 'にんじん',
      },
    ],
    newTodo: '',
    isShowAll: true,
  }),
  computed: {
    todos() {
      if (this.isShowAll) return [...this.allTodos]
      return [...this.allTodos].filter((todo) => !todo.isDone)
    },
  },
  methods: {
    updateTask(index, ev) {
      if (ev.type !== 'blur') {
        this.$refs.task[index].blur()
        return
      }
      this.allTodos[index].task = ev.target.value
      this.trim()
    },
    trim() {
      this.allTodos = this.allTodos.filter((todo) => todo.task !== '')
    },
    toggleStatus(index) {
      this.allTodos[index].isDone = !this.allTodos[index].isDone
    },
    addTask() {
      this.allTodos.push({
        isDone: false,
        task: '',
      })
      this.$nextTick(() => {
        this.$refs.task[this.allTodos.length - 1].focus()
      })
    },
    hideDoneTask() {
      this.isShowAll = !this.isShowAll
    },
  },
}
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
  ul
    li
      display flex
      gap 10px
      align-items center
      padding 10px
      border-bottom solid 1px color-border
      .check
        width 30px
        aspect-ratio 1 / 1
        border solid 1px color-border
        border-radius 50%
        transition .3s
        position relative
        cursor pointer
        &::after
          content ''
          display block
          position absolute
          top 0
          bottom 0
          right 0
          left 0
          margin auto
      input
        width auto
        border none
        outline none
      span
        color color-font
      &:not(.add)
        .check
          &::after
            width 10px
            height 5px
            border-left 2px solid white
            border-bottom 2px solid white
            transform rotate(-45deg)
            top -3px
      &.done
        .check
          background color-main
        input
          text-decoration line-through
          opacity 0.5
          pointer-events none
      &.add
        cursor pointer
        .check
          &::before
          &::after
            width 10px
            height 1px
            background color-font
          &::before
            content ''
            display block
            position absolute
            top 0
            bottom 0
            right 0
            left 0
            margin auto
            transform rotate(90deg)
</style>