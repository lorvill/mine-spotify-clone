import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { apiAuth } from '@/api/auth.ts'
import { computed } from 'vue'
import { authKeys } from '@/utils/queryKeysFactory.ts'

export function useAuthentication() {
  const { login, register, getUser, logout } = apiAuth
  const queryClient = useQueryClient()

  const currentUser = useQuery({
    queryKey: authKeys.currentUser,
    queryFn: getUser,
    retry: false,
  })

  const loginUser = useMutation({
    mutationFn: login,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser })
    },
  })

  const registerUser = useMutation({
    mutationFn: register,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.currentUser })
    },
  })

  const logoutUser = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.clear()
      window.location.href = '/'
    },
  })

  return {
    login: loginUser.mutateAsync,
    register: registerUser.mutateAsync,
    logout: logoutUser.mutate,

    currentUser: currentUser.data,
    isAuthenticated: computed(() => !!currentUser.data.value),
    isLoading: currentUser.isLoading,
    error: loginUser.error || registerUser.error,
  }
}