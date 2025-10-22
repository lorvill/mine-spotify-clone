import { defineStore } from 'pinia'
import { ref } from 'vue'

type Option = {
  option: string
  name: string
}

export const useDropDownStore = defineStore('dropdown', () => {
  const options = reactive<Option[]>([
    { option: 'add', name: 'Add to Liked Songs' },
    { option: 'remove', name: 'Remove from Liked Songs' },
    { option: 'share', name: 'Share' },
  ])
  let selectedOption = ref<Option | null>(null)
  let isOpenedMenu = ref(false)

  function toggleDropdown() {
    isOpenedMenu.value = !isOpenedMenu.value
  }

  function selectOption(option: Option) {
    selectedOption.value = option
  }

  function setNewValues(index: number, newOption: string, newName: string) {
    options[index].option = newOption
    options[index].name = newName
  }

  return {
    options,
    setNewValues,
    selectedOption,
    isOpenedMenu,
    toggleDropdown,
    selectOption,
  }
})
