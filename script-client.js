const endPoint= "https://g37d016d3319081-db202109231930.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client";

function insertClient(){

    var client = {
        id:$("#miId").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val(),
    }

    let datasend=JSON.stringify(client)

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

function getClient(){
    $.ajax({
        method:"GET",
        url: endPoint,

        success:function(data){
            var misItems = data.items;

            for(i = 0; i < misItems.length; i++)
            {
                $("#items").append("<tr>");
                $("#items").append("<td>" + misItems[i].id + "</td>");
                $("#items").append("<td>" + misItems[i].name + "</td>");
                $("#items").append("<td>" + misItems[i].email + "</td>");
                $("#items").append("<td>" + misItems[i].age + "</td>");
                $("#items").append('<button type="button" class="btn btn-outline-danger btn-sm" onclick="deleteClient('+ misItems[i].id+')">Borrar</button>');
                $("#items").append('<button type="button" class="btn btn-outline-warning btn-sm" onclick="getClientById('+ misItems[i].id+')">Editar</button>');
                $("#items").append("</tr>");
            }
        }
    });
}

function getClientById(idItem){
    $.ajax({
        method:"GET",
        url: "https://g37d016d3319081-db202109231930.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/client/client/" + idItem,
        success:function(data){
            console.log(data);
            var item = data.items[0];

            $("#miId").val(item.id);
            $("#name").val(item.name);
            $("#email").val(item.email);
            $("#age").val(item.age);
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function editClient(){
    var client = {
        id:$("#miId").val(),
        name:$("#name").val(),
        email:$("#email").val(),
        age:$("#age").val()
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

function deleteClient(idElemento){
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