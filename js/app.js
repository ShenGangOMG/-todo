;(function(window) {
	// 将数据存在浏览器中
	function getData() {
		return JSON.parse(localStorage.getItem('todolist') || '[]')
	}
	const vm = new Vue({
		el: '#app',
		data: {
			todoList: getData(),
			newTodo: '',
			currentEdit: -1,
			todoFilter: 'all'
		},
		methods: {
			// 删除功能
			delTodo(id) {
				// 获取点击事件的id,找到对应数组中的元素,删除
				let newTodoList = this.todoList.filter(item => {
					return item.id != id
				})
				this.todoList = newTodoList
			},
			// 添加功能
			addTodo(e) {
				let newTodo = {
					id: this.todoList.length
						? this.todoList[this.todoList.length - 1].id + 1
						: 1,
					// 如果数组为空那么数组默认长度为1
					todo: this.newTodo,
					isCompleted: false
				}
				// 把用户输入的内容填加到数组中
				this.todoList.push(newTodo)
				// 将文本框清空
				this.newTodo = ''
			},
			// 修改
			editTodo(id) {
				// 设置一个数据,存档编辑元素id,默认-1
				// 给元素添加类样式使修改框显示
				// 注册双击事件,把currentEdit改成点击的元素id
				this.currentEdit = id
			},
			finishEditTodo(e) {
				this.currentEdit = -1
			},
			clearCompleted() {
				// 当用户点击clear completed按钮的时候	需要将数组中所有已完成的项,删除
				this.todoList = this.todoList.filter(v => !v.isCompleted)
			},
			changeFilter(filter) {
				this.todoFilter = filter
			}
		},

		computed: {
			leftCount() {
				// leftCount是一个计算属性,用来获取todoList数组中所有未完成的todo项
				//通过filter进行过滤,找到数组中isCompleted属性为false的元素
				// 简写
				// let leftList = this.todoList.filter(v => !v.isCompleted)
				let leftList = this.todoList.filter(v => {
					return v.isCompleted == false
				})
				// 返回所有未完成的数量
				return leftList.length
			},
			isShowClearBtn() {
				// 如果当前数据中的数组中,有已经完成的项,返回true
				// 如果当前数组中没有完成的项,返回false
				//数组中如果有任意isCompleted属性时true的元素,则返回true
				return this.todoList.some(v => v.isCompleted)
			},
			todoToShow() {
				return this.todoList.filter(v => {
					if (this.todoFilter == 'all') {
						return true
					} else if (this.todoFilter == 'active') {
						return v.isCompleted == false
					} else if (this.todoFilter == 'completed') {
						return v.isCompleted == true
					}
				})
			}
		},
		watch: {
			todoList: {
				handler() {
					// 通过watch可以监视到数据的变化,在数据变化的时候,我们需要将数组重新存储到localstorage中
					localStorage.setItem('todolist', JSON.stringify(this.todoList))
				},
				deep: true
			}
		}
	})
	// 逻辑
	// 当vue中的数据发生变化的时候,在vue内部会重新计算页面中所有的指令以及表达式
	// 如果计算后,结果相同页面不变.如果内容变化,对页面执行更新操作
	window.vm = vm
})(window)
