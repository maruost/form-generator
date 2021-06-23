data = {
  attributes: {
    action: "www.example.com",
    target: "_blank",
  },
  className: "flyToMars",
  styles: { theme: "dark", size: "m" },
  elements: {
    titles: [
      { h1: { text: "Aнкета" }, h2: { text: "Заявка для полета на Марс" } },
    ],
    inputs: [
      {
        label: { text: "Фамилия" },
        input: { attributes: { type: "text", id: "last_name" } },
      },
      {
        label: { text: "Возраст" },
        input: { attributes: { type: "number", id: "age" } },
      },
      {
        label: { text: "Семейное положение" },
        select: {
          options: ["Не женат", "Разведен", "Холост"],
          attributes: { id: "status", name: "status" },
        },
      },
      {
        input: { attributes: { type: "checkbox", id: "changes" } },
        label: { text: "ранее не изменялась" },
      },
      {
        input: { attributes: { type: "checkbox", id: "is_good_question" } },
        label: { text: "на Марсе классно?" },
      },
    ],
    buttons: [
      {
        button: {
          attributes: { type: "submit", disabled: true },
          text: "Отправить",
        },
      },
      {
        button: { attributes: { type: "button" }, text: "Я передумал" },
      },
    ],
  },
};

const formCreator = (jsonData) => {
  const globalData = jsonData;
  const globalClass = globalData.className;
  formMarkupCreator(globalData, globalClass);
  const formObj = document.querySelector("form");
  stylesCreator(formObj, globalClass);
};

// function creates form markup
const formMarkupCreator = (jsonData, className) => {
  const setAttributes = (obj, attributes) => {
    for (let prop in attributes) {
      obj.setAttribute(prop, attributes[prop]);
    }
  };

  const appendElement = (elem, objToAppend) => {
    objToAppend.appendChild(elem);
  };

  const setClassName = (elem, className) => {
    elem.classList.add(className);
  };

  const createElement = ({ tag, attributes, options, text }) => {
    const elem = document.createElement(tag);
    setAttributes(elem, attributes);
    text ? (elem.textContent = text) : null;

    //options are nedded for 'select' tag
    options
      ? options.forEach((text) => {
          const option = createElement({ tag: "option", text });
          appendElement(option, elem);
        })
      : null;
    return elem;
  };

  const setElementsToDOM = (arr, objToAppend) => {
    arr.forEach((elem) => {
      for (let prop in elem) {
        const element = createElement({
          tag: prop,
          attributes: elem[prop].attributes,
          options: elem[prop]?.options,
          text: elem[prop]?.text,
        });
        appendElement(element, objToAppend);
        setClassName(element, `${className}__${prop}`);
      }
    });
  };

  const form = createElement({ tag: "form", attributes: jsonData.attributes });
  appendElement(form, document.body);
  setClassName(form, className);
  const formObj = document.querySelector("form");

  const formElements = jsonData.elements;

  for (let item in formElements) {
    setElementsToDOM(formElements[item], formObj);
  }
};

const stylesCreator = (objToAppend, className) => {
  const createStyleElement = () => {
    const style = document.createElement("style");
    objToAppend.appendChild(style);
  };
  createStyleElement();

  const generateStyleContent = () => {
    const input = `.${className}__input {
        display: block;
        width: 100%';
        padding: 8px;
        border: 1px solid #e5e5e6;
        backgroundColor: #f2f3f5;
        border-radius: 5px;
        font-size: 16px;
      }`;

    const inputActions = `.${className}__input:focus,
      .${className}__input:active {
        outline: none;
        border: 1px solid #5395e1;
      }`;
    const label = `.${className}__label {
        display: block;
        color: #9898a0;
        font-size: 14px;
        padding: 5px 0;
      }`;

    return { input, inputActions, label };
  };

  const styleContent = generateStyleContent();
  for (let style in styleContent) {
    const text = document.createTextNode(styleContent[style]);
    const styleObj = document.querySelector("style");
    styleObj.appendChild(text);
  }
};

formCreator(data);

/// inputs => attributes: [type: {}, id: {}, и т д ];
