<template>
    <el-row type='flex'  align="middle"  id="wrapper" :gutter="10">
        <el-col :span="3" class="logoContainer" >
            <div style="transform: rotateZ(-45deg)" @click="jumpTo('/home')">
                <div class="ballContainer" >
                    <div class="logo"></div>
                    <div class="logo logo1"></div>
                    <div class="logo logo2"></div>
                    <div class="logo logo3"></div>
                </div>
            </div>
            <div >
                <div class="ballContainer" @click="jumpTo('/home')">
                        <div class="logo"></div>
                        <div class="logo  logo1"></div>
                        <div class="logo logo2"></div>
                        <div class="logo logo3"></div>
                </div>
                <div class="smallLogo"></div>
            </div>
            <div style="transform: rotateZ(45deg)" @click="jumpTo('/home')">
                <div class="ballContainer">
                        <div class="logo"></div>
                        <div class="logo  logo1"></div>
                        <div class="logo logo2"></div>
                        <div class="logo logo3"></div>
                    </div>
            </div>
        </el-col>
        <el-col :span="4" class="member">
           <el-dropdown  placement="bottom"  >
            <span class="el-dropdown-link pText" >
                日榜
            </span>
            <el-dropdown-menu slot="dropdown" style="background-color:rgb(245,245,245)">
                <el-dropdown-item icon="el-icon-caret-right" 
                 v-for="(item ,index) in songs" :key="index">{{item.name}}--{{item.singer}}</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown  placement="bottom" >
                <span class="el-dropdown-link pText" >
                    周榜
                </span>
                <el-dropdown-menu slot="dropdown" style="background-color:rgb(245,245,245)">
                    <el-dropdown-item icon="el-icon-caret-right" 
                    v-for="(item ,index) in songs" :key="index">{{item.name}}--{{item.singer}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
            <el-dropdown  placement="bottom">
                <span class="el-dropdown-link pText" >
                    月榜
                </span>
                <el-dropdown-menu slot="dropdown" style="background-color:rgb(245,245,245)">
                    <el-dropdown-item icon="el-icon-caret-right" 
                 v-for="(item ,index) in songs" :key="index">{{item.name}}--{{item.singer}}</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
        <el-col :span="5" class="search">
            <el-input class="search-input"
            clearable 
            v-model="inputVal" 
            placeholder="请输入内容"
            >
            </el-input>
            <el-button @click="searchSong" size="small"  icon="el-icon-search" :loading='isSearch'></el-button>
        </el-col>
        <el-col :span="5" class="member">
            <p class="pText">歌手</p>
            <p class="pText">MV</p>
            <p class="pText">LIVE</p>
           <el-dropdown placement="bottom">
                <div class="el-dropdown-link pText " >
                    大会员
                </div>
                <el-dropdown-menu slot="dropdown" style="background-color:rgb(245,245,245)">
                    <el-dropdown-item style="width:130px">开通大会员领50红包</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </el-col>
        <el-col :span="7" id="avatarContainer">
            <el-button type="info" size="small" round>下载客户端</el-button>
            <el-dropdown placement="bottom" @command="quitLogin" szie="small">
                    <el-avatar class="avatar el-dropdown-link" size="large" :src="user.avatarUrl||`https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png`"></el-avatar>
                    <el-dropdown-menu slot="dropdown" >
                        <el-dropdown-item class="sign" :disabled="!user.name"  icon="el-icon-user-solid">用户名：{{user.name||"无"}}</el-dropdown-item>
                        <el-dropdown-item class="sign"  :disabled="!user.sign" divided icon="el-icon-edit">签名：{{user.sign||"无"}}</el-dropdown-item>
                        <el-dropdown-item class="sign"   icon="el-icon-user" divided command="quit">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            <el-button v-if="!user.name"  @click="jumpTo('/login')" class="login" size="small"  round>登录</el-button>
            <el-button v-else  @click="jumpTo('/logup')" id="login" size="small"  round icon="el-icon-setting"></el-button>
            <el-button v-show="!user.name" @click="jumpTo('/logup')" size="small" class="login" round>注册</el-button>
            <el-button icon="el-icon-back" circle @click="$router.back()"></el-button>
        </el-col>
    </el-row>
</template>

<script>
export default {
    data () {
        return {
            inputVal:'',
            isSearch:false,
            user:{},
            songs:[
                    {name:'walk away',singer:'joy bob'},
                    {name:'Holy Virgin',singer:'Groove Coverage'},
                    {name:'Stop!Stop!Stop!',singer:'VIRGOS'},
                    {name:'Natural',singer:'Imagine Dragons'},
                    {name:'Ferrari',singer:'Bebe Rexha'},
                ]
        }  
    },
    methods: {
        searchSong(){
            this.isSearch=true
            setTimeout(() => {
                this.isSearch=false
            }, 2000);
        },
        jumpTo(str){
            this.$router.push(str)
        },
        //退出登录
        quitLogin(e){
            if(e==="quit"){
                this.$confirm('确定退出吗?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    window.localStorage.removeItem('user')
                    this.user={}
                    this.$message({
                        type: 'success',
                        message: '退出成功!'
                    })
                    this.$router.replace('/home')
                }).catch(() => {})
            }else{
                this.$router.push('/logup')
            }
        }   
    },
    mounted () {
        this.user=JSON.parse(window.localStorage.getItem('user'))||{}
    }
}
</script>

