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
          <a-form-model-item label="客户名称" prop="name">
            <a-input v-model="form.name" placeholder="填写客户名称">
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="检查日期" prop="checkDate">
            <a-date-picker v-model="form.checkDate" style="width:100%" />
          </a-form-model-item>
          <a-form-model-item label="报告日期" prop="reportDate">
            <a-date-picker v-model="form.reportDate" style="width:100%" />
          </a-form-model-item>
          <a-form-model-item label="检查人员" prop="checkPerson">
            <a-input v-model="form.checkPerson" placeholder="填写检查人员">
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="检查区域" prop="checkArea">
            <a-input v-model="form.checkArea" placeholder="填写检查区域">
              <a-icon slot="prefix" type="home" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="随行人员" prop="accompanyPerson">
            <a-input v-model="form.accompanyPerson" placeholder="填写随行人员">
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="检查项目" prop="inspectionItem">
            <a-input v-model="form.inspectionItem" placeholder="填写检查项目">
              <a-icon slot="prefix" type="tool" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item
            label="整体虫鼠患情况描述	"
            prop="overallDescription"
          >
            <a-textarea
              v-model="form.overallDescription"
              placeholder="填写整体虫鼠患情况描述"
              :auto-size="{ minRows: 3, maxRows: 5 }"
            />
          </a-form-model-item>
          <a-form-model-item label="服务商名称" prop="serviceProvider">
            <a-input
              v-model="form.serviceProvider"
              placeholder="填写服务商名称"
            >
              <a-icon slot="prefix" type="bank" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="服务人员" prop="server">
            <a-input v-model="form.server" placeholder="填写服务人员">
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-model-item>
          <a-form-model-item label="联系电话" prop="phone">
            <a-input v-model="form.phone" placeholder="联系电话">
              <a-icon slot="prefix" type="phone" />
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
        <a-button type="primary" @click="addImg">
          添加发现情况
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
import reportService from "@/services/report.service.js";
// import moment from "moment";
export default {
  name: "Form",
  data() {
    return {
      show: false,
      id: "",
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        serviceProvider: "",
        server: "",
        reportDate: "",
        phone: "",
        email: "",
        name: "",
        checkDate: "",
        checkPerson: "",
        checkArea: "",
        overallDescription: "",
        accompanyPerson: "",
        inspectionItem: ""
      },
      rules: {
        inspectionItem: [
          {
            required: false,
            message: "请填写检查项目",
            trigger: ["blur", "change"]
          }
        ],
        accompanyPerson: [
          {
            required: false,
            message: "请填写随行人员",
            trigger: ["blur", "change"]
          }
        ],
        overallDescription: [
          {
            required: true,
            message: "请填写整体虫鼠患情况描述",
            trigger: ["blur", "change"]
          }
        ],
        checkArea: [
          {
            required: true,
            message: "请填写检查区域",
            trigger: ["blur", "change"]
          }
        ],
        checkPerson: [
          {
            required: true,
            message: "请填写检查人员名称",
            trigger: ["blur", "change"]
          }
        ],
        checkDate: [
          {
            required: true,
            message: "请选择检查日期",
            trigger: ["blur", "change"]
          }
        ],
        name: [
          {
            required: true,
            message: "请填写客户名称",
            trigger: ["blur", "change"]
          }
        ],
        serviceProvider: [
          {
            required: true,
            message: "请填写服务商名称",
            trigger: ["blur", "change"]
          }
        ],
        server: [
          {
            required: true,
            message: "请填写服务人员",
            trigger: ["blur", "change"]
          }
        ],
        reportDate: [
          {
            required: true,
            message: "请选择报告日期",
            trigger: ["blur", "change"]
          }
        ],
        phone: [
          {
            required: true,
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
    addImg() {
      this.show = true;
    },
    cancal() {
      this.$router.go(-1);
    },
    onSubmit() {
      this.$refs.form.validate(async valid => {
        if (valid) {
          if (this.id) {
            let res = await reportService.report(
              { id: this.id, ...this.form },
              "PUT"
            );
            if (res) {
              message.success("修改成功");
              this.$router.go(-1);
            }
          } else {
            let res = await reportService.report(this.form, "POST");
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
      let res = await reportService.report({ id: this.$route.query.id });
      this.form = res[0];
    }
  },
  beforeDestroy() {
    console.log("beforeDestroy");
  }
};
</script>
