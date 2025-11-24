import { ref } from 'vue'

export function useImageSelector() {
  const imageFile = ref<File | null>(null)
  const imagePreview = ref<string | null>(null)

  function selectImage(event: Event) {
    const input = event.target as HTMLInputElement
    const file = input.files?.[0]

    if (!file) return
    imageFile.value = file
    imagePreview.value = URL.createObjectURL(file)
    // временная ссылка на файл, чтобы браузер отобразил его без загрузки на сервер (создается временный blob-url)
  }

  function resetImage() {
    imageFile.value = null
    if (imagePreview.value) {
      URL.revokeObjectURL(imagePreview.value)
      imagePreview.value = null
    }
  }

  return {
    imageFile,
    imagePreview,
    selectImage,
    resetImage
  }
}
