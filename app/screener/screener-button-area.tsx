import { useState } from "react";
import { selectedFeaturesFormStore, tableDataStore } from "./screener-store";
import { fetchStatusStore } from "../app.store";
import { Button } from "@mantine/core";

function CallButton(fetch: Function) {
    const [disabled, setDisabled] = useState(false);
    const removeResponse = tableDataStore((state) => state.removeResponse);
    const setLoading = fetchStatusStore((state) => state.setLoading);


    const valueChanged = selectedFeaturesFormStore((state) => state.valueChanged);
    const setValueChanged = selectedFeaturesFormStore((state) => state.setValueChanged);

    function call() {
        removeResponse();
        setValueChanged();
        setLoading();
        fetch();
        setDisabled(true);
        setTimeout(() => {
            setDisabled(false);
        }, 2000)
    }
    //
    return (
        <Button size="xs" className='call-button-color' variant='filled' onClick={() => call()} disabled={disabled || !valueChanged}>Run</Button>
    )
}

function ResetButton() {
    const reset = selectedFeaturesFormStore((state) => state.resetAll);
    return (
        <Button size="xs" className='reset-button-color' color="orange" onClick={() => reset()}>Reset</Button>
    )
}

export default function ScreenerButtonArea({ fetch }: { fetch: Function }) {
    return (
        <div className="flex flex-row justify-end gap-x-3 pr-3">
            {CallButton(fetch)}
            {ResetButton()}
        </div>
    )
}