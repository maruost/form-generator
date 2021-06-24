data = {
  attributes: {
    action: "www.example.com",
    id: "flyToMars",
  },
  elements: {
    titles: [
      {
        h1: { text: "Заявка на экскурсионный полёт на Марс" },
        h2: { text: "Личная информация" },
      },
    ],
    inputs: [
      {
        label: { attributes: { for: "last_name" }, text: "Фамилия" },
        input: {
          attributes: { type: "text", id: "last_name", required: true },
        },
      },
      {
        input: { attributes: { type: "checkbox", id: "changes" } },
        label: { attributes: { for: "changes" }, text: "ранее не изменялась" },
      },
      {
        label: { attributes: { for: "first_name" }, text: "Имя" },
        input: { attributes: { type: "text", id: "first_name" } },
      },
      {
        label: { attributes: { for: "middle_name" }, text: "Отчество" },
        input: { attributes: { type: "text", id: "middle_name" } },
      },
      {
        label: {
          attributes: { for: "last_name_en" },
          text: "Фамилия латиницей",
        },
        input: { attributes: { type: "text", id: "last_name_en" } },
      },
      {
        label: { attributes: { for: "first_name_en" }, text: "Имя латиницей" },
        input: { attributes: { type: "text", id: "first_name_en" } },
      },
      {
        label: { attributes: { for: "dob" }, text: "Дата рождения" },
        input: { attributes: { type: "date", id: "dob" } },
      },
      {
        label: { attributes: { for: "status" }, text: "Семейное положение" },
        select: {
          attributes: { id: "status", name: "status" },
          elements: {
            options: [
              {
                option: {
                  attributes: { value: "single" },
                  text: "Не женат / не замужем",
                },
              },
              {
                option: {
                  attributes: { value: "married" },
                  text: "Женат / замужем",
                },
              },
              {
                option: {
                  attributes: { value: "divorced" },
                  text: "Разведен(а)",
                },
              },
            ],
          },
        },
      },
      {
        label: { attributes: { for: "about-me" }, text: "Немного о себе" },
        input: { attributes: { type: "textarea", id: "about-me" } },
      },
      { label: { text: "Ваш пол" } },
      {
        input: {
          attributes: {
            type: "radio",
            id: "female",
            name: "gender",
            value: "female",
          },
        },
        label: { attributes: { for: "female" }, text: "Женский" },
      },
      {
        input: {
          attributes: {
            type: "radio",
            id: "male",
            name: "gender",
            value: "male",
          },
        },
        label: { attributes: { for: "male" }, text: "Мужской" },
      },
    ],
    titles2: [
      {
        h2: { text: "Контактная информация" },
      },
    ],
    inputes2: [
      {
        label: { attributes: { for: "phone" }, text: "Номер телефона" },
        input: {
          attributes: { type: "phone", id: "phone", placeholder: "+7" },
        },
      },
      {
        label: { attributes: { for: "email" }, text: "Электронная почта" },
        input: {
          attributes: { type: "email", id: "email" },
        },
      },
      {
        input: { attributes: { type: "checkbox", id: "is_good_question" } },
        label: {
          attributes: { for: "is_good_question" },
          text: "На Марсе классно?",
        },
      },
    ],
    buttons: [
      {
        button: {
          attributes: { type: "submit" },
          text: "Отправить",
        },
      },
      {
        button: { attributes: { type: "reset" }, text: "Я передумал" },
      },
    ],
  },
};

const formCreator = (jsonData) => {
  const globalData = jsonData;
  const globalClass = globalData.attributes.id;
  formMarkupCreator(globalData, globalClass);
  const formObj = document.querySelector("form");
  stylesCreator(formObj, globalClass);
  formInputsHandler(globalClass);
};

