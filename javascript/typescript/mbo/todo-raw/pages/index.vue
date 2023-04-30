<template lang="pug">
.page-top
  h1 買い物リスト
  ul
    li(v-for="todo, i in todos" :class="todo.status")
      .check x
      input(type="text" v-model="todos[i].task")
    li.add
      input(type="text" v-model="newTodo")
      button 追加
</template>

<script>
export default {
  layout: 'default',
  data: () => ({
    todos: [
      {
        status: 'not-yet',
        task: 'たまご',
      },
      {
        status: 'done',
        task: 'にんじん',
      },
    ],
    newTodo: '',
  }),
}
</script>

<style lang="stylus">
.page-top
  ul
    li
      display flex
      gap 10px
      align-items center
      &.done
        .check
          color green
        input
          text-decoration line-through
          opacity 0.5
          pointer-events none
</style>