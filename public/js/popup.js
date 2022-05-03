//open add product popup
const popUp = document.getElementById('popup')
const openPopupBtn = document.getElementById('addBtn')
const closePopup = document.getElementById('popup_close')
openPopupBtn.addEventListener('click', function () {
    popUp.classList.add('active')
})
closePopup.addEventListener('click', () => {
    popUp.classList.remove('active')
})


//index products table
$(document).ready(function () {
    fetchProducts();

    function fetchProducts() {
        $.ajax({
            type: "GET",
            url: "api/fetch/products",
            datatype: "json",
            success: function (response) {
                $('tbody').html()
                for (let keyObj = 0; response.length > keyObj; keyObj++) {
                    let attr = ''
                    for (let key in response[keyObj].data) {
                        attr += key + ': ' + response[keyObj].data[key] + '<br>'
                    }
                    $("tbody").append('<tr  class="tableproduct" id="' + response[keyObj].id + '">' +
                        '<td class="p-3">' + response[keyObj].article + '</td>' +
                        '<td class="p-3">' + response[keyObj].name + '</td>' +
                        '<td class="p-3">' + response[keyObj].status + '</td>' +
                        '<td class="p-3">' + attr + '</td><br>' +
                        '</tr>')

                }
            }
        })
    }
})

jQuery.ajaxSetup({
    headers: {
        'X-XSRF-TOKEN': jQuery('meta[name="csrf-token"]').attr('content'),
        'Content-Type': 'application/json; charset=utf-8',
    }
});


//store product ajax function

