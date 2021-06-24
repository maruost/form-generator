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
        label: { attributes: { for: "last_name" }, text: "Фамилия" },
        input: { attributes: { type: "text", id: "last_name" } },
      },
      {
        label: { attributes: { for: "age" }, text: "Возраст" },
        input: { attributes: { type: "text", id: "age" } },
      },
      {
        label: { attributes: { for: "status" }, text: "Семейное положение" },
        select: {
          options: ["Не женат", "Разведен", "Холост"],
          attributes: { id: "status", name: "status" },
        },
      },
      {
        input: { attributes: { type: "checkbox", id: "changes" } },
        label: { attributes: { for: "changes" }, text: "ранее не изменялась" },
      },
      {
        input: { attributes: { type: "checkbox", id: "is_good_question" } },
        label: {
          attributes: { for: "is_good_question" },
          text: "на Марсе классно?",
        },
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
        const setClassDependOnType = () => {
          if (elem[prop].attributes?.type) {
            return `${className}__${prop}-${elem[prop].attributes.type}`;
          } else {
            return `${className}__${prop}`;
          }
        };
        setClassName(element, setClassDependOnType());
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
    const fonts =
      '@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");';
    const form = `.${className} {
        font-family: Roboto;
        padding: 20px;
        width: 40%;
        border: 1px solid #e5e5e6;
      }`;

    const h1 = `.${className}__h1 {
      display: block;
      margin: 10px 0;
      padding: 0 0;
      font-size: 24px;
      font-weight: 500;
    }`;

    const h2 = `.${className}__h2 {
      display: block;
      margin: 10px 0;
      padding: 0 0;
      font-size: 18px;
      font-weight: 500;
    }`;

    const inputText = `.${className}__input-text {
        display: block;
        box-sizing: border-box;
        width: 100%;
        padding: 10px;
        border: 1px solid #e5e5e6;
        background-color: #f2f3f5;
        border-radius: 5px;
        font-size: 16px;
      }`;

    const inputTextActions = `.${className}__input-text:focus, .${className}__input-text:active {
        outline: none;
        border: 1px solid #5395e1;
      }
      .${className}__input-text:hover {
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
      }`;
    const selectActions = `.${className}__select:hover {
        border: 1px solid #c7c7c7;
        cursor: pointer;
        }
      .${className}__select:active, .${className}__select:focus  {
        outline: none;
        border: 1px solid #5395e1;
      }`;

    const checkbox = `.${className}__input-checkbox {
        position: absolute;
        z-index: -1;
        opacity: 0;
      }
      .${className}__input-checkbox+label {
        display: inline-flex;
        align-items: center;
        user-select: none;
        color: #000;
        width: 100%;
      }
      .${className}__input-checkbox+label:hover {
        background-color: #f2f3f5;
        cursor: pointer;
      }
      .${className}__input-checkbox+label::before {
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
        background-size: 50% 50%;
      }
      .${className}__input-checkbox:checked+label::before {
        border-color: #3f8ae0;
        background-color: #3f8ae0;
        background-image: url('data:image/svg+xml,<svg height="434pt" viewBox="0 -65 434.67733 434" width="434pt" xmlns="http://www.w3.org/2000/svg"><path d="m152.003906 304.34375c-5.460937 0-10.921875-2.089844-15.082031-6.25l-130.664063-130.667969c-8.34375-8.339843-8.34375-21.824219 0-30.164062 8.339844-8.339844 21.820313-8.339844 30.164063 0l115.582031 115.582031 246.253906-246.25c8.339844-8.339844 21.820313-8.339844 30.164063 0 8.339844 8.34375 8.339844 21.824219 0 30.167969l-261.332031 261.332031c-4.160156 4.160156-9.625 6.25-15.085938 6.25zm0 0"/></svg>');
      }`;

    const primaryButton = `.${className}__button-submit {
        border: none;
        background-color: #3f8ae0;
        color: #fff;
        border-radius: 5px;
        padding: 10px 20px;
        cursor: pointer;
        font-weight: 500;
        font-size: 14px;
      }`;

    const secondaryButton = `.${className}__button-button {
        border: none;
        background-color: #f2f3f5;
        color: #3f8ae0;
        border-radius: 5px;
        padding: 10px 20px;
        cursor: pointer;
        font-weight: 500;
        box-shadow: none;
        font-size: 14px;
      }`;

    return {
      fonts,
      form,
      h1,
      h2,
      inputText,
      inputTextActions,
      label,
      select,
      selectActions,
      checkbox,
      primaryButton,
      secondaryButton,
    };
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
