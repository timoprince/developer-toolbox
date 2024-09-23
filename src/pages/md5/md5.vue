<script setup lang="ts">
import md5 from "crypto-js/md5";
import {v4 as uuid} from "uuid";
import {useIndexedDbHook} from "@/hooks/useIndexedDbHook.ts";
import {createVNode, ref} from "vue";
import {defaultMd5RowField, Md5Row, Md5RowField} from "@/pages/md5/interfaces/Md5Row.ts";
import PanelMarkdown from "@/components/panel-markdown.vue";
import {ClearOutlined} from "@ant-design/icons-vue";
import {time} from "@/utils/functions.ts";

let {writeToDatabase, selectInDatabase} = useIndexedDbHook();

let field = ref<Md5RowField>(defaultMd5RowField());

async function pageInit() {
  await writeToDatabase("md5", {"id": 1, "value": md5("123456").toString()})
}

async function onSubmit() {
  let md5Row: Md5Row = {...field.value} as Md5Row;
  md5Row.ciphertext = md5(md5Row.plaintext).toString();
  md5Row.id = uuid();
  md5Row.created_at = time();
  md5Row.updated_at = time();
  await writeToDatabase("md5", md5Row);
}

pageInit();
</script>

<template>
  <a-row :gutter="[15,15]">
    <a-col :xs="24" :md="16">
      <a-flex vertical :gap="15">
        <a-card title="表单">
          <a-form :model="field" @finish="onSubmit" layout="horizontal" :label-col="{style: {width: '6em'}}">
            <a-form-item label="原文">
              <a-textarea v-model:value.trim="field.plaintext" placeholder="请输入原文" allow-clear></a-textarea>
            </a-form-item>
            <a-form-item label="可选项">
              <a-space>
                <a-checkbox v-model:checked="field.uppercase">大写</a-checkbox>
                <a-checkbox v-model:checked="field.short">16位</a-checkbox>
              </a-space>
            </a-form-item>
            <a-form-item :wrapper-col="{style: {marginLeft: '6em'}}">
              <a-space>
                <a-button type="primary" html-type="submit">获取MD5值</a-button>
                <a-button :icon="createVNode(ClearOutlined)">清除缓存</a-button>
              </a-space>
            </a-form-item>
          </a-form>
        </a-card>
        <a-card title="历史记录" body-style="padding: 0;">
          <a-table></a-table>
        </a-card>
      </a-flex>
    </a-col>
    <a-col :xs="24" :md="8">
      <panel-markdown title="什么是MD5" filename="/markdown/md5.md"></panel-markdown>
    </a-col>
  </a-row>
</template>

<style scoped lang="scss">

</style>