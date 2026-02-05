import { useQuery, useMutation, useQueryClient } from '@tanstack/vue-query'
import { apiAuth } from '@/api/auth.ts'
import { computed } from 'vue'

export function useAuthentication()  {
  const { login, register, getUser, logout } = apiAuth

  const queryClient = useQueryClient()

  const currentUser = useQuery({
    queryKey: ['user'],
    queryFn: getUser,
    retry: false,
  })

  const loginUser = useMutation({
    mutationFn: login,
    onSuccess: data => {
      queryClient.setQueryData(['login-user'], data.user)
    }
  })

  const registerUser = useMutation({
    mutationFn: register,
    onSuccess: data => {
      queryClient.setQueryData(['register-user'], data.user)
    }
  })

  const logoutUser = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ['logout-user'] })
    }
  })

  return {
    login: loginUser.mutateAsync,
    register: registerUser.mutateAsync,
    logout: logoutUser.mutate,

    currentUser: currentUser.data,
    isAuthenticated: computed(() => !!currentUser.data.value),
    isLoading: currentUser.isLoading,
    error: loginUser.error || registerUser.error
  }
}