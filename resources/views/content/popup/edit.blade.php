
<div class="edit_popup" id="edit_popup">
    <div class="popup_container" id="popup_container">
        <div class="popup_body" id="popup_body">
            <form action="{{route('product.store')}}" method="post" id="edit_product_form" name="productForm">
                @csrf
                <div id="result"></div>
                <div class="headerPopup">
                    <h3>Добавить продукт</h3>
                </div>
                <br>
                <div>
                    <div class="d-block ">
                        <div id="article"><label for="">Артикул</label></div>
                        <div><input id="article_input_edit" name="article" type="text"></div>
                    </div>
                </div>
                <br>
                <div>
                    <div class="d-block ">
                        <div><label for="">Название</label></div>
                        <div><input id="name_input_edit" name="name" type="text"></div>
                    </div>
                </div>
                <br>
                <div>
                    <div class="d-block ">
                        <div><label for="">Статус</label></div>
                        <div><select name="status" id="status_select_edit">
                                <option value="available">Доступен</option>
                                <option value="unavailable">Недоступен</option>
                            </select></div>
                    </div>
                </div>
                <br>
                <div >
                    <div class="d-block ">
                        <div id="div_for_edit_attribute"><h4>Атрибуты</h4></div>
                        <button type="button" id="add_attribute">+ Добавить атрибут</button>
                    </div>
                </div>
                <div class="submit_button" id="submit_button">
                    <button type="submit" id="submit_update"
                            style="color: white; background-color: #0dcaf0; width: 180px; height: 35px; border-radius: 11px; border: 0">
                        Добавить
                    </button>

                </div>
                <div class="edit_popup_close" id="edit_popup_close">&#10006</div>
            </form>
        </div>

    </div>

</div>
