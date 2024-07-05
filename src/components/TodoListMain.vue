<template>

    <todo-list-menu v-on:change-filter="onChangeFilter" class="p-0"></todo-list-menu>
    <div v-for="key in Object.keys(filtered_todos)" :key="key" class="mb-3">
        <div v-if="use_category">
            <em>{{ key }}</em>
        </div>
        <todo-list :data="filtered_todos[key]"></todo-list>
        <div class="my-2 mt-5">
            <span style="background-color: red">&nbsp;</span>&nbsp;
            <strong>처리하지 못한 작업들</strong>
        </div>
        <todoList :data="pending_todos"></todoList>
    </div>
    <TodoList></TodoList>
</template>

<script>
import {inject, provide, ref, watch} from "vue";
import TodoListMenu from "@/components/TodoListMenu.vue";
import TodoList from "@/components/TodoList.vue";
import {useFilter} from "@/compositions/filters.js";

export default {
    name: "TodoListMain",
    components: {TodoList, TodoListMenu},
    setup(props) {
        const {
            fnGetPendingTodos,
            fnGetActiveTodayTodos,
            fnGetCompletedTodayTodos,
            fnGetAllTodayTodos,
            fnGetAllTodos
        } = useFilter()
        const filter = ref(0)
        const filtered_todos = ref([""])
        const pending_todos = ref([])
        const use_category = ref(false)
        const todos = inject('todos')
        debugger

        const filters = {
            0: {str: "해야 할 작업들", func: fnGetActiveTodayTodos, category: false},
            1: {str: "완료한 작업들", func: fnGetCompletedTodayTodos, category: false},
            2: {str: "오늘의 모든 기록", func: fnGetAllTodayTodos, category: false},
            3: {str: "모든 기록", func: fnGetAllTodos, category: true},
        }

        provide('filters', filters)

        const groupBy = (todos) => {
            return todos.reduce((acc, cur) => {
                acc[cur['date']] = acc[cur['date']] || []
                acc[cur['date']].push(cur)
                return acc
            }, {})
        }

        const onChangeFilter = (filter_idx) => {
            filter.value = Number(filter_idx)
        }

        watch(
            [() => filter.value, todos.value],
            ({new_filter, new_todos}, {old_filter, old_todos}) => {
                pending_todos.value = fnGetPendingTodos(todos)
                if (typeof new_filter !== 'undefined') {
                    let temp_todos = filters[new_filter].func(todos)
                    filtered_todos.value = groupBy(temp_todos)
                    use_category.value = filters[new_filter].category
                }
            },
            {immediate: true}
        )
        return {filter, pending_todos, use_category, onChangeFilter, filtered_todos}
    }
}
</script>