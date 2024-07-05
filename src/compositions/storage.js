import {reactive, toRefs} from "vue";


/**
 * @name : ES 모듈
 * @desc : todo를 저장소 사용(localStorage) */
export const useStorage = () => {
    // 데이터를 저장할 KEY
    const KEY = 'my-todo-list'

    // 일정 리스트를 가질 todos 속성과 신규 id를 책정할 수 있는 storage_id 속성을 가진 객체
    const storage_obj = reactive({storage_id: 0})

    /**
     * @desc : localstorage에 있는 TODO불러오기 */
    const fnLoadTodos = (initTodos) => {
        let temp_todos = JSON.parse(localStorage.getItem(KEY) || '[]') // KEY에 저장된 임시 todo리스트 불러오기
        temp_todos.forEach((todo, idx) => {
            todo.id = idx
        })
        storage_obj.storage_id = temp_todos.length
        initTodos(temp_todos)
    }

    /**
     * @desc : localstorage에 TODO저장하기 */
    const fnSaveTodos = (todos) => {
        localStorage.setItem(KEY, JSON.stringify(todos.value))
    }

    // Spread Operator(...)은 객체 혹은 배열의 속성/값들을 꺼내주는 역할을 함
    // 그러나 (...)을 통해 꺼내진 속성은 반응성이 없기 때문에 'toRefs'를 이용해 객제의 모든 속성에 반응성을 부여한다
    return {
        ...toRefs(storage_obj), fnLoadTodos, fnSaveTodos
    }
}