// function creates form markup
const formMarkupCreator = (jsonData, globalClass) => {
  const setAttributes = (obj, attributes) => {
    for (let prop in attributes) {
      obj.setAttribute(prop, attributes[prop]);
    }
  };

  const appendElement = (elem, objToAppend) => {
    objToAppend.appendChild(elem);
  };

  const setClassName = (elem, prop, type, className) => {
    const setClassNameDependsOnType = () => {
      if (type) {
        return [`${className}__${prop}`, `${className}__${prop}_${type}`];
      } else {
        return [`${className}__${prop}`];
      }
    };
    const classNameToken = setClassNameDependsOnType();
    classNameToken.forEach((token) => elem.classList.add(token));
  };

  const createElement = ({ tag, attributes, text, objToAppend }) => {
    const elem = document.createElement(tag);
    const type = attributes?.type;
    setAttributes(elem, attributes);
    text ? (elem.textContent = text) : null;
    appendElement(elem, objToAppend);
    setClassName(elem, tag, type, globalClass);
    return elem;
  };

  const createFormElementsRecursively = (obj, objToAppend) => {
    for (let element_name in obj) {
      obj[element_name].forEach((el) => {
        for (let tag in el) {
          const elementInDOM = createElement({
            tag: tag,
            attributes: el[tag].attributes,
            text: el[tag].text,
            objToAppend: objToAppend,
          });
          if (el[tag].elements) {
            createFormElementsRecursively(el[tag].elements, elementInDOM);
          } else {
            null;
          }
        }
      });
    }
  };

  const form = createElement({
    tag: "form",
    attributes: jsonData.attributes,
    objToAppend: document.body,
  });
  const formObj = document.querySelector("form");
  const formElements = jsonData.elements;

  createFormElementsRecursively(data.elements, formObj);
};

