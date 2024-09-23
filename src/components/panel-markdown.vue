<script setup lang="ts">
import {createVNode, ref} from "vue";
import {marked} from "marked";
import {ReloadOutlined} from "@ant-design/icons-vue";
import {message} from "ant-design-vue";

let prop = withDefaults(defineProps<{
  title: string;
  filename: string;
}>(), {});

let html = ref<string>("");

async function onLoadMarkdown() {
  let response = await fetch([prop.filename, new Date().getTime()].join("?"));
  let content = await marked(await response.text());

  let elem = document.createElement("div");
  elem.innerHTML = content;
  elem.querySelectorAll("a").forEach(el => {
    let {hostname, hash} = new URL(el.href);
    if (hostname.startsWith("192.168")) {
      el.href = "/" + hash;
    } else {
      el.target = "_blank";
    }
  })

  html.value = elem.innerHTML;
}

async function onRefresh() {
  try {
    await onLoadMarkdown();
    message.success(`${prop.title}已刷新`);
  } catch (e) {
    message.error(`刷新${prop.title}失败！请稍后再试！`);
  }
}

onLoadMarkdown();
</script>

<template>
  <a-card :title="title">
    <template #extra>
      <a-tooltip title="重新加载">
        <a-button :icon="createVNode(ReloadOutlined)" @click="onRefresh"></a-button>
      </a-tooltip>
    </template>
    <div class="rich-text" v-html="html"></div>
  </a-card>
</template>

<style lang="scss">
.rich-text {
  font-size: 14px;
  color: #666666;

  ul, ol {
    margin: 0;
    padding: 0 0 0 1em;
  }

  li, p {
    code {
      font-family: Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;
      background-color: var(--theme-color);
      color: #ffffff;
      border-radius: 2px;
      padding: 2px 5px;
      font-size: 12px;
      margin: 0 5px;
    }
  }

  h1, h2, h3, h4, h5, p {
    margin: 10px 0;
  }

  blockquote {
    padding: 10px 10px 10px 15px;
    border-left: 5px solid var(--theme-color);
    background-color: var(--theme-color-light);
    margin: 15px 0;

    p {
      margin: 0;
    }
  }

  h1 {
    font-size: 18px;
  }

  h2 {
    font-size: 16px;
  }

  h3 {
    font-size: 14px;
  }

  h4, h5 {
    font-size: 12px;
  }
}
</style>