import { createStore } from "vuex"
import auth from "./modules/auth"
import forum from "./modules/forum"

const store = createStore({
    modules: {
        auth,
        forum
    },
})

export default store