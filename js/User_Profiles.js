window.onload=function(){
    urls=['User_Profiles_Scheduling.html','User_Profiles_Saying.html','User_Profiles_Picture.html','User_Profiles_Production.html'];
    var childLi=document.getElementById('contCenterNav').getElementsByTagName('li');
    AjaxPage();
    for(var i=0;i<childLi.length;i++){
        // childLi[i].onclick=function(){}
        childLi[i].i=i;
        childLi[i].addEventListener('click',AjaxPage)
    }
    var dateTime=new Date();
    var hour=dateTime.getHours();
    var min=dateTime.getMinutes();
    document.getElementsByClassName('cont_right_time_h')[0].innerHTML=hour;
    document.getElementsByClassName('cont_right_time_m')[0].innerHTML=min;
    var timeDates=setInterval(function(){
        var dateTimes=new Date();
        var hours=dateTimes.getHours();
        var mins=dateTimes.getMinutes();
        document.getElementsByClassName('cont_right_time_h')[0].innerHTML=hours;
        document.getElementsByClassName('cont_right_time_m')[0].innerHTML=mins;
    },10000)

    
}
//加载页面
function AjaxPage(){
    if(this===window){
       var index=0;
    }else{
       var index=this.i
    }
    
    var kidss=document.getElementById('contCenterNav').getElementsByTagName('li');
    for(var j=0;j<kidss.length;j++){
        kidss[j].className='';
    }
    if(this===window){
        kidss[index].className='cont_center_nav_checked';
    }else{
        this.className='cont_center_nav_checked';
    }
    
    var ajaxObj;
    if(window.XMLHttpRequest){
          ajaxObj=new XMLHttpRequest();
    }else{
        ajaxObj=new ActiveXObject('Microsoft.XMLHTTP')
    }
    ajaxObj.onreadystatechange=function(){
        document.getElementById('cont_center_cont_main').innerHTML=ajaxObj.responseText;
        if(ajaxObj.readyState==4){
            if(index==0){
                calculatorShow()
            }else if(index==1){
                sayingShow()
            }else if(index==2){
                pictureShow()
            }else if(index==3){
                productionShow()
            }
        }    
    }
    ajaxObj.open('GET',urls[index],true)
    ajaxObj.send()
}
 //日历页面
