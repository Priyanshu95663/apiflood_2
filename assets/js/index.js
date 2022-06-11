 

$("#add_flood").submit(function(event){
 
    alert("Data Inserted Successfully!");
})
$("#add_weblink").submit(function(event){
 
    alert("Data Inserted Successfully!");
})

$("#add_twit").submit(function(event){
 
    alert("Data Inserted Successfully!");
})

$("#update_flood").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `https://agile-hollows-34401.herokuapp.com/api/flood/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `https://agile-hollows-34401.herokuapp.com/api/flood/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

// document.addEventListener('DOMContentLoaded', () => {
//     // 1. Display file name when select file
//     let fileInputs = document.querySelectorAll('.file.has-name')
//     for (let fileInput of fileInputs) {
//       let input = fileInput.querySelector('.file-input')
//       let name = fileInput.querySelector('.file-name')
//       input.addEventListener('change', () => {
//         let files = input.files
//         if (files.length === 0) {
//           name.innerText = 'No file selected'
//         } else {
//           name.innerText = files[0].name
//         }
//       })
//     }
  
//     // 2. Remove file name when form reset
//     let forms = document.getElementsByTagName('form')
//     for (let form of forms) {
//       form.addEventListener('reset', () => {
//         console.log('a')
//         let names = form.querySelectorAll('.file-name')
//         for (let name of names) {
//           name.innerText = 'No file selected'
//         }
//       })
//     }
//   })
// //   //this is the 1st way.
// //   $(document).ready(function(){
// //     $('#upload').click(function(){

// //         var csv = $('#filename');
// //         var csvFile = csv[0].files[0];
      
// //         var ext = csv.val().split(".").pop().toLowerCase();

// //         if($.inArray(ext, ["csv"]) === -1){
// //             alert('upload csv');
// //             return false;
// //         }
// //         if(csvFile != undefined){
// //             reader = new FileReader();
// //             reader.onload = function(e){

// //                 csvResult = e.target.result.split(/\r|\n|\r\n/);
                
// //     var lines= csvResult;
// //     var result = [];
// //     var headers = lines[0].split(",");
  
// //     for(var i=1; i<lines.length; i++) {
// //       var obj = {};
  
// //       var row = lines[i],
// //         queryIdx = 0,
// //         startValueIdx = 0,
// //         idx = 0;
  
// //       if (row.trim() === '') { continue; }
  
// //       while (idx < row.length) {
// //         /* if we meet a double quote we skip until the next one */
// //         var c = row[idx];
  
// //         if (c === '"') {
// //           do { c = row[++idx]; } while (c !== '"' && idx < row.length - 1);
// //         }
  
// //         if (c === ',' || /* handle end of line with no comma */ idx === row.length - 1) {
// //           /* we've got a value */
// //           var value = row.substr(startValueIdx, idx - startValueIdx).trim();
  
// //           /* skip first double quote */
// //           if (value[0] === '"') { value = value.substr(1); }
// //           /* skip last comma */
// //           if (value[value.length - 1] === ',') { value = value.substr(0, value.length - 1); }
// //           /* skip last double quote */
// //           if (value[value.length - 1] === '"') { value = value.substr(0, value.length - 1); }
  
// //           var key = headers[queryIdx++];
// //           obj[key] = value;
// //           startValueIdx = idx + 1;
// //         }
  
// //         ++idx;
// //       }
  
// //       result.push(obj);
// //     }
 
// //     $('.jsondiv').append(JSON.stringify(result));
               
// //             }
// //             reader.readAsText(csvFile);
// //         }

        
  
  
// //     });
// // });


 