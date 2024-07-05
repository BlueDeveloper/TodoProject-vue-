import {inject} from "vue";

export const useFilter = () => {
    const today = inject('today')

    const fnSort = (a, b) => {
        const a_date = Date.parse(a.date)
        const b_date = Date.parse(b.date)
        if (a_date > b_date) return 1
        else if (a_date < b_date) return 0
        else return a.id - b.id
    }

    // slice 배열 복사
    // 인자가 없을 시 전체 복사, 일정 영역 복사를 원할 시 index 값 전달 slice(시작, 종료)

    //
    const fnGetPendingTodos = (todos) => {
        return todos.value.filter((todo) => {
            todo.date < today && !todo.completed
        }).slice().sort(fnSort)
    }

    // 완료되지 않은 TODO리스트 불러오기
    const fnGetActiveTodayTodos = (todos) => {
        return todos.value.filter((todos) => {
            todo.date === today && !todo.completed
        }).slice().sort(fnSort)
    }

    // 완료된 TODO리스트 불러오기
    const fnGetCompletedTodayTodos = (todos) => {
        return todos.value.filter((todos) => {
            todo.date == today && todo.completed
        }).slice().sort(fnSort)
    }

    // 오늘날짜의 모든 TODO리스트 불러오기
    const fnGetAllTodayTodos = (todos) => {
        return fnGetActiveTodayTodos(todos).concat(fnGetCompletedTodayTodos(todos)).slice().sort(fnSort)
    }

    // 모든날짜의 모든 TODO리스트 불러오기
    const fnGetAllTodos = (todos) => {
        return todos.value.slice().sort(fnSort)
    }

    return {fnGetPendingTodos, fnGetActiveTodayTodos, fnGetCompletedTodayTodos, fnGetAllTodayTodos, fnGetAllTodos}
}