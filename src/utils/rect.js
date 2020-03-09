
//渲染音乐长方形
export const rect= function(canvas,play){

    const ctx=canvas.getContext('2d')
    if(play){
        const endX=canvas.width/15
        const maxHeight=canvas.height*0.6
        const minHeight=canvas.height*0.4
        let timer= setInterval(() => {
                ctx.clearRect(0,0,canvas.width,canvas.height)
                    for (let index = 0; index < 15; index++) {
                        ctx.fillStyle= `rgb(${Math.random()*25},${Math.random()*25},${Math.random()*100},.7)`
                        ctx.fillRect(index*endX,canvas.height,endX,-(Math.random()*(maxHeight-minHeight)+minHeight))
                    }
        }, 200);
        return timer
    }else{
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }
}

//渲染弹幕
export const initRenderDanmu=function(canvas,video){
    class danmu{
        constructor(item){
            this.text=item.text
            this.time=item.time
            this.fontSize=item.fontSize
            this.color=item.color
            this.isInited=false
        }
        init(){
            let span=document.createElement('span')
            span.innerText=this.text
            span.style.fontSize=this.fontSize+'px'
            span.style.position='absolute'
            document.body.appendChild(span)
            this.width=span.clientWidth
            document.body.removeChild(span)
            this.x=canvas.width
            this.y=Math.random()*(canvas.height-this.fontSize)
            if(this.y<this.fontSize){
                this.y=this.fontSize
            }
            this.isRender=false
        }
        render(){
            ctx.fillStyle=this.color
            ctx.font=this.fontSize+'px sans-serif'
            ctx.fillText(this.text,this.x,this.y)
        }
    }
    const ctx=canvas.getContext('2d'),
        danmuArr=[
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:6.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:5.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:27.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:7.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:4.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:9.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:8.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:3.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:8.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:5.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:4.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:12.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:12.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:12.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:12.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:21.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:2.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:24.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:24.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:22.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:20.15}),
         new danmu({text:'弹幕测试',color:"#fff",fontSize:20,time:12.15}),
        ]
     let  isPaused=false
    video.addEventListener('seeked',reset)
    function reset(){
        ctx.clearRect(0,0,canvas.width,canvas.height) 
        let {currentTime}=video
        danmuArr.forEach((item)=>{
            if(item.time>=currentTime){
                item.inited=false
                item.isRender=false
            }else{
                item.isRender=true
            }
        })
    }
    function add(item){
        danmuArr.push(new danmu(item))
    }
    function render(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        renderDanmu()
        if(!isPaused){
            window.requestAnimationFrame(render)
        }
    }
    function renderDanmu(){
        let {currentTime}=video
        danmuArr.forEach((item)=>{
            if(!item.isRender&&item.time<=currentTime){
                if(!item.inited){
                    item.init()
                    item.inited=true
                }
                item.render()
                item.x-=1
                if(item.x<(-item.width)){
                    item.isRender=true
                }
            }
        })
    }
    
    function getVideoState(bool){
        isPaused=bool
    }
    return {getVideoState,add,render}
}