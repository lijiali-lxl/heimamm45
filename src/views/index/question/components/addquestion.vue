<template>
  <!-- 新增对话框 -->
  <el-dialog
    title="新增题库测试"
    :visible.sync="dialogFormVisible"
    class="questionwindow"
    center
    fullscreen
    @opened="opened"
  >
    <el-form
      :model="addquestionForm"
      :rules="rules"
      ref="addquestionForm"
      label-width="100px"
      class="demo-addquestionForm"
    >
      <el-form-item label="学科" prop="subject" :label-width="formLabelWidth">
        <el-select v-model="addquestionForm.subject" placeholder="请选择学科">
          <el-option
            :label="item.short_name"
            :value="item.id"
            v-for="item in $parent.subjectList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="阶段" prop="step" :label-width="formLabelWidth">
        <el-select v-model="addquestionForm.step" placeholder="请选择角色">
          <el-option label="初级" :value="1"></el-option>
          <el-option label="中级" :value="2"></el-option>
          <el-option label="高级" :value="3"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="企业" prop="enterprise" :label-width="formLabelWidth">
        <el-select v-model="addquestionForm.enterprise" placeholder="请选择角色">
          <el-option
            :label="item.short_name"
            :value="item.id"
            v-for="item in $parent.enterpriseList"
            :key="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="城市" prop="city" :label-width="formLabelWidth">
        <el-cascader v-model="addquestionForm.city" :options="options" @change="handleChange"></el-cascader>
      </el-form-item>

      <el-form-item label="题型" prop="type" :label-width="formLabelWidth">
        <el-radio-group v-model="addquestionForm.type">
          <el-radio :label="1">单选</el-radio>
          <el-radio :label="2">多选</el-radio>
          <el-radio :label="3">简答</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="难度" prop="difficulty" :label-width="formLabelWidth">
        <el-radio-group v-model="addquestionForm.difficulty">
          <el-radio :label="1">简单</el-radio>
          <el-radio :label="2">一般</el-radio>
          <el-radio :label="3">困难</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-divider></el-divider>
      <!-- 试题标题富文本 -->
      <el-form-item label="试题标题" prop="title" :label-width="formLabelWidth">
      <br>
        <div class="toolbar" ref="toolbar" id="div1"></div>
        <div class="text" ref="text">
          <p>请输入内容</p>
        </div>
      </el-form-item>

      <!-- 单选框 -->
      <el-form-item
        label="单选"
        :label-width="formLabelWidth"
        prop="single_select_answer"
        v-if="addquestionForm.type==1"
      >
        <br />
        <el-radio-group v-model="addquestionForm.single_select_answer">
          <!-- 单选A -->
          <div class="danxuan">
            <el-radio label="A">A</el-radio>
            <el-input v-model="addquestionForm.select_options[0].text" placeholder="请输入内容"></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadURL"
              :show-file-list="false"
              :on-success="handleAvatarSuccessA"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrlA" :src="imageUrlA" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 单选B -->
          <div class="danxuan">
            <el-radio label="B">B</el-radio>
            <el-input v-model="addquestionForm.select_options[1].text" placeholder="请输入内容"></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadURL"
              :show-file-list="false"
              :on-success="handleAvatarSuccessB"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrlB" :src="imageUrlB" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 单选C -->
          <div class="danxuan">
            <el-radio label="C">C</el-radio>
            <el-input v-model="addquestionForm.select_options[2].text" placeholder="请输入内容"></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadURL"
              :show-file-list="false"
              :on-success="handleAvatarSuccessC"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrlC" :src="imageUrlC" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 单选D -->
          <div class="danxuan">
            <el-radio label="D">D</el-radio>
            <el-input v-model="addquestionForm.select_options[3].text" placeholder="请输入内容"></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadURL"
              :show-file-list="false"
              :on-success="handleAvatarSuccessD"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrlD" :src="imageUrlD" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-radio-group>
      </el-form-item>

      <!-- 多选框 -->
      <el-form-item
        label="多选选"
        :label-width="formLabelWidth"
        prop="multiple_select_answer"
        v-else-if="addquestionForm.type==2"
      >
        <br />
        <el-checkbox-group v-model="addquestionForm.multiple_select_answer">
          <!-- 单选A -->
          <div class="danxuan">
            <el-checkbox label="A">A</el-checkbox>
            <el-input v-model="addquestionForm.select_options[0].text" placeholder="请输入内容"></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadURL"
              :show-file-list="false"
              :on-success="handleAvatarSuccessA"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrlA" :src="imageUrlA" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 单选B -->
          <div class="danxuan">
            <el-checkbox label="B">B</el-checkbox>
            <el-input v-model="addquestionForm.select_options[1].text" placeholder="请输入内容"></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadURL"
              :show-file-list="false"
              :on-success="handleAvatarSuccessB"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrlB" :src="imageUrlB" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 单选C -->
          <div class="danxuan">
            <el-checkbox label="C">C</el-checkbox>
            <el-input v-model="addquestionForm.select_options[2].text" placeholder="请输入内容"></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadURL"
              :show-file-list="false"
              :on-success="handleAvatarSuccessC"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrlC" :src="imageUrlC" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
          <!-- 单选D -->
          <div class="danxuan">
            <el-checkbox label="D">D</el-checkbox>
            <el-input v-model="addquestionForm.select_options[3].text" placeholder="请输入内容"></el-input>
            <el-upload
              class="avatar-uploader"
              :action="uploadURL"
              :show-file-list="false"
              :on-success="handleAvatarSuccessD"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrlD" :src="imageUrlD" class="avatar" />
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </div>
        </el-checkbox-group>
      </el-form-item>

      <!-- 简单题 -->
      <el-form-item
        label="简单题"
        prop="short_answer"
        :label-width="formLabelWidth"
        v-else-if="addquestionForm.type==3"
      >
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="addquestionForm.short_answer"
        ></el-input>
      </el-form-item>

      <!-- 分割线 -->
      <el-divider></el-divider>
      <!-- 解析视频 -->

      <el-form-item label="视频解析" :label-width="formLabelWidth">
        <el-upload
          class="upload-demo"
          :action="uploadURL"
          :on-success="handleVideoSuccess"
          :before-upload="beforeVideoUpload"
          :show-file-list="false"
        >
          <el-button size="small" type="primary">点击上传</el-button>
          <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
        </el-upload>
        <video :src="videoURL" controls autoplay loop class="video" v-if="videoURL"></video>
      </el-form-item>

      <!-- 答案解析富文本 -->

      <el-form-item label="答案解析" :label-width="formLabelWidth" prop="answer_analyze">
      <br>
        <div class="ansuerbar" ref="ansuerbar" id="div2"></div>
        <div class="ansuerbartext" ref="ansuerbartext">
          <p>请输入内容</p>
        </div>
      </el-form-item>
      <!-- 用户备注 -->
      <el-form-item label="用户备注" :label-width="formLabelWidth" prop="remark">
        <el-input v-model="addquestionForm.remark" autocomplete="off"></el-input>
      </el-form-item>
    </el-form>

    <div slot="footer" class="dialog-footer">
      <el-button @click="resetForm()">取 消</el-button>
      <el-button type="primary" @click="submitForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
