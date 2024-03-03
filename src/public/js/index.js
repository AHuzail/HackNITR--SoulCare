
console.log("hello world");
var tl=gsap.timeline();
gsap.from(".title h1",{
    y:-500,
    duration:1,
    scale:0.9
})
gsap.from(".lefthero",{
    x:-200,
    scale:0.1,
    duration:0.4
})
gsap.from(".righthero .righth2 h2",{
    x:800,
    scale:0.1,
    duration:1
})
gsap.from(".rightherop p",{
    duration:0.5,
    scale:0.1
})
gsap.from(" .maincontent h1, .submaincontent",{
        scale:0,
        opacity:0,
        duration:1,
        // stagger:1,
        scrollTrigger:{
            trigger:".box1",
            scroller:"body"}})
            gsap.from(".scroll",{
                y:50,
                yoyo:true,
                repeat:-1
            })

const logbtn=document.querySelector("#loginbtn")
const signupbtn=document.querySelector("#signupbtn")
logbtn.addEventListener('click',()=>{
    console.log(signupbtn);
    window.open("http://localhost:8000/login")
})

signupbtn.addEventListener('click',()=>{
    window.open("http://localhost:8000/register")
    
})