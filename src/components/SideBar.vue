<script setup lang="ts">
</script>

<template>
  <div>
    <div id="SideNav" class="h-[100%] p-6 w-[240px] fixed bg-black">
      <RouterLink to="/">
        <img width="125" src="/images/icons/spotify-logo.png">
      </RouterLink>

      <ul class="mt-10">
        <RouterLink to="/" class="flex items-center gap-3 mb-4 hover:grayscale hover:brightness-150 transition duration-30">
          <img width="23" src="/images/icons/home-inactive.png">
          <span class="font-medium text-[15px] text-gray-400">Home</span>
        </RouterLink>

        <RouterLink to="/search" class="flex items-center gap-3 mb-4 hover:grayscale hover:brightness-150 transition duration-30">
          <img width="23" src="/images/icons/search-inactive.png">
          <span class="font-medium text-[15px] text-gray-400">Search</span>
        </RouterLink>

        <RouterLink to="/library" class="flex items-center gap-3 mb-10 hover:grayscale hover:brightness-150 transition duration-30">
          <img width="23" src="/images/icons/library-inactive.png">
          <span class="font-medium text-[15px] text-gray-400">Library</span>
        </RouterLink>

        <RouterLink to="/create-playlist" class="flex items-center gap-3 mb-4 hover:grayscale hover:brightness-150 transition duration-30">
          <img width="30" src="/images/icons/playlist-inactive.png">
          <span class="font-medium text-[15px] text-gray-400">Create Playlist</span>
        </RouterLink>

        <RouterLink to="/liked" class="flex items-center gap-3 mb-4 hover:grayscale hover:brightness-150 transition duration-30">
          <img width="30" src="/images/icons/liked-inactive.png">
          <span class="font-medium text-[15px] text-gray-400">Liked Songs</span>
        </RouterLink>
      </ul>

      <hr class="border-b border-b-gray-700 mt-2">

      <ul>
        <li class="font-medium text-[14px] mt-3 text-gray-300 hover:text-white select-none cursor-pointer">My Playlist #1</li>
        <li class="font-medium text-[14px] mt-3 text-gray-300 hover:text-white select-none cursor-pointer">My Playlist #2</li>
        <li class="font-medium text-[14px] mt-3 text-gray-300 hover:text-white select-none cursor-pointer">My Playlist #3</li>
        <li class="font-medium text-[14px] mt-3 text-gray-300 hover:text-white select-none cursor-pointer">My Playlist #4</li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