//引入富文本
import wangeditor from "wangeditor";
//引入省市连级
import { regionData } from "element-china-area-data";
//引入接口
import { addquestion } from "@/api/question.js";

export default {
  data() {
    return {
      imageUrl: "",
      //对话框
      dialogTableVisible: false,
      dialogFormVisible: false,
      //图片上传临时地址
      uploadURL: process.env.VUE_APP_BASEURL + "/question/upload",
      //图片上传地址
      imageUrlA: "",
      //图片上传地址
      imageUrlB: "",
      //图片上传地址
      imageUrlC: "",
      //图片上传地址
      imageUrlD: "",
      //视频路径
      videoURL: "",

      addquestionForm: {
        //标题
        title: "",
        //学科
        subject: "",
        //阶段
        step: "",
        //企业
        enterprise: "",
        //城市
        city: "",
        //题型
        type: '',
        //题目难度
        difficulty: "",
        //视频
        video: "",
        //备注
        remark: "",
        //单选题答案
        single_select_answer: "",
        multiple_select_answer: [],
        //单选框
        select_options: [
          {
            label: "A",
            text: "狗不理",
            image: "upload/20191129/fd5f03a07d95e3948860240564b180e4.jpeg"
          },
          {
            label: "B",
            text: "猫不理",
            image: "upload/20191129/e93e7bb72accda7f3159cdabc4203991.jpeg"
          },
          {
            label: "C",
            text: "麻花",
            image: "upload/20191129/b7caf98be9d0aa6764b0112ba0dfa19e.jpeg"
          },
          {
            label: "D",
            text: "炸酱面",
            image: "upload/20191129/4067f19ab53a5e8388ad3459e23110f0.jpeg"
          }
        ],
        short_answer: "",
        answer_analyze:''
      },
      rules: {
        title: [
          { required: true, message: "请输入活动名称", trigger: "change" }
        ],
        subject: [
          { required: true, message: "请输入活动名称", trigger: "change" }
        ],
        enterprise: [
          { required: true, message: "请输入活动名称", trigger: "change" }
        ],
        city: [
          { required: true, message: "请输入活动名称", trigger: "change" }
        ],
        type: [
          { required: true, message: "请输入活动名称", trigger: "change" }
        ],
        difficulty: [
          { required: true, message: "请输入活动名称", trigger: "change" }
        ],

        remark: [
          { required: true, message: "请输入活动名称", trigger: "change" }
        ],
        single_select_answer: [
          { required: true, message: "请输入活动名称", trigger: "change" }
        ],
        multiple_select_answer: [
          { required: true, message: "请输入活动名称", trigger: "change" }
        ],
        select_options: [
          { required: true, message: "请输入活动名称", trigger: "change" }
        ],
        short_answer: [
          { required: true, message: "请输入活动名称", trigger: "change" }
        ],
        step: [
          { required: true, message: "请输入活动名称", trigger: "change" }
        ],
        answer_analyze: [
          { required: true, message: "请输入活动名称", trigger: "change" }
        ]
      },
      formLabelWidth: "120px",
      topeditor: undefined,
      ansuer: undefined,

      // //省动联级
      // city: [],
      options: regionData
    };
  },
  methods: {
    submitForm() {
      this.$refs.addquestionForm.validate(valid => {
        if (valid) {
          addquestion(this.addquestionForm).then(res => {
         if (res.code==200) {
           this.$message.success('新增成功')
           
           this.$refs.addquestionForm.resetFields()
           this.$parent.getList()
           this.topeditor.txt.html('<p>用 JS 设置的内容</p>')
           this.ansuer.txt.html('<p>用 JS 设置的内容</p>')
           this.videoURL=''
           this.dialogFormVisible=false
         }
          });
        } else {
          window.console.log("111");
          return false;
        }
      });
    },
    //点击取消按钮
    resetForm() {
      this.$refs.addquestionForm.resetFields();
      this.dialogFormVisible = false;
    },
    //显示富文本
    opened() {
      if (this.topeditor == undefined) {
        this.topeditor = new wangeditor(this.$refs.toolbar, this.$refs.text);
        this.topeditor.customConfig.onchange = html => {
          // html 即变化之后的内容
          this.addquestionForm.title = html;
        };

        this.topeditor.create();
      }
      if (this.ansuer == undefined) {
        this.ansuer = new wangeditor(
          this.$refs.ansuerbar,
          this.$refs.ansuerbartext
        );
        this.ansuer.customConfig.onchange = html => {
          // html 即变化之后的内容
          window.console.log(html);
          this.addquestionForm.answer_analyze = html;
        };

        this.ansuer.create();
      }
    },
    handleChange(value) {
      window.console.log(value);
    },
    //图片上传
    handleAvatarSuccessA(res, file) {
      this.imageUrlA = URL.createObjectURL(file.raw);
      this.addquestionForm.select_options[0].image = res.data.url;
    },
    handleAvatarSuccessB(res, file) {
      this.imageUrlB = URL.createObjectURL(file.raw);

      this.addquestionForm.select_options[1].image = res.data.url;
    },
    handleAvatarSuccessC(res, file) {
      this.imageUrlC = URL.createObjectURL(file.raw);

      this.addquestionForm.select_options[2].image = res.data.url;
    },
    handleAvatarSuccessD(res, file) {
      this.imageUrlD = URL.createObjectURL(file.raw);

      this.addquestionForm.select_options[3].image = res.data.url;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg" || file.type === "image/png";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //视频解析
    handleVideoSuccess(res, file) {
      this.videoURL = URL.createObjectURL(file.raw);
      this.addquestionForm.video = res.data.url;
    },
    beforeVideoUpload(file) {
      // window.console.log(file)
      const isJPG = file.type === "video/mp4";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 mp4 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    }
  },
  created() {}
};
</script>

<style lang='less'>
.questionwindow {
  .toolbar,
  .ansuerbar {
    border: 1px solid #ccc;
  }
  .text,
  .ansuerbartext {
    border: 1px solid #ccc;
    height: 100px;
  }
  // #div1{
  //     height: 100px;
  // }
  .el-dialog__body {
    width: 869px;
    margin: 0 auto;
  }
  .el-form-item .danxuan {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  //文件上传
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409eff;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .el-input .el-input__inner {
    width: 476px;
    margin: 10px;
  }
  .video {
    width: 500px;
  }
}
</style>