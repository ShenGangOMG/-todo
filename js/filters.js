// 底部模块
Vue.component('filters', {
	template: `<footer class="footer" v-show="todoList.length">
  <!-- This should be 0 items left by default -->
  <span class="todo-count"
    ><strong>{{ leftCount }}</strong> item left</span
  >
  <!-- Remove this if you don't implement routing -->
  <ul class="filters">
    <li>
      <a href="#/" @click="switchFilter('all')">All</a>
    </li>
    <li>
      <a href="#/active" @click="switchFilter('active')">Active</a>
    </li>
    <li>
      <a href="#/completed" @click="switchFilter('completed')"
        >Completed</a
      >
    </li>
  </ul>
  <!-- Hidden if no completed items are left ↓ -->
  <button
    class="clear-completed"
    v-show="isShowClearBtn"
    @click="clearCmpl"
  >
    Clear completed
  </button>
</footer>`,
	props: ['todoList']
})