function calculatorShow(){
         var time=new Date();
         var year=time.getFullYear()//2017
         var data=time.getDate()//6
         var weekday=time.getDay()//3
         var month=time.getMonth()+1//9
         var weekDayZ;
         switch(weekday){
             case 0:
                 weekDayZ="日";
                 break;
             case 1:
                 weekDayZ="一";
                 break;
             case 2:
                 weekDayZ="二";
                 break;
             case 3:
                 weekDayZ="三";
                 break;
             case 4:
                 weekDayZ="四";
                 break;
             case 5:
                 weekDayZ="五";
                 break;
             case 6:
                 weekDayZ="六";
                 break;
         }
         var dateNow=year+'-'+month+'-'+data+"    星期"+weekDayZ;
         document.getElementById('timeNames').innerHTML=dateNow;
         document.getElementById('timeYear').value=year+'-'+month;
         caShow(year,month,data)
         //返回当月
         document.getElementById('returnNow').onclick=function(){
             caShow(year,month,data)
         }
}
//说说页面
function sayingShow(){
    var appendParent=document.getElementById('cont_center-cont2MainCont')
    var ajaxJsonSay;
    if(window.XMLHttpRequest){
        ajaxJsonSay=new XMLHttpRequest();
    }else{
        ajaxJsonSay=new ActiveXObject("Microsoft.XMLHTTP")
    }
    ajaxJsonSay.onreadystatechange=function(){
        if(ajaxJsonSay.readyState==4){
            var sayingOb=JSON.parse(ajaxJsonSay.responseText);
            for(var num in sayingOb.saying){
                //
                var parentSaying=document.getElementById('cont_center-cont2MainCont');
                var cloneDiv=parentSaying.getElementsByClassName('cont_center-cont2-main-part')[0].cloneNode(true)
                cloneDiv.style.display='block';
                var imgAddress=cloneDiv.getElementsByClassName('cont_center-cont2-main-part-img')[0]
                var imgNew=document.createElement('img');
                imgNew.src='../../images/User_Profiles/'+sayingOb.saying[num].img;
                imgAddress.appendChild(imgNew);
                cloneDiv.getElementsByTagName('span')[0].innerHTML=sayingOb.saying[num].time;
                var str;
                if(sayingOb.saying[num].content.length>30){
                    str=sayingOb.saying[num].content.substring(0,30);
                    str=str+"......";
                    cloneDiv.getElementsByTagName('p')[0].innerHTML=str;
                    cloneDiv.getElementsByTagName('p')[0].nextSibling.nextSibling.innerHTML="<i class='fa fa-thumbs-o-up' aria-hidden='true'></i> <i class='fa fa-star-o' aria-hidden='true'></i> <button type='button' onclick='contentShow.call(this)'>全文</button>"
                
                }else{
                    cloneDiv.getElementsByTagName('p')[0].innerHTML=sayingOb.saying[num].content;
                    cloneDiv.getElementsByTagName('p')[0].nextSibling.nextSibling.innerHTML="<i class='fa fa-thumbs-o-up' aria-hidden='true'></i> <i class='fa fa-star-o' aria-hidden='true'></i>"
                
                }
                cloneDiv.getElementsByTagName('p')[0].dataset.content=sayingOb.saying[num].content;

                parentSaying.appendChild(cloneDiv)

                //
            }
            var pageNum=Math.ceil(sayingOb.saying.length/4);
            document.getElementById('cont_center-cont2-pageNum').innerHTML='共'+pageNum+'页';
            for(var g=0;g<pageNum;g++){
                var newPageli=document.createElement('li');
                (function(g){
                    newPageli.onclick=function(){
                        var liNums=document.getElementById('cont_center-cont2-pagePage').getElementsByTagName('li');
                        for(var t=0;t<liNums.length;t++){
                            if(t!=g){
                                liNums[t].className='';
                                liNums[t].style.display='none';
                            }
                        }
                        this.className='cont_center-cont2-page_checked';
                        if(g>0 && g<(pageNum-1)){
                          
                                this.previousSibling.style.display='block';
                                this.style.display='block';
                                this.nextSibling.style.display='block';
                            
                            var liPreC=document.getElementById('cont_center-cont2-pagePage').parentNode.previousSibling.previousSibling;
                            liPreC.disabled=false;
                            liPreC.previousSibling.previousSibling.disabled=false;
                            var liNextC=document.getElementById('cont_center-cont2-pagePage').parentNode.nextSibling.nextSibling;
                            liNextC.disabled=false;
                            liNextC.nextSibling.nextSibling.disabled=false;
                            
                        }else if(g==(pageNum-1)){
                            var liPreC=document.getElementById('cont_center-cont2-pagePage').parentNode.previousSibling.previousSibling;
                            liPreC.disabled=false;
                            liPreC.previousSibling.previousSibling.disabled=false;
                            var liNextC=document.getElementById('cont_center-cont2-pagePage').parentNode.nextSibling.nextSibling;
                            liNextC.disabled=true;
                            liNextC.nextSibling.nextSibling.disabled=true;
                            this.previousSibling.previousSibling.style.display='block';
                            this.previousSibling.style.display='block';
                            this.style.display='block';
                        }else if(g==0){
                            var liPreC=document.getElementById('cont_center-cont2-pagePage').parentNode.previousSibling.previousSibling;
                            liPreC.disabled=true;
                            liPreC.previousSibling.previousSibling.disabled=true;
                            var liNextC=document.getElementById('cont_center-cont2-pagePage').parentNode.nextSibling.nextSibling;
                            liNextC.disabled=false;
                            liNextC.nextSibling.nextSibling.disabled=false;
                            this.nextSibling.nextSibling.style.display='block';
                            this.style.display='block';
                            this.nextSibling.style.display='block';
                        }
                        document.getElementById('cont_center-cont2MainCont').style.top=-(60*g)+"vh";
    
                    }
                })(g);
                newPageli.innerHTML=g+1;
                if(g<3){
                    newPageli.style.display='block';
                }else{
                    newPageli.style.display='none';
                }
                document.getElementById('cont_center-cont2-pagePage').appendChild(newPageli);
                if(g==0){
                    newPageli.className='cont_center-cont2-page_checked';
                    var liPre=document.getElementById('cont_center-cont2-pagePage').parentNode.previousSibling.previousSibling;
                    liPre.disabled=true;
                    liPre.previousSibling.previousSibling.disabled=true;
                    var liNext=document.getElementById('cont_center-cont2-pagePage').parentNode.nextSibling.nextSibling;
                    liNext.disabled=false;
                    liNext.nextSibling.nextSibling.disabled=false;

                }
            }

           
            //首页
            document.getElementById('cont_center-cont2-pageFirstPage').onclick=function(){
                var topLength=document.getElementById('cont_center-cont2MainCont').style.top;
                var lengths=topLength.substring(1,topLength.length-2)
                if(lengths/60!=0){
                    document.getElementById('cont_center-cont2MainCont').style.top="0vh";
                    var lis=document.getElementById('cont_center-cont2-pagePage').getElementsByTagName('li');
                    for(var k=0;k<lis.length;k++){
                        if(k!=0){
                            lis[k].className='';
                        }else{
                            lis[0].className='cont_center-cont2-page_checked';
                            lis[0].nextSibling.nextSibling.style.display='block';
                            lis[0].nextSibling.style.display='block';
                            lis[0].style.display='block';
                        }
                    }
                    var liNext=document.getElementById('cont_center-cont2-pagePage').parentNode.nextSibling.nextSibling;
                    liNext.disabled=false;
                    liNext.nextSibling.nextSibling.disabled=false;
                    var liPreCd=document.getElementById('cont_center-cont2-pagePage').parentNode.previousSibling.previousSibling;
                    liPreCd.disabled=true;
                    this.disabled=true;
                   
                }
            }
            //上一页
            document.getElementById('cont_center-cont2-pagPrevPage').onclick=function(){
                var topLength=document.getElementById('cont_center-cont2MainCont').style.top;
                var lengths=topLength.substring(1,topLength.length-2)
                if(lengths/60>1){
                    document.getElementById('cont_center-cont2MainCont').style.top=-(lengths-60)+"vh";
                    var lis=document.getElementById('cont_center-cont2-pagePage').getElementsByTagName('li');
                    for(var k=0;k<lis.length;k++){
                        lis[k].style.display='none';
                        if(k!=(lengths/60-1)){
                            lis[k].className=''; 
                        }else{
                            lis[k].className='cont_center-cont2-page_checked';
                            
                        }
                    } 
                    lis[lengths/60-1].nextSibling.style.display='block';
                    lis[lengths/60-1].previousSibling.style.display='block';
                    lis[lengths/60-1].style.display='block'; 
                  
                }else if(lengths/60==1){
                    document.getElementById('cont_center-cont2MainCont').style.top="0vh";
                    var lis=document.getElementById('cont_center-cont2-pagePage').getElementsByTagName('li');
                    for(var k=0;k<lis.length;k++){
                        lis[k].style.display='none';
                        if(k!=0){
                            lis[k].className=''; 
                        }else{
                            lis[k].className='cont_center-cont2-page_checked';
                            
                        }
                    } 
                    lis[lengths/60-1].nextSibling.nextSibling.style.display='block';
                    lis[lengths/60-1].nextSibling.style.display='block';
                    lis[lengths/60-1].style.display='block';
                }
                
                var liNext=document.getElementById('cont_center-cont2-pagePage').parentNode.nextSibling.nextSibling;
                liNext.disabled=false;
                liNext.nextSibling.nextSibling.disabled=false;
                
                
            }
             //下一页
            document.getElementById('cont_center-cont2-pagNextPage').onclick=function(){
                var topLength=document.getElementById('cont_center-cont2MainCont').style.top;
                var lengths=topLength.substring(1,topLength.length-2)
                lengths=Number(lengths);
                if(lengths/60<(pageNum-2)){
                    document.getElementById('cont_center-cont2MainCont').style.top=-(lengths+60)+"vh";
                    var lis=document.getElementById('cont_center-cont2-pagePage').getElementsByTagName('li');
                    for(var k=0;k<lis.length;k++){
                        lis[k].style.display='none';
                        if(k!=(lengths/60+1)){
                            lis[k].className='';
                        }else{
                            lis[k].className='cont_center-cont2-page_checked';
                           
                        }
                       
                    }
                    lis[lengths/60+1].nextSibling.style.display='block';
                    lis[lengths/60+1].previousSibling.style.display='block';
                    lis[lengths/60+1].style.display='block';
                }else if(lengths/60==(pageNum-2)){
                    document.getElementById('cont_center-cont2MainCont').style.top=-(lengths+60)+"vh";
                    var lis=document.getElementById('cont_center-cont2-pagePage').getElementsByTagName('li');
                    for(var k=0;k<lis.length;k++){
                        lis[k].style.display='none';
                        if(k!=(lengths/60+1)){
                            lis[k].className='';
                        }else{
                            lis[k].className='cont_center-cont2-page_checked';
                            
                        }
                    }
                    lis[lengths/60+1].previousSibling.previousSibling.style.display='block';
                    lis[lengths/60+1].previousSibling.style.display='block';
                    lis[lengths/60+1].style.display='block';
                    this.disabled=true;
                    this.nextSibling.nextSibling.disabled=true;

                }
                var liPreC=document.getElementById('cont_center-cont2-pagePage').parentNode.previousSibling.previousSibling;
                liPreC.disabled=false;
                liPreC.previousSibling.previousSibling.disabled=false;
                
            }
             //尾页
            document.getElementById('cont_center-cont2-pagLastPage').onclick=function(){
                var topLengthL=document.getElementById('cont_center-cont2MainCont').style.top;
                var lengthsL=topLengthL.substring(1,topLengthL.length-2)
                if(lengthsL/60!=(pageNum-1)){
                    document.getElementById('cont_center-cont2MainCont').style.top='-'+(pageNum-1)*60+"vh";
                    var lis=document.getElementById('cont_center-cont2-pagePage').getElementsByTagName('li');
                    for(var k=0;k<lis.length;k++){
                        if(k!=(pageNum-1)){
                            lis[k].className='';
                            lis[k].style.display='none';
                        }else{
                            lis[k].className='cont_center-cont2-page_checked';
                            lis[k].previousSibling.previousSibling.style.display='block';
                            lis[k].previousSibling.style.display='block';
                            lis[k].style.display='block';
                        }
                    }
                }
                var liPreC=document.getElementById('cont_center-cont2-pagePage').parentNode.previousSibling.previousSibling;
                liPreC.disabled=false;
                liPreC.previousSibling.previousSibling.disabled=false;
                var liPreCa=document.getElementById('cont_center-cont2-pagePage').parentNode.nextSibling.nextSibling;
                liPreCa.disabled=true;
                this.disabled=true;                
            }
        }
    }
    ajaxJsonSay.open('GET',"../../json/User_Profiles/saying.json",true);
    ajaxJsonSay.send()
}
//说说全文显示
function contentShow(){
    var sayCont=this.parentNode.previousSibling.previousSibling;
    document.getElementsByClassName('cont_center-cont2-saying-shadow')[0].style.display='block';
    document.getElementsByClassName('cont_center-cont2-saying-hidden')[0].nextSibling.nextSibling.style.display='block';
    document.getElementsByClassName('cont_center-cont2-saying-hidden')[0].style.display='block';
    document.getElementById('cont_center-cont2-sayingHiddenCont').innerHTML='<div>'+sayCont.dataset.content+'</div>';
}
//关闭说说全文显示
function closeSayingShow(){
    this.style.display='none';
    this.previousSibling.previousSibling.style.display='none';
    this.previousSibling.previousSibling.previousSibling.previousSibling.style.display='none';
}
//图片Picture
function pictureShow(){
    var ajaxObj3;
    if(window.XMLHttpRequest){
         ajaxObj3=new XMLHttpRequest();
    }else{
        ajaxObj3=new ActiveXObject('Microsoft.XMLHTTP');
    }
    
    ajaxObj3.onreadystatechange=function(){
        if(ajaxObj3.readyState==4){

            var objectPic=JSON.parse(ajaxObj3.responseText);
            for(var r=0;r<objectPic.saying.length;r++){
                var newPicDiv=document.createElement('div');
                var newPicDivMain=document.createElement('div');
                newPicDiv.className='child-Node'
                newPicDivMain.innerHTML="<img src='../../images/User_Profiles/"+objectPic.saying[r].img+"' alt='"+objectPic.saying[r].content+"'/>";
                var newPicDivIntro=document.createElement('div');
                newPicDivIntro.innerHTML='<span>'+objectPic.saying[r].time+'</span>';
                newPicDiv.appendChild(newPicDivMain);
                newPicDiv.appendChild(newPicDivIntro);
                if(r>7){
                    newPicDiv.display='none';
                }
                newPicDiv.dataset.img=objectPic.saying[r].img;
                newPicDiv.dataset.cont=objectPic.saying[r].content;
                newPicDiv.onclick=function showLarge(){
                    document.getElementsByClassName('cont_center-cont3-picture-shadow')[0].style.display='block';
                    document.getElementsByClassName('cont_center-cont3-picture-hidden')[0].style.display='block';
                    document.getElementsByClassName('cont_center-cont3-picture-hidden')[0].nextSibling.nextSibling.style.display='block';
                    document.getElementById("cont_center-cont3-pictureHiddenImg").innerHTML="<img src='../../images/User_Profiles/"+this.dataset.img+"' alt='"+this.dataset.cont+"'/>";
                    document.getElementById("cont_center-cont3-pictureHiddenText").innerHTML="<div>"+this.dataset.cont+"</div>";
        
                };
                document.getElementById('cont_center-cont3-pictureMain').appendChild(newPicDiv)   
            }
            var large=Math.ceil(objectPic.saying.length/8);
            document.getElementsByTagName('input')[1].setAttribute("max",large)
            document.getElementsByTagName('input')[1].setAttribute("min",1)
            document.getElementsByTagName('input')[1].oninput=function(){
               var numValue=this.value;
               var divsChild=document.getElementById('cont_center-cont3-pictureMain').getElementsByClassName('child-Node');
               for(var d=0;d<divsChild.length;d++){
                   divsChild[d].style.display='none';
                   if(d>(numValue-1)*8){
                       divsChild[d].style.display='block';
                   }
               }
            }
            

        }
    }
    ajaxObj3.open("GET",'../../json/User_Profiles/saying.json',true);
    ajaxObj3.send();
    console.log(ajaxObj3);
}
//图片关闭事件
function closeShow(){
    document.getElementsByClassName('cont_center-cont3-picture-shadow')[0].style.display='none';
    document.getElementsByClassName('cont_center-cont3-picture-hidden')[0].style.display='none';
    document.getElementsByClassName('cont_center-cont3-picture-hidden')[0].nextSibling.nextSibling.style.display='none';
    
}
//日历展示
function caShow(year,month,data){
    var parentNode=document.getElementById('contCalendar');
    var bydelete=parentNode.getElementsByTagName('div')
    var kidNum=bydelete.length
    for(var k=0;k<kidNum;k++){
        parentNode.removeChild(bydelete[0])
        
    }
    document.getElementById('timeYear').value=year+"-"+month;
    var days=new Date(year,month,0)
    var dayNum=days.getDate()
    var dayWeek=new Date(year,month-1,1)
    for(var k=0;k<dayWeek.getDay();k++){
        var newDivEmpty=document.createElement('div');
        document.getElementById('contCalendar').appendChild(newDivEmpty)
    }
    for(var i=1;i<=dayNum;i++){
        var newDiv=document.createElement('div');
        var newspan=document.createElement('span');
        newDiv.appendChild(newspan)
        newspan.innerHTML=i;
        if(i==data){
            newspan.style.backgroundColor='#80A8CC';
        } 
        document.getElementById('contCalendar').appendChild(newDiv)
    }


}
//日历向前翻页
function contChangePre(){
    var arrs=document.getElementById('timeYear').value.split('-');
    var yearP=Number(arrs[0])
    var monthP=Number(arrs[1]);
    if(monthP==1){
        yearP-=1;
        monthP=12;
        caShow(yearP,monthP,0)
    }else{
        caShow(yearP,monthP-1,0)
    }

   
}
// 日历向后翻译
function contChangeNex(){
    var arrs=document.getElementById('timeYear').value.split('-');
    var yearN=Number(arrs[0])
    var monthN=Number(arrs[1]);
    if(monthN==12){
        yearN+=1;
        monthN=1;
        caShow(yearN,monthN,0)
    }else{
        caShow(yearN,monthN+1,0)
    }
   
}
//作品页面
function productionShow(){

    var playButs=document.querySelectorAll('td.productionMain-content-Music');
    var newAudio=new Audio();
    for(var i=0;i<playButs.length;i++){
        playButs[i].querySelector('i.proPlayM').addEventListener("click",function(event){
            prodMusicPlay(event,newAudio)
        });               
    }
    document.querySelector('#cont_center-cont4-production-main-nav-clickVideo').addEventListener('click',productionNavVideo);
    //小屏播放
    
    var videoAlls=document.querySelectorAll('.cont_center-cont4-production-main-content-Video-partVideo i');
    for(var num=0;num<videoAlls.length;num++){
        videoAlls[num].addEventListener('click',function(){
            this.style.display='none';
            var newVideo=this.previousSibling.previousSibling;
            newVideo.play();
            var that=this;
            newVideo.ontimeupdate=function(){
                if(this.ended){
                     that.style.display='block';
                }
                this.muted=true;
            }
            
        })
    }
}
//剧集菜单
function productionNavVideo(){
   
   var ulsNav=document.querySelector('ul.cont_center-cont4-production-main-nav-main ul');
    if(ulsNav.style.display=="none"){
        ulsNav.style.display='block';
        this.getElementsByTagName("i")[1].className='fa fa-sort-desc addNav production-nav-active';
    }else{
        ulsNav.style.display="none";
        this.getElementsByTagName("i")[1].className='fa fa-sort-desc addNav';
    }
}
//音乐播放
function prodMusicPlay(event,newAudio){
        document.getElementById('cont_center-cont4-production-main-musicShow').style.display='block';
        var urlMusic=event.target.parentNode.dataset.url;
        var nameMusic=event.target.parentNode.dataset.name;
        newAudio.src=urlMusic;  
        newAudio.setAttribute("controls", "controls");
        newAudio.play();
        newAudio.ontimeupdate=function(){
            var time=(this.duration).toFixed(0);
            document.querySelector('p.musicShowTitle').innerHTML=nameMusic;
            document.querySelector('#musicShowRange-time>span').style.width=(this.currentTime/this.duration*100).toFixed(2)+"%";
            document.querySelector('#musicShowRange-alltime').innerHTML=(Math.floor(time/60)<10?"0"+Math.floor(time/60):Math.floor(time/60))+":"+(time%60<10?"0"+time%60:time%60);
            document.querySelector('#musicShowRange-currentime').innerHTML=((Math.floor((this.currentTime)/60)<10?"0"+Math.floor((this.currentTime)/60):Math.floor((this.currentTime)/60)))+":"+((Math.round(this.currentTime))%60<10?"0"+(Math.round(this.currentTime))%60:(Math.round(this.currentTime))%60);
            newAudio.paused?(pausedAudT()):(pausedAudF());
       
        } 
        //播放、暂停
        function pausedAudT(){
            document.querySelectorAll('.musicShowRangeButs>i')[0].style.color='white';
            document.querySelectorAll('.musicShowRangeButs>i')[1].style.color='#9AF8FE';
        }
        function pausedAudF(){
            document.querySelectorAll('.musicShowRangeButs>i')[0].style.color='#9AF8FE';
            document.querySelectorAll('.musicShowRangeButs>i')[1].style.color='white';
        }
        event.target.parentNode.querySelector('i.proPauseM').addEventListener('click',function(event){prodMusicPause(event,newAudio)});
        event.target.parentNode.querySelector('i.prostopM').addEventListener('click',function(event){prodMusicStop(event,newAudio)})
        document.querySelectorAll('.musicShowRangeButs>i')[0].addEventListener("click",function(){
            newAudio.play();
            newAudio.paused?(this.style.color="white"):(this.style.color="#9AF8FE");
            
        })
        document.querySelectorAll('.musicShowRangeButs>i')[1].addEventListener("click",function(){
            newAudio.pause();
            newAudio.paused?(this.style.color="#9AF8FE"):(this.style.color="white");
          
        })
        // 停止
        document.querySelectorAll('.musicShowRangeButs>i')[2].addEventListener("click",function(){
            newAudio.pause();
            document.getElementById('cont_center-cont4-production-main-musicShow').style.display='none';
        })
        // 循环
        document.querySelectorAll('.musicShowRangeButs>i')[3].addEventListener("click",function(event){
            newAudio.loop?(newAudioLoopT(event)):(newAudioLoopF(event));
            function newAudioLoopT(e){
                newAudio.loop=false;
                e.target.style.color='white';

            }
            function newAudioLoopF(e){
                newAudio.loop=true;
                e.target.style.color='#9AF8FE';
            }
            
        })
        // 选择播放时间
        document.querySelector('#musicShowRange-time').addEventListener('click',function(event){
            var changetime=event.offsetX/this.offsetWidth*newAudio.duration;
            newAudio.currentTime=changetime;
        })
        // 音量
        document.querySelector('.musicShowRangeButs>input').addEventListener("input",function(){
            newAudio.volume=this.value;
            if(this.value==0){
                document.querySelectorAll('.musicShowRangeButs>i')[4].style.color='gray'
            }else{
                document.querySelectorAll('.musicShowRangeButs>i')[4].style.color='white';
            }
        })
        document.querySelectorAll('.musicShowRangeButs>i')[4].addEventListener("click",function(event){
            newAudio.volume=0;
            document.querySelector('.musicShowRangeButs>input').value='0';
            this.style.color='gray';
        })



}
//音乐暂停
function prodMusicPause(event,newAudio){
    var namePlaying=document.querySelector('p.musicShowTitle').innerHTML
   if(event.target.parentNode.dataset.name==namePlaying){
      newAudio.pause();
   }
  
}
//音乐停止
function prodMusicStop(event,newAudio){
    var namePlaying=document.querySelector('p.musicShowTitle').innerHTML
    if(event.target.parentNode.dataset.name==namePlaying){
       newAudio.pause();
       document.getElementById('cont_center-cont4-production-main-musicShow').style.display='none';
    }
    

}
//视频播放
function prodVideoPlay(){
    console.log(this)
    var videoPlay=document.querySelector('.cont_center-cont4-pro-shadow-Content-video>video')
    document.getElementsByClassName('cont_center-cont4-pro-shadow')[0].style.display='block';   
    document.getElementsByClassName('cont_center-cont4-pro-shadow-img')[0].style.backgroundImage="url('"+this.dataset.img+"')";
    document.getElementsByClassName('cont_center-cont4-pro-shadow-img')[0].style.display='block';
    document.querySelector('p.cont_center-cont4-pro-shadow-Content-title').innerHTML=this.dataset.name; 
    videoPlay.src=this.dataset.video;
    var contInnerHtml=this.parentNode.parentNode.querySelector('div.cont_center-cont4-production-main-content-Video-partIntro>p')
    document.querySelector('div.cont_center-cont4-pro-shadow-Content-Intro>p').innerHTML=contInnerHtml.innerHTML;
    videoPlay.autoplay='autoplay';
    
    videoPlay.ontimeupdate=function(){
        var videoAllTime=videoPlay.duration;     
        document.querySelector('div.cont_center-cont4-pro-shadow-Content-buts-range>span').style.width=(videoPlay.currentTime/videoAllTime*100)+"%";
        var minsAll=(Math.floor(videoAllTime/60)<10)?("0"+Math.floor(videoAllTime/60)):(Math.floor(videoAllTime/60));
        var secsAll=(Math.round(videoAllTime%60)<10)?("0"+Math.round(videoAllTime%60)):(Math.round(videoAllTime%60));
        var mins=(Math.floor(videoPlay.currentTime/60)<10)?("0"+Math.floor(videoPlay.currentTime/60)):(Math.floor(videoPlay.currentTime/60));
        var secs=(Math.round(videoPlay.currentTime%60)<10)?("0"+Math.round(videoPlay.currentTime%60)):(Math.round(videoPlay.currentTime%60));
        document.querySelector('div.cont_center-cont4-pro-shadow-Content-buts>span').innerHTML=mins+":"+secs+" / "+minsAll+":"+secsAll;
        // 声音
        var videoVoice=document.querySelector('div.cont_center-cont4-pro-shadow-Content-buts>input');
        videoVoice.addEventListener('change',function(){
            videoPlay.volume=this.value;
            if(this.value==0){
                document.querySelectorAll('div.cont_center-cont4-pro-shadow-Content-buts>i')[1].style.color='gray';
            }else{
                document.querySelectorAll('div.cont_center-cont4-pro-shadow-Content-buts>i')[1].style.color='white';
            }
        })
        if(videoPlay.ended){
            document.querySelector('.cont_center-cont4-pro-shadow-Content-buts-refresh').style.display='block';
            document.querySelector('.cont_center-cont4-pro-shadow-Content-buts-refresh>i').addEventListener('click',function(){
                videoPlay.play();
                document.querySelector('.cont_center-cont4-pro-shadow-Content-buts-refresh').style.display='none';
            })
        }
       
    }
    //播放暂停
    var diIS=document.querySelectorAll('div.cont_center-cont4-pro-shadow-Content-buts>i');
    diIS[0].onclick=function(){
        var thing=this;
        (videoPlay.paused)?(videoplaying(thing,videoPlay)):(videopausing(thing,videoPlay));
        
    }
    function videoplaying(thing,videoPlay){
        videoPlay.play();
        thing.className='fa fa-play';
    }
    function videopausing(thing,videoPlay){
        videoPlay.pause();
        thing.className='fa fa-pause';
    }
    //静音
    diIS[1].onclick=function(){
        this.style.color='gray';
        videoPlay.volume=0;

    }
     //进度条
     var rangeClick=document.querySelector('div.cont_center-cont4-pro-shadow-Content-buts-range');
     document.querySelector('div.cont_center-cont4-pro-shadow-Content-buts-range').onclick=function(e){
         document.querySelector('div.cont_center-cont4-pro-shadow-Content-buts-range>span').style.width=event.offsetX/this.offsetWidth;
         videoPlay.currentTime=event.offsetX/this.offsetWidth*videoPlay.duration;
     }
     //退出播放
     document.querySelector('div.cont_center-cont4-pro-shadow-Content-buts-refresh+i').addEventListener('click',function(){
         document.querySelector('div.cont_center-cont4-pro-shadow-img').style.display='none';
         document.querySelector('div.cont_center-cont4-pro-shadow').style.display='none';
         videoPlay.pause();
     })
     
    
    
    


}
//全屏
function fullscreen(){
    var videoScreen=document.querySelector('div.cont_center-cont4-pro-shadow-Content-video>video');
    if(videoScreen.requestFullscreen){
        videoScreen.requestFullscreen();
    }else if(videoScreen.mozRequestFullScreen){
        videoScreen.mozRequestFullScreen();
    }else if(videoScreen.webkitRequestFullscreen){
        videoScreen.webkitRequestFullscreen();
    }else if(videoScreen.msRequestFullscreen){
        videoScreen.msRequestFullscreen();
    }
    

}



