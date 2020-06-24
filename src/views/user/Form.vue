<template>
  <div class="add-form" style="padding-top:80px;">
    <a-row :gutter="15" type="flex" justify="center">
      <a-col :xs="24" :sm="24" :md="18" :lg="18" :xl="12">
        <a-form-model
          ref="form"
          :model="form"
          :layout="device === 'desktop' ? 'horizontal' : 'vertical'"
          v-bind="formItemLayout"
          :rules="rules"
        >
          <a-form-model-item label="姓名" prop="realName">
            <a-input v-model="form.realName" placeholder="填写姓名">
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="用户名" prop="userName">
            <a-input v-model="form.userName" placeholder="填写用户名">
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="密码" prop="passWord" v-if="!id">
            <a-input-password v-model="form.passWord" placeholder="填写密码"
              ><a-icon slot="prefix" type="key" />
            </a-input-password>
          </a-form-model-item>
          <a-form-model-item label="手机号" prop="mobile">
            <a-input v-model="form.mobile" placeholder="填写手机号">
              <a-icon slot="prefix" type="phone" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="邮箱" prop="email">
            <a-input v-model="form.email" placeholder="填写邮箱号">
              <a-icon slot="prefix" type="mail" />
            </a-input>
          </a-form-model-item>
        </a-form-model>
      </a-col>
    </a-row>
    <a-row :gutter="15" type="flex" justify="center" style="margin-top:40px">
      <a-col :xs="20" :sm="24" :md="18" :lg="18" :xl="12" :offset="10">
        <a-button type="primary" @click="onSubmit">
          提交
        </a-button>
        <a-button @click="cancal" style="margin-left:2vw">
          取消
        </a-button>
      </a-col>
    </a-row>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { message } from "ant-design-vue";
import userService from "@/services/user.service.js";
export default {
  name: "Form",
  data() {
    return {
      id: "",
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        realName: "",
        userName: "",
        passWord: "",
        mobile: "",
        email: ""
      },
      rules: {
        realName: [
          {
            required: true,
            message: "请填写姓名",
            trigger: ["blur", "change"]
          }
        ],
        userName: [
          {
            required: true,
            message: "请填写用户名",
            trigger: ["blur", "change"]
          }
        ],
        passWord: [
          {
            required: true,
            message: "请填写密码",
            trigger: ["blur", "change"]
          }
        ],
        mobile: [
          {
            required: false,
            message: "请填写正确手机号",
            pattern: /^(?:(?:\+|00)86)?1(?:(?:3[\d])|(?:4[5-7|9])|(?:5[0-3|5-9])|(?:6[5-7])|(?:7[0-8])|(?:8[\d])|(?:9[1|8|9]))\d{8}$/,
            trigger: ["blur", "change"]
          }
        ],
        email: [
          {
            required: false,
            message: "请填写正确邮箱号",
            pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            trigger: ["blur", "change"]
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
    cancal() {
      this.$router.go(-1);
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.id) {
            let res = await userService.myUser(
              { id: this.id, ...this.form },
              "PUT"
            );
            if (res) {
              message.success("修改成功");
              this.$router.go(-1);
            }
          } else {
            let res = await userService.myUser(this.form, "POST");
            if (res) {
              message.success("新增成功");
              this.$router.go(-1);
            }
          }
        } else {
          return false;
        }
      });
    }
  },
  async mounted() {
    if (this.$route.query.id) {
      this.id = this.$route.query.id;
      let res = await userService.myUser({ id: this.$route.query.id });
      this.form = res[0];
    }
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  }
};
</script>
