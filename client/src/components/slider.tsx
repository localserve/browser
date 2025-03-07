import { ChangeEvent, useEffect, useState } from "react";
import { Flex } from "./layout";
import { SliderT } from "../types";

function Slider({ name, min, max, step, initialValue, onchange, title }: SliderT) {
    const [value, setValue] = useState(initialValue);

    const key = `slider-${name}`;
    useEffect(() => {
        if (localStorage.getItem(key)) {
            const newValue = Number(localStorage.getItem(key))
            setValue(newValue);
            onchange(newValue);
        } else {
            localStorage.setItem(key, value.toLocaleString());
        }
    }, [key, value, onchange]);

    function onChange(event: ChangeEvent<HTMLInputElement>) {
        const newValue = Number(event.target.value);
        onchange(newValue);
        setValue(newValue);
        localStorage.setItem(key, newValue.toLocaleString());
    }

    return <Flex>
        <div>{title}: {value}</div>
        <div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                onChange={onChange}
                value={value}
            />
        </div>
    </Flex>
}

export { Slider }
