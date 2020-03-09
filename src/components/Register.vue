<template>
  <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" >
        <el-form-item label="名称" prop="name">
            <el-input v-model="ruleForm.name" placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="ruleForm.password" autocomplete="off" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
            <el-input v-model="ruleForm.phone" placeholder="请输入电话"></el-input>
        </el-form-item>
        <el-form-item label="验证码" prop="validCode" style="position:relative">
            <el-input  v-model="ruleForm.validCode" autocomplete="off" placeholder="请输入验证码"></el-input>
            <el-button 
            :disabled="!isTimeOver"
            @click="toggleTime"
            size="small" 
            type="primary" 
            class="send-code" 
            round>{{isTimeOver?"点击发送验证码":`${time}秒后再次点击发送`}}</el-button>
        </el-form-item>
        <el-form-item label=""  class="checkItem">
            <el-checkbox v-model="ruleForm.check"></el-checkbox>
            <div class="private">我已同意 <span class="protocol">《用户使用协议》</span>和 <span class="protocol">《隐私政策》</span>  </div>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')">注册</el-button>
            <el-button @click="resetForm('ruleForm')">重置</el-button>
            <el-link type="primary" style="margin-left:10px;font-size:12px" @click="$router.push('/login')">已有账号,直接登录>></el-link>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data () {
        return {
            time:30,
            isTimeOver:true,
            ruleForm: {
                name: '',
                password:'',
                phone: '',
                validCode:'',
                check:false
            },
            rules: {
                name: [
                { required: true, message: '请输入名称', trigger: 'blur' },
                { min: 1, max: 12, message: '长度在 1 到 12个字符', trigger: 'blur' },
                { validator: this.validateName, trigger: 'blur' }
                ],
                password:[
                { required: true, message: '请输入密码', trigger: 'blur' },
                { min: 6, max: 12, message: '长度在 6 到 12个字符', trigger: 'blur' },
                { validator: this.validateName, trigger: 'blur' }
                ],
                phone: [
                { required: true, message: '请输入电话', trigger: 'blur' },
                { validator: this.validatePhone, trigger: 'blur' }
                ],
                validCode:[
                { required: true, message: '请输入验证码', trigger: 'blur' },
                { validator: this.validateCode, trigger: 'blur' }
                ]
            }
        }
    },
    methods: {
        toggleTime(){
            this.isTimeOver=false
            this.timer=setInterval(() => {
                this.time--
                if(this.time===0){
                clearInterval(this.timer)
                this.isTimeOver=true
                this.time=30
                }
            }, 1000);
        },
        //表单验证
        validatePhone(rule,value,callback){
            if(!(/^1\d{10}$/.test(value))){
            callback(new Error('格式错误'))
            }else{
            callback()
            }
        },
        validateCode(rule,value,callback){
            if(!(/^\d{6}$/.test(value))){
            callback(new Error('验证码错误'))
            }else{
            callback()
            }
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
                    if(!this.ruleForm.check){
                        this.$message.error('须同意用户协议')
                        return false
                    }
                    this.$message({
                    message: '注册成功',
                    type: 'success'
                    })
                    window.localStorage.setItem('user',JSON.stringify({name:this.ruleForm.name}))
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
    .send-code{
        position: absolute;
        right:5px;
        top:50%;
        transform: translateY(-50%)
    }
    .checkItem{
        margin: -10px 0 0 0 ;
        position: relative;
        .private{
            font-size: 12px;
            position: absolute;
            top: 0;
            left: 20px;
            .protocol{
                color: rgba(0,0,0,.5);
                &:hover{
                    text-decoration: underline;
                    cursor: pointer;
                    color: dodgerblue;
                }
            }
        }
    }
</style>
 