<style scoped lang="less">
@keyframes rotateSelf {
    0%{
        transform: rotateY(0);
    }
    100%{
       transform: rotateY(360deg);
   }
}
@keyframes rotatez {
    0%{transform: rotateZ(0);}
    100%{transform: rotateZ(360deg);}
}
 #wrapper{
     height: 100%;
     .logoContainer{
         display:flex;
         align-items:center;
         justify-content: center;
        perspective: 3000px;
        transform-style: preserve-3d;
        &:hover{
            cursor: pointer;
            .smallLogo{
                animation: rotatez 0.5s linear infinite;
            }
            .ballContainer{
                animation: rotateSelf 1s linear infinite;
            }
        }
        .smallLogo{
            width: 0;
            height: 0;
            border: 8px solid;
            border-radius: 8px;
            border-left-color: white;
            border-right-color: white;
            border-top-color: gray;
            border-bottom-color: gray;
            margin:1px 0 0 6px;
        }
         .ballContainer{
            transform-style: preserve-3d;
            position: relative;
             .logo{
                 width: 0;
                 height: 0;
                 border: 15px solid;
                 border-radius: 15px;
                 border-left-color: white;
                 border-right-color: white;
                 border-top-color: gray;
                 border-bottom-color: gray;
                 &.logo1{
                     position: absolute;
                     top: 0;
                     transform: rotateY(-45deg);
                 }
                 &.logo2{
                     position: absolute;
                     top: 0;
                     transform: rotateY(45deg);
                 }
                 &.logo3{
                     position: absolute;
                     top: 0;
                     transform: rotateY(90deg);
                 }
             }
         }
     }
     .search{
         display: flex;
         flex-direction: 'row';
     }
     #avatarContainer{
         display: flex;
         align-items: center;
         justify-content: flex-end;
         text-align: center;
     }
     .login{
         margin-right: -5px;
     }
     .pText{
         font-size: 18px;
         color:black;
         &:hover{
             text-decoration: underline;
             cursor: pointer;
             color:rgba(0,0,0,.5)
         }
     }
     .member{
         display: flex;
         align-items: center;
         justify-content: space-evenly;
         text-align: center;
     }
     .avatar{
         margin:0 5px;
         &:hover{
             cursor: pointer;
         }
     }
 }
    .sign{
        font-size: 13px;
        width: 130px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        text-align: center;
    }
</style>
 