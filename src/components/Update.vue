<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" status-icon label-width="100px" hide-required-asterisk size="small">
        <el-form-item label="头像" >
          <el-upload
            action="http://localhost:8080/#/logup/post"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload">
            <el-badge value="new">
              <el-avatar :src="ruleForm.avatarUrl||`https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`" size="large" ></el-avatar>
            </el-badge>
          </el-upload>
        </el-form-item>
        <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="签名">
          <el-input type="textarea" v-model="ruleForm.sign" ></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-radio-group v-model="ruleForm.gender">
            <el-radio label="男"></el-radio>
            <el-radio label="女"></el-radio>
            <el-radio label="不选择"></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">更新</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    mounted () {
      const {name,sign,avatarUrl,gender}=JSON.parse(window.localStorage.getItem('user'))
      this.ruleForm={name,sign,avatarUrl,gender}
    },
    data () {
        return {
            ruleForm: {
                name: '',
                gender:'',
                avatarUrl:'',
                sign:''
            },
            rules: {
                name: [
                  { required: true, message: '请输入名称', trigger: 'blur' },
                  { min: 1, max: 12, message: '长度在 1 到 12个字符', trigger: 'blur' },
                  { validator: this.validateName, trigger: 'blur' }
                ],
                avatarUrl:[
                  { required: true, message: '请选择性别', trigger: 'change' }
                ]
            }
        }
    },
    methods: {
        handleAvatarSuccess(res, file) {
          this.avatarUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;
          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        },
        validateName(rule,value,callback){
            if(!(/^\w+$/g.test(value))){
            callback(new Error('格式错误'))
            }else{
            callback()
            }
        },
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
            if (valid) {
                    this.$message({
                    message: '更新成功',
                    type: 'success'
                    })
                    window.localStorage.setItem('user',JSON.stringify(this.ruleForm))
                    this.$router.push('/home')
            } else {
                return false
            }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    }
   
}
</script>

<style scoped lang="less">
    
</style>
 