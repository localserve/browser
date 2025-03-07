import { useEffect, useState } from "react";
import { cpuActions, store } from "../store";
import { Slider } from "./slider";
import { Flex, VFlex } from "./layout";
import { defaultCPU } from "../defaults";
import { CPUT } from "../types";

let lastValue = defaultCPU;

try {
    if (localStorage.getItem('cpu.last_value')) {
        lastValue = JSON.parse(localStorage.getItem('cpu.last_value') || "{}");
    }
} catch (e) {
    console.error(e);
    lastValue = defaultCPU;
}

function CPU() {
    const cpuRefresh = store.cpu.refresh;
    const [cpu, set_cpu] = useState<CPUT>(lastValue);

    const [lastFetched, setLastFetched] = useState("never");
    const [error, setError] = useState<string | null>(null);

    const modelMap: Map<string, number> = cpu.machine
        .map((m): string => m.model)
        .reduce((a: Map<string, number>, c: string) => {
            a.set(c, (a.get(c) || 0) + 1);
            return a;
        }, new Map());

    const cpuModels = Array.from(modelMap.entries())
        .map(([model, count]) => ({ model, count }))
        .map((model, index) => <div key={`model-${index}`}>{`${model.count}x ${model.model}`}</div>);

    useEffect(() => {
        const interval = setInterval(() => {
            fetch("https://localhost:4420/cpu/usage", {
                method: "GET",
            }).then(response => response.json())
                .then(data => {
                    set_cpu(data);
                    setLastFetched(new Date().toLocaleString());
                    localStorage.setItem("cpu.last_value", JSON.stringify(data));
                })
                .catch((error) => {
                    console.error(error);
                    setError("ERROR: Cannot fetch /cpu/usage endpoint. Check logs!");
                });
        }, cpuRefresh.value * 1000);

        return () => clearInterval(interval);
    }, [cpuRefresh.value]);

    return (<section className="component cpu flex vflex">
        <div className="title secondary">cpu</div>

        <div>Last fetched: {lastFetched}</div>
        {error && <div>{error}</div>}

        <Slider
            name="cpu-refresh-rate"
            initialValue={cpuRefresh.value}
            min={cpuRefresh.min}
            max={cpuRefresh.max}
            step={cpuRefresh.step}
            onchange={(v: number) => cpuActions.updateCpuRefresh(v)}
            title="cpu refresh rate value"
        />
        <VFlex>
            <div className="subtitle secondary">app</div>
            <Flex>
                <div><div>User</div><div>{cpu.app.user}</div></div>
                <div ><div>System</div><div>{cpu.app.system}</div></div>
            </Flex>
        </VFlex>
        <VFlex>
            <div className="subtitle secondary">machine</div>
            <div>
                {cpuModels}
            </div>
            {cpu.machine.map((machine, index) => {
                return <VFlex key={index}>
                    <VFlex>
                        <Flex>
                            <div>
                                <div>Speed</div><div>{machine.speed}</div>
                            </div>
                            <div>
                                <div>Times</div>
                                <Flex>
                                    <div><div>user</div><div>{machine.times.user}</div></div>
                                    <div><div>sys</div><div>{machine.times.sys}</div></div>
                                    <div><div>idle</div><div>{machine.times.idle}</div></div>
                                    <div><div>nice</div><div>{machine.times.nice}</div></div>
                                    <div><div>irq</div><div>{machine.times.irq}</div></div>
                                </Flex>
                            </div>
                        </Flex>
                    </VFlex>
                </VFlex>
            })}
        </VFlex>
    </section>);
}

export { CPU }
