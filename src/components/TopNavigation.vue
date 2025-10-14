<script setup lang="ts">
</script>

<template>
  <section class="h-[60px] z-20 bg-[#101010] bg-opacity-80 flex items-center px-10">

    <form class="spotify-search absolute left-1/2 -translate-x-1/2">
      <input
        name="s"
        type="search"
        placeholder="What do you want to play?"
      >
    </form>

    <button
      type="button"
      class="ml-auto rounded-2xl bg-neutral-300 py-1 w-20 hover:bg-green-500 transition duration-200 cursor-pointer font-medium text-black hover:text-neutral-700"
    >
      Log in
    </button>
  </section>
</template>

<style scoped>
.spotify-search input {
  padding: 8px 12px 8px 12px;
  border: 2px solid transparent;
  border-radius: 25px;
  background-color: #282828;
  color: #fff;
  font-size: 14px;
  outline: none;
  transition: border-color 0.2s ease, background 0.2s ease;
  width: 550px;
}

.spotify-search input::placeholder {
  color: #b3b3b3;
}

.spotify-search input:focus {
  border-color: white;
  background-color: #3e3e3e;
}
</style>