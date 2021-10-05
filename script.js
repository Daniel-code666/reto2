const endPoint= " https://g37d016d3319081-db202109231930.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/games/games";

function registro(){

    var juego = {
        id:$("#miId").val(),
        developer:$("#developer").val(),
        minage:$("#minage").val(),
        category_id:$("#cat_id").val(),
        name:$("#name").val()
    }

    let datasend=JSON.stringify(juego)

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

function getGames(){
    $.ajax({
        method:"GET",
        url: endPoint,

        success:function(data){
            var misItems = data.items;

            for(i = 0; i < misItems.length; i++)
            {
                $("#items").append("<tr>");
                $("#items").append("<td>" + misItems[i].id + "</td>");
                $("#items").append("<td>" + misItems[i].developer + "</td>");
                $("#items").append("<td>" + misItems[i].minage + "</td>");
                $("#items").append("<td>" + misItems[i].category_id + "</td>");
                $("#items").append("<td>" + misItems[i].name + "</td>");
                $("#items").append('<button onclick="deleteGame('+ misItems[i].id+')">Borrar</button>');
                $("#items").append('<button onclick="getGamesById('+ misItems[i].id+')">Editar</button>');
                $("#items").append("</tr>");
            }
        }
    });
}

function getGamesById(idItem){
    $.ajax({
        method:"GET",
        url: "https://g37d016d3319081-db202109231930.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/games/games/" + idItem,
        success:function(data){
            console.log(data);
            var item = data.items[0];

            $("#miId").val(item.id);
            $("#developer").val(item.developer);
            $("#minage").val(item.minage);
            $("#cat_id").val(item.category_id);
            $("#name").val(item.name)
        },
        error: function(jqXHR, textStatus, errorThrown) {}
    });
}

function editGame(){
    var juego = {
        id:$("#miId").val(),
        developer:$("#developer").val(),
        minage:$("#minage").val(),
        category_id:$("#cat_id").val(),
        name:$("#name").val()
    }

    var dataToSend=JSON.stringify(juego);
//JSON= JavaScript Object Notation
    $.ajax({
        dataType: 'json',
        data:dataToSend,
        contentType:'application/json',
        url:"https://g37d016d3319081-db202109231930.adb.sa-santiago-1.oraclecloudapps.com/ords/admin/games/games",
        type:'PUT',
        
        success:function(data) {
            console.log(data);
        },
        
        error: function(jqXHR, textStatus, errorThrown) {
        }
    });
}

function deleteGame(idElemento){
    const juego={
        id:idElemento
    }

    let datasend=JSON.stringify(juego)

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

function peticionGet(){
    $.ajax({
        method:"GET",
        url: endPoint,
        success:function(data){
            //console.log(data)
            //console.log(data.items)
            mostrarGames(data.items)
        },
        error:function(error){
            console.log("Error Get")
        }
    });
}


function peticionPost(){

    const juego={
        id:1,
        developer:"Microsoft",
        minage:15,
        category_id:1,
        name:"Rayman"
    }

    let datasend=JSON.stringify(juego)

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
            
        }

    });
}

function peticionPut(){
    const juego={
        id:1,
        developer:"Linux",
        minage:13,
        category_id:7,
        name:"Rayman"
    }

    let datasend=JSON.stringify(juego)

    $.ajax({
        method:"PUT",
        url:endPoint,
        data:datasend,
        dataType:'json',
        contentType:"application/json",
        complete:function(response){
            console.log(response.status)
            console.log("Actualizo el registro")
        },
        error:function(error){
        }
    });

}
function peticionDelete(){
    const juego={
        id:1
    }

    let datasend=JSON.stringify(juego)

    $.ajax({

        method:"DELETE",
        url:endPoint,
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


function mostrarGames(games){
    games.forEach(game =>{
        console.log(game.id)
        console.log(game.developer)
        console.log(game.minage)
        console.log(game.category_id)
        console.log(game.name)
    });
}