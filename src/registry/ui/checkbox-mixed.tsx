import { useEffect, useRef, useState } from "react";

export default function CheckboxMixed() {
    const [checked, setChecked] = useState([true, false]);
    const parentRef = useRef<HTMLInputElement>(null);

    const allChecked = checked.every(Boolean);
    const isMixed = checked.some(Boolean) && !allChecked;

    useEffect(() => {
        if (parentRef.current) {
            parentRef.current.indeterminate = isMixed;
        }
    }, [isMixed]);

    return (
        <div className="d-f fd-c g-3">
            <div className="d-f ai-c g-2">
                <input
                    type="checkbox"
                    id="parent-checkbox"
                    className="d-4 ac-slate"
                    ref={parentRef}
                    checked={allChecked}
                    onChange={(e) => setChecked([e.target.checked, e.target.checked])}
                    // The aria-checked="mixed" attribute is used specifically for tri-state checkboxes.
                    aria-checked={isMixed ? "mixed" : allChecked}
                />
                <label htmlFor="parent-checkbox" className="fs-sm fw-600 tc-slate">
                    Install Options
                </label>
            </div>
            <div className="d-f fd-c g-2 ml-5">
                <div className="d-f ai-c g-2">
                    <input
                        type="checkbox"
                        id="child-1"
                        className="d-4 ac-slate"
                        checked={checked[0]}
                        onChange={(e) => setChecked([e.target.checked, checked[1]])}
                    />
                    <label htmlFor="child-1" className="fs-sm tc-slate">
                        Documentation
                    </label>
                </div>
                <div className="d-f ai-c g-2">
                    <input
                        type="checkbox"
                        id="child-2"
                        className="d-4 ac-slate"
                        checked={checked[1]}
                        onChange={(e) => setChecked([checked[0], e.target.checked])}
                    />
                    <label htmlFor="child-2" className="fs-sm tc-slate">
                        Source Code
                    </label>
                </div>
            </div>
        </div>
    );
}
