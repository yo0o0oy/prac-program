<template lang="pug">
.page-top
  .title-area
    h1 買い物リスト
    .buttons
      button.filter(@click="hideDoneTask" :class="{ 'show-all': isShowAll }")
        font-awesome-icon(:icon="`eye${isShowAll ? '-slash' : ''}`")
        | 実行済みを{{ isShowAll ? '非表示' : '表示' }}
  ul
    li(v-for="todo, i in todos" :class="{ done: todo.isDone }")
      .task-area
        .check(@click="toggleStatus(i)")
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
      button.del(@click="del(i)")
        font-awesome-icon(icon="trash-can")
    li.add(@click="addTask")
      .task-area
        .check
          font-awesome-icon(icon="plus")
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
      {
        isDone: false,
        task: 'キャベツ',
      },
      {
        isDone: true,
        task: 'レタス',
      },
      {
        isDone: false,
        task: '玉ねぎ',
      },
      {
        isDone: false,
        task: 'トマト',
      },
      {
        isDone: false,
        task: 'じゃがいも',
      },
      {
        isDone: false,
        task: '豚肉',
      },
      {
        isDone: false,
        task: '鶏肉',
      },
      {
        isDone: false,
        task: '塩',
      },
      {
        isDone: false,
        task: 'しょうゆ',
      },
      {
        isDone: false,
        task: 'みりん',
      },
      {
        isDone: false,
        task: '砂糖',
      },
      {
        isDone: false,
        task: 'ヨーグルト',
      },
      {
        isDone: false,
        task: '牛乳',
      },
      {
        isDone: false,
        task: 'チーズ',
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
      // FIXME: json-serverを使ってモックサーバー作る https://pg-log.com/nuxt-axios/
      if (ev.type !== 'blur') {
        this.$refs.task[index].blur()
        return
      }
      this.allTodos[index].task = ev.target.value
      this.trim()
    },
    del(index) {
      this.allTodos[index].task = ''
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