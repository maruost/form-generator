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
          attributes: {
            type: "text",
            id: "last_name",
            required: true,
            minlength: 2,
          },
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
        input: {
          attributes: {
            type: "text",
            id: "last_name_en",
            pattern: "^([A-Za-z]+)",
          },
        },
      },
      {
        label: { attributes: { for: "first_name_en" }, text: "Имя латиницей" },
        input: {
          attributes: {
            type: "text",
            id: "first_name_en",
            pattern: "^([A-Za-z]+)",
          },
        },
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
      {
        label: { text: "Ваш пол" },
        fieldset: {
          elements: {
            radios: [
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
          },
        },
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
          attributes: {
            type: "tel",
            id: "phone",
            placeholder: "+7",
          },
        },
      },
      {
        label: { attributes: { for: "email" }, text: "Электронная почта" },
        input: {
          attributes: { type: "email", id: "email" },
        },
      },
      {
        input: {
          attributes: {
            type: "checkbox",
            id: "is_good_question",
            required: true,
          },
        },
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

class FormCreator {
  constructor(data) {
    this.data = data;
    this.class = data.attributes.id;
  }

  formMarkupCreator() {
    const _setAttributes = (obj, attributes) => {
      for (let prop in attributes) {
        obj.setAttribute(prop, attributes[prop]);
      }
    };

    const _appendElement = (elem, objToAppend) => {
      objToAppend.appendChild(elem);
    };

    const _setClassName = (elem, prop, type, className) => {
      const _setClassNameDependsOnType = () => {
        if (type) {
          return [`${className}__${prop}`, `${className}__${prop}_${type}`];
        } else {
          return [`${className}__${prop}`];
        }
      };
      const classNameToken = _setClassNameDependsOnType();
      classNameToken.forEach((token) => elem.classList.add(token));
    };

    const _createElement = ({ tag, attributes, text, objToAppend }) => {
      const elem = document.createElement(tag);
      const type = attributes?.type;
      _setAttributes(elem, attributes);
      text ? (elem.textContent = text) : null;
      if (tag !== "form") {
        _appendElement(elem, objToAppend);
      }
      _setClassName(elem, tag, type, this.class);
      return elem;
    };

    const _createFormElementsRecursively = (obj, objToAppend) => {
      for (let element_name in obj) {
        obj[element_name].forEach((el) => {
          let elToAppend = objToAppend;
          if (element_name.includes("input")) {
            const wrapper = _createElement({ tag: "div", objToAppend });
            elToAppend = wrapper;
          }
          for (let tag in el) {
            const elementInDOM = _createElement({
              tag: tag,
              attributes: el[tag].attributes,
              text: el[tag].text,
              objToAppend: elToAppend,
            });
            if (el[tag].elements) {
              _createFormElementsRecursively(el[tag].elements, elementInDOM);
            } else {
              null;
            }
          }
        });
      }
    };

    const _createErrSpanElements = (arr) => {
      for (let i = 0, child; (child = arr[i]); i++) {
        const input = child.querySelector("input, select");
        if (input?.type === "radio") {
          _createElement({
            tag: "span",
            attributes: input ? { ["data-id"]: input.name } : null,
            objToAppend: child,
          });
        } else {
          _createElement({
            tag: "span",
            attributes: input ? { ["data-id"]: input.id } : null,
            objToAppend: child,
          });
        }
      }
    };

    const form = _createElement({
      tag: "form",
      attributes: this.data.attributes,
    });

    const formChildren = form.children;
    _createFormElementsRecursively(this.data.elements, form);
    _createErrSpanElements(formChildren);

    return form;
  }

  stylesCreator(objToAppend) {
    const _createStyleElement = () => {
      const style = document.createElement("style");
      objToAppend.appendChild(style);
      return style;
    };
    const _generateStyleSheet = () => {
      const fonts =
        '@import url("https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap");';
      const form = `.${this.class}__form {
          font-family: Roboto;
          padding: 20px;
          width: 40%;
          border: 1px solid #e5e5e6;
        }`;

      const div = `.${this.class}__div {
        margin: 5px auto;
      }`;

      const h1 = `.${this.class}__h1 {
        display: block;
        margin: 10px 0;
        padding: 10px 0;
        font-size: 24px;
        font-weight: 500;
        width: 100%;
        border-bottom: 1px solid #e5e5e6;
      }`;

      const h2 = `.${this.class}__h2 {
        display: block;
        margin: 10px 0;
        padding: 0 0;
        font-size: 18px;
        font-weight: 500;
      }`;

      const input = `.${this.class}__input {
          display: block;
          box-sizing: border-box;
          width: 100%;
          padding: 10px;
          border: 1px solid #e5e5e6;
          background-color: #f2f3f5;
          border-radius: 5px;
          font-size: 16px;
          margin-bottom: 5px;
        }
        .${this.class}__input::placeholder {
          font-family: Roboto;
          color: #99a2ad;
        }`;

      const inputActions = `.${this.class}__input:focus, .${this.class}__input:active {
          outline: none;
          border: 1px solid #5395e1;
        }
        .${this.class}__input:hover {
          border: 1px solid #c7c7c7;
        }
        `;
      const label = `.${this.class}__label {
          display: block;
          color: #9898a0;
          font-size: 14px;
          padding: 5px 0;
        }`;
      const select = `.${this.class}__select {
          display: block;
          box-sizing: border-box;
          width: 100%;
          padding: 10px;
          border: 1px solid #e5e5e6;
          background-color: #f2f3f5;
          border-radius: 5px;
          font-size: 16px;
          margin-bottom: 5px;
          -webkit-appearance: none; 
          background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NTEuODUgNDUxLjg1Ij4KICA8ZGVmcy8+CiAgPHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSIjOTlhMmFkIiBkPSJNMjI1LjkyIDM1NC43Yy04LjEgMC0xNi4yLTMuMDktMjIuMzctOS4yNkw5LjI3IDE1MS4xNmEzMS42NCAzMS42NCAwIDExNDQuNzUtNDQuNzVsMTcxLjkgMTcxLjkxIDE3MS45LTE3MS45YTMxLjY0IDMxLjY0IDAgMDE0NC43NSA0NC43NEwyNDguMyAzNDUuNDVhMzEuNTUgMzEuNTUgMCAwMS0yMi4zNyA5LjI2eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIvPgo8L3N2Zz4K");
          background-repeat: no-repeat;
          background-position: bottom 50% right 12px;
          background-size: 13px;
  
        }`;
      const selectActions = `.${this.class}__select:hover {
          border: 1px solid #c7c7c7;
          cursor: pointer;
          }
        .${this.class}__select:active, .${this.class}__select:focus  {
          outline: none;
          border: 1px solid #5395e1;
        }`;

      const checkbox = `.${this.class}__input_checkbox {
          position: absolute;
          z-index: -1;
          opacity: 0;
        }
        .${this.class}__input_checkbox+label {
          display: inline-flex;
          align-items: center;
          user-select: none;
          color: #000;
          width: 100%;
        }
        .${this.class}__input_checkbox+label:hover {
          background-color: #f2f3f5;
          cursor: pointer;
        }
        .${this.class}__input_checkbox+label::before {
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
        .${this.class}__input_checkbox:checked+label::before {
          border-color: #3f8ae0;
          background-color: #3f8ae0;
          background-image: url("data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c3ZnanM9Imh0dHA6Ly9zdmdqcy5jb20vc3ZnanMiIHZlcnNpb249IjEuMSIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiIHg9IjAiIHk9IjAiIHZpZXdCb3g9IjAgMCAyNCAyNCIgc3R5bGU9ImVuYWJsZS1iYWNrZ3JvdW5kOm5ldyAwIDAgNTEyIDUxMiIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgY2xhc3M9IiI+PGc+PGcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJtOS43MDcgMTkuMTIxYy0uMTg3LjE4OC0uNDQyLjI5My0uNzA3LjI5M3MtLjUyLS4xMDUtLjcwNy0uMjkzbC01LjY0Ni01LjY0N2MtLjU4Ni0uNTg2LS41ODYtMS41MzYgMC0yLjEyMWwuNzA3LS43MDdjLjU4Ni0uNTg2IDEuNTM1LS41ODYgMi4xMjEgMGwzLjUyNSAzLjUyNSA5LjUyNS05LjUyNWMuNTg2LS41ODYgMS41MzYtLjU4NiAyLjEyMSAwbC43MDcuNzA3Yy41ODYuNTg2LjU4NiAxLjUzNiAwIDIuMTIxeiIgZmlsbD0iI2ZmZmZmZiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIgc3R5bGU9IiIgY2xhc3M9IiIvPjwvZz48L2c+PC9zdmc+Cg==");
        }`;

      const radio = `.${this.class}__input_radio {
          position: absolute;
          z-index: -1;
          opacity: 0;
        }
        .${this.class}__input_radio+label {
          display: inline-flex;
          align-items: center;
          user-select: none;
          color: #000;
          cursor: pointer;
          margin-right: 10px;
        }
        .${this.class}__input_radio+label::before {
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
        .${this.class}__input_radio:checked+label::before {
          transform: scale(1.1);
          border-color: #3f8ae0;
          background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA1MTIgNTEyIj4KICA8ZGVmcy8+CiAgPHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSIjM2Y4YWUwIiBkPSJNMjU2IDBDMTE1LjM5IDAgMCAxMTUuMzkgMCAyNTZzMTE1LjM5IDI1NiAyNTYgMjU2IDI1Ni0xMTUuMzkgMjU2LTI1NlMzOTYuNjEgMCAyNTYgMHoiIGRhdGEtb3JpZ2luYWw9IiMwMDAwMDAiLz4KPC9zdmc+Cg==");
        }`;

      const date = `.${this.class}__input_date {
        font-family: Roboto;
        }
        .${this.class}__input_date::-webkit-calendar-picker-indicator {
        color: rgba(0, 0, 0, 0);
        opacity: 1;
        background: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NTEuODUgNDUxLjg1Ij4KICA8ZGVmcy8+CiAgPHBhdGggeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSIjOTlhMmFkIiBkPSJNMjI1LjkyIDM1NC43Yy04LjEgMC0xNi4yLTMuMDktMjIuMzctOS4yNkw5LjI3IDE1MS4xNmEzMS42NCAzMS42NCAwIDExNDQuNzUtNDQuNzVsMTcxLjkgMTcxLjkxIDE3MS45LTE3MS45YTMxLjY0IDMxLjY0IDAgMDE0NC43NSA0NC43NEwyNDguMyAzNDUuNDVhMzEuNTUgMzEuNTUgMCAwMS0yMi4zNyA5LjI2eiIgZGF0YS1vcmlnaW5hbD0iIzAwMDAwMCIvPgo8L3N2Zz4K") no-repeat;
        width: 10px;
        height: 10px;
        display: block;
        border-width: thin;
        cursor: pointer;
        }`;

      const button = `.${this.class}__button {
          border: none;
          border-radius: 5px;
          padding: 10px 20px;
          cursor: pointer;
          font-weight: 500;
          font-size: 14px;
          transition: filter 0.1s ease-in;
        }
        .${this.class}__button:hover {
          filter: brightness(95%);
        }
        .${this.class}__button_disabled {
          opacity: 0.5;
        }`;

      const primaryButton = `.${this.class}__button[type='submit'] {
          background-color: #3f8ae0;
          color: #fff;
        }`;

      const secondaryButton = `.${this.class}__button[type='reset'] {
          background-color: #f2f3f5;
          color: #3f8ae0;
        }`;

      const textarea = `.${this.class}__input_textarea {
   
        }`;

      const fieldset = `.${this.class}__fieldset {
          border: none;
        }`;

      const span = `.${this.class}__span {
          font-size: 12px;
          color: red;
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
        fieldset,
        span,
        div,
        date,
      };
    };
    const _createStyleTextNodes = (arr, objToAppend) => {
      for (let style in arr) {
        const text = document.createTextNode(arr[style]);
        objToAppend.appendChild(text);
      }
    };

    const styleElement = _createStyleElement();
    const styleSheet = _generateStyleSheet();
    _createStyleTextNodes(styleSheet, styleElement);
  }

  formInputsHandler(form) {
    const ERROR_MESSAGES = {
      empty: "Это обязательное поле",
      tooShort: "Не менее 2-х символов",
      tooLong: "Не более 30 символов",
      wrongEmail: "Введите действующий e-mail",
      wrongTel: "Введите номер телефона в формате +7(XXX)XXX-XX-XX",
      wrongFormat: "Неверный формат вводимых данных",
    };
    let userdata = {};
    const _setInputsValuesDependsInType = (input) => {
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

    const _setInitialValues = (arr) => {
      arr.forEach((input) => {
        _setInputsValuesDependsInType(input);
      });
    };

    const _inputsHandler = (e) => {
      const input = e.target;
      _setInputsValuesDependsInType(input);
    };
    const _submitHandler = (e) => {
      console.log("final data to send:", userdata);
    };

    const _formValidator = () => {
      const _setSpanErrorText = (span, message) => {
        span.textContent = message;
      };

      const setErrorMessage = (target, errorMessages) => {
        let span = "";
        const validity = target.validity;
        if (target.type === "radio") {
          span = form.querySelector(`span[data-id=${target.name}]`);
        } else {
          span = form.querySelector(`span[data-id=${target.id}]`);
        }
        if (validity !== undefined) {
          if (
            target.type === "checkbox" &&
            target.required &&
            !target.checked
          ) {
            _setSpanErrorText(span, errorMessages.empty);
            return;
          }
          if (validity.valueMissing) {
            _setSpanErrorText(span, errorMessages.empty);
            return;
          }
          if (validity.tooShort) {
            _setSpanErrorText(span, errorMessages.tooShort);
            return;
          }
          if (validity.tooLong) {
            _setSpanErrorText(span, errorMessages.tooLong);
            return;
          }
          if (validity.patternMismatch || validity.typeMismatch) {
            switch (target.type) {
              case "email":
                _setSpanErrorText(span, errorMessages.wrongEmail);
                break;
              case "tel":
                _setSpanErrorText(span, errorMessages.wrongTel);
                break;
              default:
                _setSpanErrorText(span, errorMessages.wrongFormat);
            }
            return;
          }
          if (validity.valid) {
            _setSpanErrorText(span, "");
            return;
          }
        } else {
          _setSpanErrorText(span, errorMessages.validationMessage);
          return;
        }
      };

      const isFormValid = () => {
        const isValid = form.checkValidity();
        return isValid;
      };

      const setSubmitButtonState = (button, isValid) => {
        if (!isValid) {
          button.setAttribute("disabled", true);
          button.classList.add(`${this.class}__button_disabled`);
        } else {
          button.removeAttribute("disabled");
          button.classList.remove(`${this.class}__button_disabled`);
        }
      };

      return { setErrorMessage, isFormValid, setSubmitButtonState };
    };

    const inputsArr = form.querySelectorAll("input, select");
    _setInitialValues(inputsArr);
    const button = form.querySelector('button[type="submit"]');
    const { setErrorMessage, isFormValid, setSubmitButtonState } =
      _formValidator();

    inputsArr.forEach((input) => {
      input.addEventListener("input", (e) => {
        _inputsHandler(e);
        setErrorMessage(e.target, ERROR_MESSAGES);
        const isValid = isFormValid();
        setSubmitButtonState(button, isValid);
      });
    });

    button.addEventListener("click", (e) => {
      inputsArr.forEach((input) => {
        setErrorMessage(input, ERROR_MESSAGES);
        const isValid = isFormValid();
        setSubmitButtonState(button, isValid);
      });
    });

    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const isValid = isFormValid();
      setSubmitButtonState(button, isValid);
      _submitHandler(e);
      form.reset();
    });
  }
}

const marsForm = new FormCreator(data);

const form = marsForm.formMarkupCreator();
marsForm.stylesCreator(form);
marsForm.formInputsHandler(form);

document.body.appendChild(form);
