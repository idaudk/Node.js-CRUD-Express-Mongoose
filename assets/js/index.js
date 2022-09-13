$('#add_user').submit(
    function(event){
        alert('user saved sucessfully!');
    }
)

$('#update_user').submit(
    function(event){
        //preventing form to remove all data as submit is pressed
        event.preventDefault();

        //getting all the data in form in variable
        var unindexed_array = $(this).serializeArray();

        var data = {};

        // getting id param from the unidexed array (n -----> all the data in array, i -----> for index in array)
        $.map(unindexed_array, function(n, i){
            data[n['name']]=n['value']
        })
        console.log(data); 

        var request = {
            'url' : `http://localhost:3000/api/users/${data.id}`,
            'method' : 'PUT',
            'data': data
        }

        $.ajax(request).done(function(response){
            alert('Data updated sucessfully!')
        })
        // alert('user updated sucessfully!');
    }
)

if(window.location.pathname == '/'){
    $onDelete = $('button.delete');

    $onDelete.click(function(){
        //accessing the data-id attribute from the delete button
        var id = $(this).attr('data-id');

        //request for delete
        var request = {
            'url' : `http://localhost:3000/api/users/${id}`,
            'method' : 'DELETE',
        }

        if(confirm('Do you really want to delete this user?')){
            $.ajax(request).done(function(response){
                alert('Data deleted sucessfully!');
                location.reload();
            })
        }
    })
}