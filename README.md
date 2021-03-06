# Генератор форм
FormCreator - модуль, который преобразовывает JSON с описанием контента формы в готовую верстку. 
Готовая форма имеет два стиля light и dark, в форме настроена валидация. 
#### Подключение: 
```js
import FormCreator from "./FormCreator.js"
```
#### Использование: 
```js
const formCreator = new FormCreator(json); 
const formElement = formCreator.createForm(); // <form>...</form>
```
FormCreator принимает в качестве параметра JSON строку и преобразует её в JS объект. Метод `createFrom` возвращает готовую верстку формы.
#### Формат `JSON`:
Принимаемый JSON должен иметь следующую структуру: 
```js
{
  "schema": ... // тема формы
  "attribues" : {"id": ..., "action": ..., ...}, // атрибуты формы, id - обязательный атрибут, задает общий класс для стилей, action - URL сервера, для отправки данных формы
  "elements" : { // объект с группами элементов, которые есть в форме 
      "elements_group1": [{...}, ..., {...}], // группa элементов, каждый элемент массива - элемент формы, название группы - произвольное, названия не должны повторяться
      "elements_group2" : [
        {
          "element": { // элемент который будет добавлен в верстку, название должно соответствовать тегу элемента
            "attributes": {...}, // атрибуты элемента, доступны стандартные атрибуты элемента
            "elements": [{...}, {...}] // дочерние элементы данного элемента
        },
        { 
          "element": {
            "attributes": {...}, 
            "text": {...} // отображаемый текст
        }
       ]
   }
}
```
Свойства JSON, описание, возможные значения: 

**shema** - тема формы. Значения: "light", "dark";   
**attributes** - аттрибуты, котрые будут добавлены элементу DOM дерева. Стандартные атрибуты элемента. Обязательные аттрибуты для разных типов элементов:  
- **input**: 
    - **radio**: *type, id, name, value*;
    - **другие типы**: *type, id*;
- **label**: *for*;  
- **select**: *id, name*;
    - **option**: *value*;  
 
 **elements** - массив дочерних элементов, добавляются к родительскому;  
 **text** - отображаемый текст для label и элементов с текстовыми узлами;  
 **elements_group** - группа однородных элементов, каждый объект в массиве - элемент формы. Название группы произвольное, названия не должны повторяться. Для группы инпутов в названии должно присутствовать слово 'input'. Каждый элемент группы инпутов генератором оборачивается в 'div', последним дочерним элементом 'div' является span - элемент, необходимый для отображения ошибок валидации.  
 **element** - элемент DOM дерева. Название элемента соответствует тегу. Стилизованные элементы: *input (типы: checkbox, radio, date, text), select, option, fieldset, label, h1, h2, button (типы: button, submit, reset)*  

#### Формат возвращаемой вёрстки: 
Пример: 
```html
<form action="www.example.com" id="flyToMars" class="flyToMars__form flyToMars__form_light">
  <h1 class="flyToMars__h1 flyToMars__h1_light">Заявка на экскурсионный полёт на Марc</h1>
  <h2 class="flyToMars__h2 flyToMars__h2_light">Личная информация</h2>
  <div class="flyToMars__div flyToMars__div_light">
    <label for="last_name" class="flyToMars__label flyToMars__label_light">Фамилия</label>
    <input type="text" id="last_name" required="true" minlength="2" class="flyToMars__input flyToMars__input_text flyToMars__input_light"/>
    <span data-id="last_name" class="flyToMars__span flyToMars__span_light"></span>
  </div>
  ...
  <button type="submit" class="flyToMars__button flyToMars__button_submit flyToMars__button_light">Отправить</button
  >
  ...
  <style>
    @import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");
    .flyToMars__form {
      font-family: Roboto;
      padding: 20px;
      width: 35%;
      border: 1px solid #e5e5e6;
    }
    ...
  </style>
</form>
  ```
#### Отправка данных:
Данные отправляются на сервер в формате JSON строки. URL для отправки - значение аттрибута action формы. Формат объекта отправляемых данных, до преобразования в JSON: 
```
{ 
  [input_id]: input_value,
  ...
}
``` 

Пример `JSON` схемы находится в json_example.json в папке example данного репозитория.
Превью формы по схеме из json_example.json (dark и light mode):  

![preview](https://github.com/maruost/form-generator/blob/main/example/prev-form-dark.gif) ![preview](https://github.com/maruost/form-generator/blob/main/example/prev-form-light.PNG)
