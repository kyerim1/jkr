

$(function(){

   var index = $(".bankTb").find("#kakao").index();
   var hg = $(".bankTb>tbody>tr").length;
   console.log(hg);


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

});


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
        `<tr id="woori">
        <td>${data['bank']}</td>
        <td>${data['money']}</td>
    </tr>`
    );
}
function checkAdd(data){
    var index = $(".bankTb").find("#"+data['linkbank']).index();
    
    $(".checkTb>tbody").append(
        ` <tr>
        <td>${data['checkcard']}</td>
        <td>${data['linkbank']}
        <svg class="line">
            <line x1="0" y1="16" x2="115"  y2="16"  fill="none" stroke="#6798FD" stroke-width="3"></polyline>
        </svg></td>
        
        </tr>`
    )
}
function creditAdd(data){

}

let addList=[bankAdd,checkAdd,creditAdd];