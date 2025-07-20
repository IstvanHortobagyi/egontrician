import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import { createMemoryHistory, createRouter} from "vue-router";
import Home from "@/Components/Home.vue";import Settings from "@/Components/Settings.vue";

const routes = [
	{ path: '/Home', component: Home, name: 'Home' },
	{ path: '/Settings', component: Settings, name: 'Settings' }
]

const router = createRouter({
	history: createMemoryHistory(),
	routes
})

createApp(App).use(router).mount('#app')
