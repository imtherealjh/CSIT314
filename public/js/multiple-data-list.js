document.addEventListener("DOMContentLoaded", function () {
    const separator = ",";
    for (const input of document.getElementsByTagName("input")) {
        if (!input.multiple) {
            continue;
        }

        if (input.list instanceof HTMLDataListElement) {
            const optionsValues = Array.from(input.list.options).map(opt => opt.value);
            let valueCount = input.value.split(separator).length;

            input.addEventListener("input", () => {
                const currentValueCount = input.value.split(separator).length;

                if (valueCount !== currentValueCount) {
                    const lsIndex = input.value.lastIndexOf(separator);
                    const str = lsIndex !== -1 ? input.value.substr(0, lsIndex) + separator : "";
                    filldatalist(input, optionsValues, str);
                    valueCount = currentValueCount;
                }
            });
        }
    }

    function filldatalist(input, optionValues, optionPrefix) {
        const list = input.list;
        if (list && optionValues.length > 0) {
            list.innerHTML = "";

            const usedOptions = optionPrefix.split(separator).map(value => value.trim());

            for (const optionsValue of optionValues) {
                if (usedOptions.indexOf(optionsValue) < 0) { // Skip used values
                    const option = document.createElement("option");
                    option.value = optionPrefix + optionsValue;
                    list.append(option);
                }
            }
        }
    }
  });