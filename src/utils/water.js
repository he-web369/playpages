export default function (canvas) {
    // 默认设置
    const ctx=canvas.getContext('2d')
    let radius=20,
        lineWidth=16,
        globA=1

    function disturb(x,y){
        ctx.clearRect(0,0,canvas.width,canvas.height)
        ctx.strokeStyle="orange"
        for (let index = 0; index < 5; index++) {
            drawC(x,y,radius,lineWidth,globA)
            radius+=5
            lineWidth-=4
            globA-=0.2
            if(globA<=0){
                radius=20,
                lineWidth=10,
                globA=1
             }
        }
    }
     function drawC(x,y,radius,lineWidth,gA){
         ctx.beginPath();
         ctx.globalAlpha=gA
         ctx.lineWidth=lineWidth
         ctx.arc(x,y,radius,0,Math.PI*2)
         ctx.stroke()
         ctx.closePath()
     }
    function clear(){
        ctx.clearRect(0,0,canvas.width,canvas.height)
    }
    return {disturb,clear}
}