
                //open add product popup
const popUp = document.getElementById('popup')
const openPopupBtn = document.getElementById('addBtn')
const closePopup = document.getElementById('popup_close')
openPopupBtn.addEventListener('click', function (e){
    popUp.classList.add('active')
})
closePopup.addEventListener('click', () => {
    popUp.classList.remove('active')
})



jQuery.ajaxSetup({
    headers: {'X-XSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content'),
        'Content-Type': 'application/json; charset=utf-8',}
});


                //create product ajax function

const form = document.forms.productForm
$(document).ready(function () {
    console.log('+++++++')

    $('#productForm').on('submit', function (e) {
        e.preventDefault();
        let formData = new FormData(this)
        let obj = {}
        for (let [key, prop] of formData) {
            obj[key] = prop;
        }


        let  data = {'data': {}}
        if (formData.has('data')){

            let inputs = document.getElementsByName('data')

            for(let i=0; inputs.length > i;) {
                data['data'][inputs[i].value] = inputs[i+1].value
                i = i + 2
            }
             data = Object.assign(obj, data)
        } else {data = Object.assign(data,obj)}


        data = JSON.stringify(data)
        console.log(data)
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Content-Type': 'application/json; charset=utf-8',
            },
            url: form.action,
            type: "post",
            dataType: 'json',
            contentType:"application/json; charset=utf-8",
            processData: false,
            data:  data,

            success: function (response) { //Данные отправлены успешно
                console.log(response.name, this.data)
                $(document).ready(function () {
                    console.log(response)
                    let string1 = JSON.stringify(response);
                    let resp = JSON.parse(string1);
                    const content = $('<tr>' +
                        '<td class="p-3 bg-white">' + resp['article'] + '</td>' +
                        '<td class="p-3 bg-white">' + resp['name'] + '</td>' +
                        '<td class="p-3 bg-white">' + resp['status'] + '</td>' +
                        '<td class="p-3 bg-white"></td>' +
                        '</tr>')
                    $('#products_table').append(content)
                    $(document).ready(function () {
                        const success = $('<div class="alert alert-success">'+
                            'Продукт успешно добавлен'+
                            '</div>')
                        $('#header').append(success)
                    })

                });

            },
            error: function (response) { // Данные не отправлены
                $(document).ready(function () {
                    console.log(response)
                    const error = $('<div class="alert alert-danger">'+
                        'Невозможно добавить продукт '+response.responseText+
                        '</div>')
                    $('#header').append(error)
                });
            }
        })
    })

})

                //add input attribute in popup
let click = 0
$(document).ready(function () {

    $('#add_attribute').click(function () {
        click += 1
        if (click === 3) {
            $('#add_attribute').attr('disabled', true)
        }

        const createInput = $('<div class="double_input_attribute" id="double_div' + click + ' ">' +
            '<div class="d-block"><label class="d-block">Название</label><input name="data" class="lab_name"></div>' +
            '<div class="d-block"><label class="d-block">Значение</label><input name="data" class="lab_name"></div>' +
            '<i id="delete_attribute" onclick="deleteAttribute()" class="fa fa-trash"></i></div>')
        $('#div_for_add_attribute').append(createInput)


    })
})

                //delete input attribute in popup
function deleteAttribute() {
    $('#add_attribute').removeAttr('disabled')
    click -= 1
    $('#delete_attribute').parent().remove()
}

//open popup show product
const productPopup = document.getElementById('popup_show_product')
const productColumnsTable = $('.table_product')
const popUpCloseBtn = $('#popup_close_btn')
console.log(productColumnsTable)

for(let key of productColumnsTable) {
    key.addEventListener('click', () => {
        if (document.getElementById('show_product_popup')) {
            document.getElementById('show_product_popup').remove()
        }
        productPopup.classList.add('active')
    })
}
popUpCloseBtn.on('click', () => {
    if (document.getElementById('show_product_popup')) {
        document.getElementById('show_product_popup').remove()
    }
    productPopup.classList.remove('active')
})


//open show form product
function showProductForm(data) {
    $(document).ready(function () {

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Content-Type': 'application/json; charset=utf-8',
            },
            url: 'http://laradockertest/public/product/'+data+'',
            type: "get",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            processData: false,


            success: function (response) { //Данные отправлены успешно
                console.log(response.data === null)
                let content = $('<div id="show_product_popup">'+
                    '<div><h3>'+response.name+'</h3></div>'+
                    '<div class="d-flex">'+
                    '<div id="name_attr_popup">'+
                        '<div >Артикул</div>'+
                        '<div >Название</div>'+
                        '<div >Статус</div>'+
                        '<div >Атрибут</div>'+
                     '</div>'+
                     '<div>'+
                        '<div>'+response.article+'</div>'+
                        '<div>'+response.name+'</div>'+
                        '<div id="last">'+response.status+'</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'+
                    '</div>'
                )
                let attr = ''
                if (response.data != null) {
                    for(let key in response.data) {
                       attr += '<li>'+key+':'+response.data[key]+'</li>'
                    }
                } else {
                    attr += '<div>Нет</div>'
                }
                $('.popup_body_product').append(content)
                $('#last').append(attr)

                function deleteProduct() {

                }
            },
            error: function (response) { // Данные не отправлены
                console.log(2132)
            }
        })

    })
}


function deleteProduct(productId) {
    $(document).ready(function () {

        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Content-Type': 'application/json; charset=utf-8',
            },
            url: 'http://laradockertest/public/product/'+productId+'',
            type: "delete",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            processData: false,


            success: function (response) { //Данные отправлены успешно
                console.log(response)
            },
            error: function (response) { // Данные не отправлены
                console.log(response)
            }
        })

    })
}

