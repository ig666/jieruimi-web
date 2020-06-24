<template>
  <div class="info-form" style="padding-top:80px;">
    <a-row :gutter="15" type="flex" justify="center">
      <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="12">
        <a-form-model
          ref="form"
          :model="form"
          :layout="device === 'desktop' ? 'horizontal' : 'vertical'"
          v-bind="formItemLayout"
        >
          <a-row :gutter="15">
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <a-row :gutter="15">
                <a-form-model-item label="姓名" prop="name">
                  <a-input v-model="form.name" />
                </a-form-model-item>
                <a-form-model-item label="性别" prop="name">
                  <a-input v-model="form.name" />
                </a-form-model-item>
              </a-row>
            </a-col>
            <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
              <a-form-model-item label="照片" prop="name">
                <a-upload
                  :customRequest="() => {}"
                  name="avatar"
                  listType="picture-card"
                  class="avatar-uploader"
                  :showUploadList="false"
                >
                  <img
                    v-if="face"
                    :src="face"
                    alt="avatar"
                    style="width:86px;height:86px"
                  />
                  <div v-else>
                    <a-icon :type="loading ? 'loading' : 'plus'" />
                    <div class="ant-upload-text">上传照片</div>
                  </div>
                </a-upload>
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-row :gutter="15">
            <a-col
              :xs="24"
              :sm="24"
              :md="12"
              :lg="12"
              :xl="12"
              v-for="item in 9"
              :key="item"
            >
              <a-form-model-item :label="`Activity name${item}`" prop="name">
                <a-input v-model="form.name" />
              </a-form-model-item>
            </a-col>
          </a-row>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button type="primary">
              新增
            </a-button>
            <a-button style="margin-left: 10px;">
              返回
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  name: "InfoForm",
  data() {
    return {
      loading: false,
      face: "",
      form: {
        name: "",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      }
    };
  },
  computed: {
    ...mapGetters("common", ["device"]),
    formItemLayout() {
      return this.device === "desktop"
        ? {
            labelCol: { span: 8 },
            wrapperCol: { span: 16 }
          }
        : {};
    }
  }
};
</script>

<style lang="less" scoped></style>
