
let valText=new Array();

$(function(){


    $("#checkInput").on("keyup",function(e){
        if(e.keyCode == 13){
            var jdata = {'checkcard':$("#checkcard").val()  , 'linkbank':$("#linkbank1").val()  };
            jsonSend(jdata);
            addList[1](jdata);
        }
    });
    $("#bankInput").on("keyup",function(e){
        if(e.keyCode == 13){
            var jdata = {'bank':$("#bank").val() , 'money':$("#money").val() };
            jsonSend(jdata);
            console.log(jdata);
            addList[0](jdata);
        }
    });
    $("#creditInput").on("keyup",function(e){
        if(e.keyCode == 13){
            var jdata = {'creditcard':$("#creditcard").val()  , 'linkbank':$("#linkbank2").val()  , 'paymentday':$("#paymentday").val()  };
            jsonSend(jdata);
            addList[2](jdata);
        }
    });

    $("html").on("click",function(e){
        if( $(e.target).parents(".assetsTb").length<1){
            if(  $(".myassets").find(".change").length>1  ){
                for(var i=0; i<$(".change").length; i++){
                    $(".change").eq(i).text(valText[i]);
                }
                valText=[];
                $(".change").removeClass("change");
            }
        }
    });
    $(".bankTb>tbody tr").on("click",valueChange);
    $(".checkTb>tbody tr").on("click",valueChange);
    $(".creditTb>tbody tr").on("click",valueChange);

});

function valueChange(){
    if( $(".myassets").find(".change").length>1 ) return;
        var n =["Re1","Re2","Re3"];
        
        for( var i=0;i<$(this).children(0).length;i++){
            $(this).children(0).eq(i).addClass("change");
            var text = $(this).children(0).eq(i).text();
            valText.push(text);
            $(this).children(0).eq(i).empty();
            var reType="text";
            if( !isNaN(parseInt(text.substr(1)))){
                text = Number(text.substr(1).replace(/,/g,""));
                reType="number";
            }
            $(this).children(0).eq(i).append(`<input type="${reType}" id="${n[i]}" value="${text}">`);
        }
        $(".change").on("keyup",function(e){
            if(e.keyCode == 13){
                var n =["Re1","Re2","Re3"];
                for(var i=0; i<$(".change").length; i++){
                    var val = $(".change").find("#"+n[i]).val();
                    if( !isNaN(val) ){
                        val = "\\"+parseInt(val).toLocaleString();
                    }
                    $(".change").eq(i).text(val);
                }
                valText=[];
                $(".change").removeClass("change");
            }
        });
}

function jsonSend(jdata){

    $.ajax({
        url:"/accountKeep",
        data: JSON.stringify(jdata),
        dataType: "json",
        type: "post",
        contentType: "application/json",
        success:function(data){
            alert("성공");
           
        },
        error:function(errorThrown){
            alert(errorThrown.statusText);
        }
    })
}


function bankAdd(data){
    $(".bankTb>tbody").append(
        `<tr id="${data['bank']}">
        <td>${data['bank']}</td>
        <td>${data['money']}</td>
    </tr>`
    );
}
function checkAdd(data){
    var bankp = $(".bankTb").find("#"+data['linkbank']).index();
    var chkp = $(".checkTb>tbody>tr").length;
    console.log(bankp);
    bankp = bankp*36 + 43+36+16;
    chkp= chkp*36+43+36+16;
    
    $(".checkTb>tbody").append(
        ` <tr>
        <td>${data['checkcard']}</td>
        <td class='linePoint1'>${data['linkbank']}</td>
        </tr>`
    )
    $("#assetsReg").append(
      `<svg class="line">
      <line x1="324" y1="${chkp}" x2="439"  y2="${bankp}"  fill="none" stroke="#6798FD" stroke-width="3"></polyline>
  </svg>
  `  
    );
}
function creditAdd(data){

}

let addList=[bankAdd,checkAdd,creditAdd];