const form = document.forms.productForm
$(document).ready(function () {
    $('#productForm').on('submit', function (e) {
        e.preventDefault();
        let formData = new FormData(this)
        let obj = {}
        for (let [key, prop] of formData) {
            obj[key] = prop;
        }
        let data = {'data': {}}
        if (formData.has('data')) {
            let inputs = document.getElementsByName('data')
            for (let i = 0; inputs.length > i;) {
                data['data'][inputs[i].value] = inputs[i + 1].value
                i = i + 2
            }
            data = Object.assign(obj, data)
        } else {
            data = Object.assign(data, obj)
            data['data'] = null
        }

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
            contentType: "application/json; charset=utf-8",
            processData: false,
            data: data,
            success: function (response) { //Данные отправлены успешно
                let string1 = JSON.stringify(response);
                let resp = JSON.parse(string1);
                if (resp.status == 'available') {
                    const content = $('<tr>' +
                        '<td class="p-3 bg-white">' + resp['article'] + '</td>' +
                        '<td class="p-3 bg-white">' + resp['name'] + '</td>' +
                        '<td class="p-3 bg-white">' + resp['status'] + '</td>' +
                        '<td class="p-3 bg-white"></td>' +
                        '</tr>')
                    $('#products_table').append(content)
                }
                $(document).ready(function () {
                    const success = $('<div class="alert alert-success">' +
                        'Продукт успешно добавлен' +
                        '</div>')
                    $('#header').append(success)
                    let inputs = document.querySelectorAll('input[type=text]');
                    for (let i = 0; i < inputs.length; i++) {
                        inputs[i].value = '';
                    }
                });

            },
            error: function (response) { // Данные не отправлены
                $(document).ready(function () {
                    const error = $('<div class="alert alert-danger">' +
                        'Невозможно добавить продукт' +
                        '</div>')
                    console.log(response)
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
            '<div class="d-block"><label class="d-block">Название</label><input type="text" name="data" class="lab_name"></div>' +
            '<div class="d-block"><label class="d-block">Значение</label><input type="text" name="data" class="lab_name"></div>' +
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


const popUpCloseBtn = $('#popup_close_btn')

popUpCloseBtn.on('click', () => {
    if (document.getElementById('show_product_popup')) {
        document.getElementById('show_product_popup').remove()
        $('.icons').remove()
    }
    $('#popup_show_product').removeClass('active')

    $('#show_product_popup').remove()
})


//show form active
$(document).on('click', ".tableproduct", function (e) {
    if ($('#show_product_popup')) {
        $('#show_product_popup').remove()
    }
    $('#popup_show_product').addClass('active')
    showProductForm(this.id)
    //FORM EDIT SHOW
    $(document).on('click', "#edit_product_btn", function () {
        $('#edit_popup').addClass('active')
        const id = this.parentNode.parentNode.id
        ///get prpduct for edit
        editProduct(id)
        //UPDATE PRODUCT
        $(document).on('click', '#submit_update', function (e) {
            e.preventDefault()
            let obj = {}
            let form = new FormData(document.getElementById('edit_product_form'))
            for (let [key, prop] of form) {
                obj[key] = prop
            }

            let data = {'data': {}}
            console.log(form.has('data'))
            if (form.has('data')) {

                let inputs = document.getElementsByName('data')

                for (let i = 0; inputs.length > i;) {
                    data['data'][inputs[i].value] = inputs[i + 1].value
                    i = i + 2
                }
                data = Object.assign(obj, data)
            }
            console.log(data)
            data = JSON.stringify(data)
            console.log(data)
            if (config.role === 'admin') {
                $.ajax({
                    type: 'PUT',
                    headers: {
                        'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                        'Content-Type': 'application/json; charset=utf-8',
                    },
                    contentType: "application/json; charset=utf-8",
                    url: 'product/' + id,
                    dataType: "json",
                    processData: false,
                    data: data,
                    success: function (response) {
                        $('#header').append(
                            '<div class="alert alert-success">Изменено успешно</div>'
                        )
                    },
                    error: function (response) {
                        console.log(response)
                    }

                })
            } else {
                $('#header').append(
                    '<div class="alert alert-danger">Нет прав для изменения</div>'
                )
            }

        })
    })
})


function editProduct(id) {
    $.ajax({
        headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            'Content-Type': 'application/json; charset=utf-8',
        },
        type: 'GET',
        url: 'product/' + id + '/edit',
        dataType: "json",
        contentType: "application/json; charset=utf-8",
        processData: false,
        success: function (response) {
            $('#article_input_edit').val(response.article)
            $('#name_input_edit').val(response.name)
            $('#status_select_edit').val(response.status)
            if (response.data != null) {
                for (let key in response.data) {

                    $('#div_for_edit_attribute').append($('<div class="double_input_attribute" id="double_div">' +
                        '<div class="d-block"><label class="d-block">Название</label><input value="' + key + '" type="text" name="data" class="lab_name"></div>' +
                        '<div class="d-block"><label class="d-block">Значение</label><input value="' + response.data[key] + '" type="text" name="data" class="lab_name"></div>'
                    ))
                }

                stop()
            }
        },
        error: function (error) {
            console.log(error)
        }

    })


}


//open show form product
function showProductForm(id) {
    $(document).ready(function () {
        $.ajax({
            headers: {
                'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                'Content-Type': 'application/json; charset=utf-8',
            },
            url: 'http://laradockertest/public/product/' + id,
            type: "get",
            dataType: 'json',
            contentType: "application/json; charset=utf-8",
            processData: false,


            success: function (response) { //Данные отправлены успешно
                let content = $('<div id="show_product_popup">' +
                    '<div><h3>' + response.name + '</h3></div>' +
                    '<div class="d-flex">' +
                    '<div id="name_attr_popup">' +
                    '<div >Артикул</div>' +
                    '<div >Название</div>' +
                    '<div >Статус</div>' +
                    '<div >Атрибуты</div>' +
                    '</div>' +
                    '<div>' +
                    '<div>' + response.article + '</div>' +
                    '<div>' + response.name + '</div>' +
                    '<div id="last">' + response.status + '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>'
                )
                let attr = ''
                if (response.data != null) {
                    for (let key in response.data) {
                        attr += '<li>' + key + ':' + response.data[key] + '</li>'
                    }
                } else {
                    attr += '<div>Нет</div>'
                }
                $('.popup_body_product').prepend(
                    '<div id="' + id + '" class="icons"><div id="edit_div"><i id="edit_product_btn" class="fas fa-pencil" aria-hidden="true"></i></div><div class="delete_product"><i class="fas fa-trash" aria-hidden="true"></i></div></div>'
                )
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


$(document).on('click', '.delete_product', function (e) {
    deleteProduct(this.parentNode.id)


})

function deleteProduct(id) {
    if (confirm('Подтвердить удаление?')) {
        $('#popup_show_product').removeClass('active')
        $('#' + id + '.tableproduct').remove()
        $('.icons').remove()
        $(document).ready(function () {

            $.ajax({
                headers: {
                    'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
                    'Content-Type': 'application/json; charset=utf-8',
                },
                url: 'http://laradockertest/public/product/' + id,
                type: "delete",
                dataType: 'json',
                contentType: "application/json; charset=utf-8",
                processData: false,


                success: function (response) { //Данные отправлены успешно

                },
                error: function (response) { // Данные не отправлены

                }
            })

        })
    }

}


//show edit form

$(document).on('click', '#edit_product_btn', function (e) {
    $('#popup_show_product').removeClass('active')
    $('#edit_popup').addClass('active')

})

//close edit popup form
$(document).on('click', '#edit_popup_close', () => {
    $('#edit_popup').removeClass('active')
    $('.icons').remove()
    $('.double_input_attribute').remove()
})


//////////GET USER ROLE

const config = {
    role: getRoleUser()
}

function getRoleUser() {
    let role

    $.ajax({
        url: 'http://laradockertest/public/user/role',
        type: "get",
        async: false,
        dataType: 'json',
        contentType: "application/json; charset=utf-8",
        processData: false,
        success: function (response) {
            role = response.name
        },
        error: function (response) {
            console.log(response)
        }

    })

    return role
}



