const endPoint= "https://g37d016d3319081-db202109231930.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message";

function insertMsg(){

    var msg = {
        id:$("#miId").val(),
        messagetext:$("#message").val(),
    }

    let datasend=JSON.stringify(msg)

    $.ajax({

        method:"POST",
        url:endPoint,
        data:datasend,
        dataType:'json',
        contentType:"application/json",
        complete:function(response){
            console.log(response.status)
        },
        error:function(error){
            console.log(error);
        }
    });
}

function getMsg(){
    $.ajax({
        method:"GET",
        url: endPoint,

        success:function(data){
            var misItems = data.items;

            for(i = 0; i < misItems.length; i++)
            {
                $("#items").append("<tr>");
                $("#items").append("<td>" + misItems[i].id + "</td>");
                $("#items").append("<td>" + misItems[i].messagetext + "</td>");
                $("#items").append('<button onclick="deleteMsg('+ misItems[i].id+')">Borrar</button>');
                $("#items").append('<button onclick="getMsgById('+ misItems[i].id+')">Editar</button>');
                $("#items").append("</tr>");
            }
        }
    });
}

function getMsgById(idItem){
    $.ajax({
        method:"GET",
        url: "https://g37d016d3319081-db202109231930.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/message/message/" + idItem,
        success:function(data){
            console.log(data);
            var item = data.items[0];

            $("#miId").val(item.id);
            $("#message").val(item.messagetext);
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function editMsg(){
    var client = {
        id:$("#miId").val(),
        messagetext:$("#message").val(),
    }

    var dataToSend=JSON.stringify(client);
//JSON= JavaScript Object Notation
    $.ajax({
        dataType: 'json',
        data:dataToSend,
        contentType:'application/json',
        url: endPoint,
        type:'PUT',
        
        success:function(data) {
            console.log(data);
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

function deleteMsg(idElemento){
    const client={
        id:idElemento
    }

    let datasend=JSON.stringify(client)

    $.ajax({
        method:"DELETE",
        url: endPoint,
        data:datasend,
        dataType:'json',
        contentType:"application/json",
        complete:function(response){
            console.log("Elimino el registro")
        },
        error:function(error){
            console.log("Error Delete")
        }
    });
}