const stylesCreator = (objToAppend, className) => {
  const createStyleElement = () => {
    const style = document.createElement("style");
    objToAppend.appendChild(style);
  };
  createStyleElement();

  const generateStyleContent = () => {
    const fonts =
      '@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");';
    const form = `.${className}__form {
        font-family: Roboto;
        padding: 20px;
        width: 40%;
        border: 1px solid #e5e5e6;
      }`;

    const h1 = `.${className}__h1 {
      display: block;
      margin: 10px 0;
      padding: 10px 0;
      font-size: 24px;
      font-weight: 500;
      width: 100%;
      border-bottom: 1px solid #e5e5e6;
    }`;

    const h2 = `.${className}__h2 {
      display: block;
      margin: 10px 0;
      padding: 0 0;
      font-size: 18px;
      font-weight: 500;
    }`;

    const input = `.${className}__input {
        display: block;
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        border: 1px solid #e5e5e6;
        background-color: #f2f3f5;
        border-radius: 5px;
        font-size: 16px;
        margin-bottom: 10px;
      }`;

    const inputActions = `.${className}__input:focus, .${className}__input:active {
        outline: none;
        border: 1px solid #5395e1;
      }
      .${className}__input:hover {
        border: 1px solid #c7c7c7;
      }
      `;
    const label = `.${className}__label {
        display: block;
        color: #9898a0;
        font-size: 14px;
        padding: 5px 0;
      }`;
    const select = `.${className}__select {
        display: block;
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        border: 1px solid #e5e5e6;
        background-color: #f2f3f5;
        border-radius: 5px;
        font-size: 16px;
        margin-bottom: 10px;
      }`;
    const selectActions = `.${className}__select:hover {
        border: 1px solid #c7c7c7;
        cursor: pointer;
        }
      .${className}__select:active, .${className}__select:focus  {
        outline: none;
        border: 1px solid #5395e1;
      }`;

    const checkbox = `.${className}__input_checkbox {
        position: absolute;
        z-index: -1;
        opacity: 0;
      }
      .${className}__input_checkbox+label {
        display: inline-flex;
        align-items: center;
        user-select: none;
        color: #000;
        width: 100%;
      }
      .${className}__input_checkbox+label:hover {
        background-color: #f2f3f5;
        cursor: pointer;
      }
      .${className}__input_checkbox+label::before {
        content: '';
        display: inline-block;
        width: 1em;
        height: 1em;
        flex-shrink: 0;
        flex-grow: 0;
        border: 2px solid #e5e5e6;
        border-radius: 0.25em;
        margin-right: 0.5em;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 80% 100%;
      }
      .${className}__input_checkbox:checked+label::before {
        border-color: #3f8ae0;
        background-color: #3f8ae0;
        background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c3ZnanM9Imh0dHA6Ly9zdmdqcy5jb20vc3ZnanMiIHZlcnNpb249IjEuMSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtOS43MDcgMTkuMTIxYy0uMTg3LjE4OC0uNDQyLjI5My0uNzA3LjI5M3MtLjUyLS4xMDUtLjcwNy0uMjkzbC01LjY0Ni01LjY0N2MtLjU4Ni0uNTg2LS41ODYtMS41MzYgMC0yLjEyMWwuNzA3LS43MDdjLjU4Ni0uNTg2IDEuNTM1LS41ODYgMi4xMjEgMGwzLjUyNSAzLjUyNSA5LjUyNS05LjUyNWMuNTg2LS41ODYgMS41MzYtLjU4NiAyLjEyMSAwbC43MDcuNzA3Yy41ODYuNTg2LjU4NiAxLjUzNiAwIDIuMTIxeiIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiIvPjwvZz48L2c+PC9zdmc+Cg==");
      }`;

    const radio = `.${className}__input_radio {
        position: absolute;
        z-index: -1;
        opacity: 0;
      }
      .${className}__input_radio+label {
        display: inline-flex;
        align-items: center;
        user-select: none;
        color: #000;
        cursor: pointer;
        margin-right: 10px;
      }
      .${className}__input_radio+label::before {
        content: '';
        display: inline-block;
        width: 1em;
        height: 1em;
        flex-shrink: 0;
        flex-grow: 0;
        border: 2px solid #e5e5e6;
        border-radius: 100%;
        margin-right: 0.5em;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 82% 78%;
        transition: transform 0.3s ease-in-out;
      }
      .${className}__input_radio:checked+label::before {
        transform: scale(1.1);
        border-color: #3f8ae0;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICA8ZGVmcy8+CiAgPHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSIjM2Y4YWUwIiBkPSJNMjU2IDBDMTE1LjM5IDAgMCAxMTUuMzkgMCAyNTZzMTE1LjM5IDI1NiAyNTYgMjU2IDI1Ni0xMTUuMzkgMjU2LTI1NlMzOTYuNjEgMCAyNTYgMHoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiLz4KPC9zdmc+Cg==");
      }`;

    const button = `.${className}__button {
        border: none;
        border-radius: 5px;
        padding: 10px 20px;
        cursor: pointer;
        font-weight: 500;
        font-size: 14px;
        transition: filter 0.1s ease-in;
      }
      .${className}__button:hover {
        filter: brightness(95%);
      }`;

    const primaryButton = `.${className}__button_submit {
        background-color: #3f8ae0;
        color: #fff;
      }`;

    const secondaryButton = `.${className}__button_reset {
        background-color: #f2f3f5;
        color: #3f8ae0;
      }`;

    const textarea = `.${className}__input_textarea {
 
      }`;

    return {
      fonts,
      form,
      h1,
      h2,
      input,
      inputActions,
      label,
      select,
      selectActions,
      checkbox,
      button,
      primaryButton,
      secondaryButton,
      textarea,
      radio,
    };
  };

  const styleContent = generateStyleContent();
  for (let style in styleContent) {
    const text = document.createTextNode(styleContent[style]);
    const styleObj = document.querySelector("style");
    styleObj.appendChild(text);
  }
};

const formInputsHandler = (id) => {
  const form = document.querySelector(`#${id}`);
  const inputsArr = form.querySelectorAll("input, select");
  let userdata = {};

  const setInputsValuesDependsInType = (input) => {
    switch (input.type) {
      case "radio":
        userdata = { ...userdata, [input.name]: "" };
        input.checked
          ? (userdata = { ...userdata, [input.name]: input.value })
          : null;
        break;
      case "checkbox":
        userdata = { ...userdata, [input.id]: input.checked };
        break;
      default:
        userdata = { ...userdata, [input.id]: input.value };
        break;
    }
  };

  const setInitialValues = (arr) => {
    arr.forEach((input) => {
      setInputsValuesDependsInType(input);
    });
  };

  setInitialValues(inputsArr);

  const inputsHandler = (e) => {
    const input = e.target;
    setInputsValuesDependsInType(input);
    console.log(userdata);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(userdata);
  };
  inputsArr.forEach((input) => {
    input.addEventListener("change", (e) => {
      inputsHandler(e);
    });
  });

  form.addEventListener("submit", (e) => {
    submitHandler(e);
  });

  const formValidator = () => {};
};

formCreator(data);
