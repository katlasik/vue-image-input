<template>
  <div
    class="vii"
    @drag.stop.prevent 
    @dragover.stop.prevent
    @dragstart.stop.prevent="dragStart"
    @dragenter.stop.prevent="dragStart"
    @dragend.stop.prevent="dragEnd"
    @dragleave.stop.prevent="dragEnd"
    @drop.stop.prevent="drop"
    @click.self="click">
    <img @click.self="click" ref="img" :alt="alt" v-if="src && !displayDraggingSlot" :src="src">
    <figure :aria-label="alt" v-if="displayDefaultSlot">
      <template v-if="$slots.default">
        <slot name="default"></slot>
      </template>
      <template v-else>
        <div class="vii-slot">{{labels.default}}</div>
      </template>
    </figure>
    <figure :aria-label="alt" v-if="displayDraggingSlot">
      <template v-if="$slots.drag">
        <slot name="drag"></slot>
      </template>
      <template v-else>
        <div class="vii-slot">{{labels.drag}}</div>
      </template>
    </figure>
    <input ref="input" class="vii-input" type="file" :name="name" :accept="accept" @change="change">
  </div>
</template>
<script src="./script.js"></script>
<style lang="scss" src="./style.scss"></style>
