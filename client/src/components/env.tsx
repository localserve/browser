import { useEffect, useState } from "react";
import { EnvT } from "../types";
import { Flex, VFlex } from "./layout";

function Env({ initialEnv }: { initialEnv: EnvT }) {
    const [nodeEnv, setNodeEnv] = useState<EnvT>(initialEnv);
    const browser: Record<string, string> = (Object.keys(window) as Array<keyof Window>)
        .filter((k: keyof Window) => typeof window[k] === "string" || typeof window[k] === "number" || typeof window[k] === "boolean")
        .reduce((a, c) => ({ ...a, [`${c}`]: window[c].toString() }), {});

    useEffect(() => {
        fetch("https://localhost:4420/env", { method: "GET" })
            .then(res => res.json())
            .then(data => setNodeEnv(data))
            .catch(console.error);
    }, []);

    return <section className="component env flex vflex">
        <div className="title secondary">env</div>
        <VFlex>
            <div>
                <div className="subtitle secondary">node</div>
                {
                    Object.keys(nodeEnv?.node)
                        .map((key: string, index: number) => {
                            return <Flex key={`env-node-${index}`}>
                                <div style={{ width: "300px", wordWrap: "break-word", textAlign: "right" }}>{key}</div>
                                <div style={{ maxWidth: "600px", wordWrap: "break-word", whiteSpace: "preserve" }}>
                                    {(nodeEnv.node)[key]}</div>
                            </Flex>
                        })
                }
            </div>
            <div>
                <div className="subtitle secondary">browser</div>
                {
                    Object.keys(browser)
                        .map((key: string, index: number) => {
                            return <Flex key={`env-browser-${index}`}>
                                <div style={{ width: "300px", wordWrap: "break-word", textAlign: "right" }}>{key}</div>
                                <div style={{ maxWidth: "600px", wordWrap: "break-word", whiteSpace: "preserve" }}>
                                    {browser[key].length === 0 ? "<null>" : browser[key]}</div>
                            </Flex>
                        })
                }
            </div>
        </VFlex>
    </section>
}

export { Env };
