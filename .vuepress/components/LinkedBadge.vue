<template>
  <a :href="url">
    <Badge :text="text" :type="type" />
  </a>
</template>

<script>
import Badge from '@vuepress/theme-default/global-components/Badge.vue';
import markdownIt from 'markdown-it';

const md = markdownIt();

export default {
  components: {
    Badge,
  },
  props: {
    url: String,
    text: String,
    type: String,
  },
  mounted() {
    this.url = md.renderInline(this.url).toString();
  },
};
</script>
