<template>
  <div class="form" style="padding-top:80px;">
    <a-row :gutter="15" type="flex" justify="center">
      <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="12">
        <a-form-model
          ref="form"
          :model="form"
          :layout="device === 'desktop' ? 'horizontal' : 'vertical'"
          v-bind="formItemLayout"
          :rules="rules"
        >
          <a-form-model-item label="Activity name" prop="name">
            <a-input v-model="form.name" />
          </a-form-model-item>
          <a-form-model-item label="Activity zone" prop="region">
            <a-select
              v-model="form.region"
              placeholder="please select your zone"
            >
              <a-select-option value="shanghai">
                Zone one
              </a-select-option>
              <a-select-option value="beijing">
                Zone two
              </a-select-option>
            </a-select>
          </a-form-model-item>
          <a-form-model-item label="Activity time" prop="date1">
            <a-date-picker
              v-model="form.date1"
              show-time
              type="date"
              placeholder="Pick a date"
              style="width: 100%;"
            />
          </a-form-model-item>
          <a-form-model-item label="Instant delivery" prop="delivery">
            <a-switch v-model="form.delivery" />
          </a-form-model-item>
          <a-form-model-item label="Activity type" prop="type">
            <a-checkbox-group v-model="form.type">
              <a-checkbox value="1" name="type">
                Online
              </a-checkbox>
              <a-checkbox value="2" name="type">
                Promotion
              </a-checkbox>
              <a-checkbox value="3" name="type">
                Offline
              </a-checkbox>
            </a-checkbox-group>
          </a-form-model-item>
          <a-form-model-item label="Resources" prop="resource">
            <a-radio-group v-model="form.resource">
              <a-radio value="1">
                Sponsor
              </a-radio>
              <a-radio value="2">
                Venue
              </a-radio>
            </a-radio-group>
          </a-form-model-item>
          <a-form-model-item label="Activity form" prop="desc">
            <a-input v-model="form.desc" type="textarea" />
          </a-form-model-item>
          <a-form-model-item :wrapper-col="{ span: 14, offset: 6 }">
            <a-button type="primary" @click="onSubmit">
              新增
            </a-button>
            <a-button style="margin-left: 10px;">
              返回
            </a-button>
          </a-form-model-item>
          <a-form-item
            label="Upload"
            extra="longgggggggggggggggggggggggggggggggggg"
          >
            <a-upload
              :customRequest="fileUpload"
              name="logo"
              list-type="picture"
            >
              <a-button> <a-icon type="upload" /> Click to upload </a-button>
            </a-upload>
          </a-form-item>
        </a-form-model>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import file from "@/services/file.service.js";
export default {
  name: "Form",
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        name: "",
        region: undefined,
        date1: undefined,
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },
      rules: {
        name: [
          {
            required: true,
            message: "Please input Activity name",
            trigger: "blur"
          },
          {
            min: 3,
            max: 5,
            message: "Length should be 3 to 5",
            trigger: "blur"
          }
        ],
        region: [
          {
            required: true,
            message: "Please select Activity zone",
            trigger: "change"
          }
        ],
        date1: [
          { required: true, message: "Please pick a date", trigger: "change" }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "Please select at least one activity type",
            trigger: "change"
          }
        ],
        resource: [
          {
            required: true,
            message: "Please select activity resource",
            trigger: "change"
          }
        ],
        desc: [
          {
            required: true,
            message: "Please input activity form",
            trigger: "blur"
          }
        ]
      }
    };
  },
  computed: {
    ...mapGetters("common", ["device"]),
    formItemLayout() {
      return this.device === "desktop"
        ? {
            labelCol: { span: 6 },
            wrapperCol: { span: 14 }
          }
        : {};
    }
  },
  methods: {
    async fileUpload(e) {
      console.log(e.file);
      const chunkSize = 40000000;
      for (let start = 0; start < e.file.size; start += chunkSize) {
        const chunk = e.file.slice(start, start + chunkSize + 1);
        const fd = new FormData();
        fd.append("img", chunk);
        await file.fileUpload(fd);
      }
    },
    onSubmit() {
      console.log("submit!", this.form);
    }
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  }
};
</script>
