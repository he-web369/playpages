<template>
  <el-container id="app">
    <el-header id="header" height="50px">
      <Header/>
    </el-header>
    <div style="padding:0;" >
      <div class="top-banner"></div>
      <div class='tit-line'>
        <span class="tit" style="font-size: 38px;">登录</span>
      </div>
      <div class="login-box">
        <div class="login-left">
          <div class="qrCodeBox">
            <img width="180px" src="data:image/png;base64,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" alt="登录">
            <div class="qrcode-footer">
              <p class="status-txt">扫描二维码登录</p>
             <p class="app-link">请使用<a href="javascript:;" >客户端</a><br>扫码登录<br>或扫码下载APP</p>
            </div>
          </div>
        </div>
        <div class="login-right">
          <el-tabs v-model="activeName" class="tabs" >
            <el-tab-pane label="密码登录" name="first" style="margin-left:-30px">
              <el-form :model="ruleForm1" :rules="rules" ref="ruleForm1" label-width="100px" >
                <el-form-item label="名称" prop="name">
                  <el-input v-model="ruleForm1.name" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                  <el-input type="password" v-model="ruleForm1.password" autocomplete="off" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm1')">登录</el-button>
                  <el-button @click="resetForm('ruleForm1')">重置</el-button>
                  <el-link type="primary" style="margin-left:10px;font-size:12px">忘记密码？</el-link>
                </el-form-item>
              </el-form>
            </el-tab-pane>
            <el-tab-pane label="短信登录" name="second"  style="margin-left:-30px">
              <el-form :model="ruleForm2" :rules="rules" ref="ruleForm2" label-width="100px" >
                <el-form-item label="电话" prop="phone">
                  <el-input v-model="ruleForm2.phone" placeholder="请输入电话"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="validCode" style="position:relative">
                  <el-input  v-model="ruleForm2.validCode" autocomplete="off" placeholder="请输入验证码"></el-input>
                  <el-button 
                  :disabled="!isTimeOver"
                  @click="toggleTime"
                  size="small" 
                  type="primary" 
                  class="send-code" 
                  round>{{isTimeOver?"点击发送验证码":`${time}秒后再次点击发送`}}</el-button>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
                  <el-button @click="resetForm('ruleForm2')">重置</el-button>
                  <el-link type="primary" style="margin-left:10px;font-size:12px">忘记密码？</el-link>
                </el-form-item>
              </el-form>
            </el-tab-pane>
          </el-tabs>
        </div>
      </div>
    </div>
      <Footer/>
  </el-container>
</template>

<script>
import Header from '../../components/Header'
import Footer from '../../components/Footer'
export default {
  name:'login',
    data () {
      return {
          time:30,
          isTimeOver:true,
          activeName:'first',
          ruleForm1: {
            name: '',
            password:''
          },
          ruleForm2: {
            phone: '',
            validCode:''
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
   components: {
     Header,Footer
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
            this.$message({
              message: '登录成功',
              type: 'success'
            })
            window.localStorage.setItem('user',JSON.stringify({name:this.ruleForm1.name}))
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
  #app{
     #header{
      background-color: rgba(255,165,0,.5);
      box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.08);
     }
     .tit-line{
        width: 980px;
        height: 28px;
        margin: 0 auto;
        border-bottom: 1px solid rgba(0,0,0,.2);
        margin-bottom: 28px;
        text-align: center;
        .tit{
          height: 56px;
          line-height: 56px;
          margin: 0 auto;
          padding: 0 20px;
          font-size: 40px;
          background: #fff;
          text-align: center;
        }
     }
     .top-banner{
      background: rgb(245,245,245);
      height: 10px;
      margin-bottom: 20px;
      box-shadow: 0 4px 6px 0 rgba(0, 0, 0, 0.08);
     }
      .login-box{
        &:extend(.clearfix);
        position: relative;
        width: 980px;
        margin: 0 auto;
        .login-left{
          float: left;
          width: 489px;
          position: relative;
          .qrCodeBox{
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            .qrcode-footer{
              height: 155px;
              .status-txt{
                  padding-top: 20px;
                  text-align: center;
                  color: #222;
                  font-size: 18px;
                  letter-spacing: 3px;
                  margin-bottom: 5px;
              }
              .app-link{
                text-align: center;
                color: #717171;
                font-size: 14px;
              }
            }
          }
        }
        .login-right{
            float: right;
            padding-left: 45px;
            width: 490px;
            .tabs{
              padding-left: 60px;
              border-left: 1px solid rgba(0,0,0,.2);
              .send-code{
                position: absolute;
                right:5px;
                top:50%;
                transform: translateY(-50%)
              }
            }
        }
      }
  }
</style>
 