window.onload = () => {
    let allSelect = document.querySelectorAll("select");
    let fontFamilySelect = document.querySelector("#font");
    let colorsSelect = document.querySelector("#colors");
    let fontSizeSelect = document.querySelector("#font-size");

    function createSelectValues(from, to) {
        let smallestFont = from;
        let highestFont = to;
        for (; highestFont >= smallestFont; smallestFont++) {
            let option = document.createElement("option");
            option.value = smallestFont + "px";
            option.text = smallestFont;
            fontSizeSelect.add(option);
        }
    }

    function changeProp() {
        fontFamilySelect.onchange = (event) => {
            document.body.style.fontFamily = `'${event.target.value}', sans-serif`;
            addToStorage("fontFamily", event.target.value);
        };

        colorsSelect.onchange = (event) => {
            document.body.style.color = event.target.value;
            addToStorage("color", event.target.value);
        };

        fontSizeSelect.onchange = (event) => {
            document.body.style.fontSize = event.target.value;
            addToStorage("fontSize", event.target.value);
        };
    }

    function addToStorage(style, value) {
        window.localStorage.setItem(style, value);
    }

    function updateValueOnReload(...props) {
        for (let i = 0; i < props.length; i++) {
            if (!window.localStorage.getItem(props[i])) {
                document.body.style[props[i]] = allSelect[i][0].value;
                continue;
            }
            document.body.style[props[i]] = window.localStorage.getItem(
                props[i]
            );
            function setSelectValue() {
                for (let j = 0; j < allSelect[i].length; j++) {
                    if (
                        allSelect[i][j].value ==
                        window.localStorage.getItem(props[i])
                    ) {
                        allSelect[i].value = allSelect[i][j].value;
                    }
                }
            }
            setSelectValue();
        }
    }
    createSelectValues(16, 30);
    updateValueOnReload("fontFamily", "color", "fontSize");
    changeProp();
};
