import { ref, watch } from 'vue'
import { useRouter, useRoute } from "vue-router";

export function useRouteQuery(routeKey: string, defaultValue: string | undefined | number) {
  const router = useRouter()
  const route = useRoute()
  const sortValue = route.query[routeKey] // доступ к конкретному query-параметру динамически (например 'price')
  const value = ref(sortValue || defaultValue)

  watch(value, (value) => {
    router.push({
      query: {
        [routeKey]: value,
      }
    })
  })
  return value
}

