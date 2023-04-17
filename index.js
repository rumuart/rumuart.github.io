
let gg = false;



$(window).on("load", function () {

    let lastFrameTimeStamp = new Date().getTime();
    let deltaTime = null;

      
       let work = document.querySelector(" .works");
       
       let nav = document.querySelector(" #navBar");
       const canvas = document.getElementById('canvas1');
       let header = document.querySelector(".header");
       let VW = document.querySelector(" #VW_B");
       let timerVW = 0;
       let timerBar = 0;
       let list = document.querySelector(" #listIcon");
       let sClose  = document.querySelector( " #sMclose");
       let core2 = document.querySelector(" #secondMenu");
       let dummy = document.querySelector(" #wdummy");
       let radius =  1;

       
       
       
       

       work.onmouseover = () =>{
        let navBr = document.querySelector(" #navBar");
        timerBar = setTimeout(() => {navBr.style.height = "48px";
        navBr.style.marginTop = "71px";
        canvas.style.opacity = '.3';
            
        }, 100);
        VW.style.opacity = '0';
        gg = true;
        clearTimeout(timerVW);

    }


    work.onmouseleave = () =>{
       
        let navBr = document.querySelector(" #navBar");
        navBr.style.height = "0px";
        navBr.style.marginTop = "90px";
        canvas.style.opacity = '1';
        gg = false;

        timerVW = setTimeout(() => {VW.style.opacity = '1'
        
            
        }, 1000);
        clearTimeout(timerBar);
    }
    nav.onmouseover = () =>{
        let navBr = document.querySelector(" #navBar");
        navBr.style.height = "48px";
        navBr.style.marginTop = "71px";
        canvas.style.opacity = '.3';
        VW.style.opacity = '0';
        gg = true;
        clearTimeout(timerVW);
        
        
    }


   nav.onmouseleave = () =>{
       
        let navBr = document.querySelector(" #navBar");
        navBr.style.height = "0px";
        navBr.style.marginTop = "90px";
        canvas.style.opacity = '1';
        gg = false;

        timerVW = setTimeout(() => {VW.style.opacity = '1'
            
        }, 1000);

        clearTimeout(timerBar);
    }


        
       
        
        
        canvas.width = 580;
        canvas.height = header.clientHeight;
        let patricleArray = [];
        let adjustX = 48;
        let adjustY = 33;
        

        const mouse = {
            x: null,
            y: null,
            
        }
        
       

        window.addEventListener('mousemove',function(e){
            
            mouse.x = e.x ;
            mouse.y = e.y ;

        });

        let ctx = canvas.getContext('2d');
        var img = document.getElementById("VW");
        
        ctx.drawImage(img, 0, 0, 300, 60 );
        
        const textCd = ctx.getImageData(0,0,canvas.width  ,canvas.height  );

        class Patricle{
            constructor(x,y){
                this.x = x;
                this.y = y;
                this.size = 1;
                this.baseX = this.x;
                this.baseY = this.y;
                this.density = (Math.random() * 30) + 1;
                this.color = 'rgb(255,255,255)';
                this.tm = 1;
                this.set = true;

            }
            draw(){
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.closePath();
                ctx.fill();
            }
            update(deltaTime){

                
                let dummyRect = dummy.getBoundingClientRect();
                let r2 = dummyRect.top - mouse.y;
                if(r2 < 0){
                    r2 = r2 * -1;
                    
                }
                if(r2 < 25){
                   radius = 50 - r2*2.5;
                }
                
                
                let rect = canvas.getBoundingClientRect();
                let dx = mouse.x - rect.left - this.x;
                let dy = mouse.y - rect.top - this.y;
                let distance = Math.sqrt(dx * dx + dy * dy);
                let forceDirectitonX = dx/ distance;
                let forceDirectitonY = dy/ distance;
                let maxDistance = radius;
                let force = (maxDistance - distance)/maxDistance;
                let directionX  = forceDirectitonX * force * this.density;
                let directionY  = forceDirectitonY * force * this.density;
                if(distance < radius && r2 < 25){
                    this.x -= directionX * 10 * deltaTime;
                    this.y -= directionY  * 10 * deltaTime;
                    
                    if(distance < radius * 2){
                    this.color = `rgb(${ 0 }, ${255 }
                        , ${150} )`;
                    }
                    this.tm = 0;
                    
                    
                }else{
                    
                    if(this.x != this.baseX){
                        let dx = this.x - this.baseX;
                        this.x -= dx/50 * deltaTime;
                        
                    }
                     if(this.y != this.baseY){
                        let dy = this.y - this.baseY;
                        this.y -= dy/50 * deltaTime;
                    }
                    
                    
                    if(this.tm < 1){
                     
                        this.tm += .01 * deltaTime;

                        this.color = `rgb(${ 255 * this.tm  }, ${255 }
                        , ${150 + 255 * this.tm} )`;
                    }
                    
                    
                    
                    }
                    
            }

            
        }



        function init(){
            patricleArray = [];
            for(let y = 0, y2 = textCd.height; y < y2; y++){
                for(let x = 0, x2 = textCd.width; x < x2; x++){
                    if(textCd.data[(y * 4 * textCd.width) + (x * 4) + 3]>128){
                        let positionX = x + adjustX;
                        let positionY = y + adjustY;
                        
                        patricleArray.push(new Patricle(positionX * 1.5,positionY * 1.5));
                    }
                }
                        
            }
        }
        init();
        
        function animate(){

            deltaTime = (new Date().getTime() - lastFrameTimeStamp)/10;

            ctx.clearRect(0,0,canvas.width,canvas.height);
            for(let i = 0; i < patricleArray.length; i++){
                patricleArray[i].draw();
                patricleArray[i].update(deltaTime);
               
                
            }
           
            requestAnimationFrame(animate);
            lastFrameTimeStamp = new Date().getTime();
        }
         animate();
         
         function connect(){
            for(let a = 0; a < patricleArray.length; a++){
                for(let b = a; b < patricleArray.length; b++){
                    let dx = patricleArray[a].x - patricleArray[b].x;
                    let dy = patricleArray[a].y - patricleArray[b].y;
                    let distance2 = Math.sqrt(dx * dx + dy * dy);

                    if(distance2 < 2){
                        ctx.strokeStyle = patricleArray[b].color;
                        ctx.lineWidth = 2;
                        ctx.beginPath();
                        ctx.moveTo(patricleArray[a].x, patricleArray[a].y);
                        ctx.lineTo(patricleArray[b].x, patricleArray[b].y);
                        ctx.stroke();
                    }

                }
            }
         }
         
         
        
        list.onclick = () => {
            core2.style.display = "block";

        }
        sClose.onclick = () => {
            core2.style.display = "none";
            
        }
        $(window).resize(function() {
            if ($(window).width() > 980) {
                core2.style.display = "none";
            }
           else {
              
           }
          });

        });
      
        
        
