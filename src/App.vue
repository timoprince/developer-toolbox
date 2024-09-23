<script setup lang="ts">
import zhCN from 'ant-design-vue/es/locale/zh_CN';
import dayjs from 'dayjs';
import 'dayjs/locale/zh-cn';

dayjs.locale('zh-cn');
</script>

<template>
  <a-style-provider hash-priority="high">
    <a-config-provider :locale="zhCN">
      <a-layout class="layout">
        <a-layout-header class="layout-header"></a-layout-header>
        <a-layout-content class="layout-content">
          <router-view></router-view>
        </a-layout-content>
        <a-layout-footer class="layout-footer"></a-layout-footer>
      </a-layout>
    </a-config-provider>
  </a-style-provider>
</template>

<style lang="scss" scoped>
.layout {
  min-height: 100vh;
  background-color: #fff;

  .layout-header, .layout-content, .layout-footer {
    background-color: transparent;
    padding: 0 20px;
  }

  .layout-header {
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.1);
  }

  .layout-content {
    padding: 20px;
  }
}
</style>