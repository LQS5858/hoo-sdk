export default {
    state: {
        count: 1
        // sdk用户传过来的参数
    },
    mutations: {

        COUNT_ADD (state, count) {
            state.count = count
        }
    }
}