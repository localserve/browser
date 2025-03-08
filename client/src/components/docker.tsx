import { useEffect, useState } from "react";
import { DockerContainerT, DockerImageT, DockerJsonT, DockerT } from "../types";
import { Flex, VFlex } from "./layout";

function Docker({ initialDocker }: { initialDocker: DockerT }) {
    const [docker, setDocker] = useState<DockerT | DockerJsonT>(initialDocker);
    const [format, setFormat] = useState<"json" | "text">("text");
    const [error, setError] = useState<string | null>(null);

    function updateFormat(value: "json" | "text") {
        setFormat(value);
        setError(null);
    }
    useEffect(() => {
        if (format === "json") {
            fetch("https://localhost:4420/docker",
                {
                    method: "POST",
                    body: JSON.stringify({ format: "json" }),
                    headers: { "Content-Type": "application/json" },
                }
            )
                .then(res => res.json())
                .then(data => {
                    if (!data?.error) {
                        console.log({ data });
                        setDocker(data);
                    } else {
                        setError(`ERROR: ${data.error}`);
                    }
                })
                .catch(error => {
                    console.error(error);
                    setError("ERROR: cannot fetch /docker endpoint. Check logs!");
                });
        } else if (format === "text") {
            fetch("https://localhost:4420/docker",
                {
                    method: "GET",
                }
            )
                .then(res => res.json())
                .then(data => {
                    if (!data?.error) {
                        setDocker(data);
                    } else {
                        setError(`ERROR: ${data.error}`);
                    }
                })
                .catch(error => {
                    console.error(error);
                    setError("ERROR: cannot fetch /docker endpoint. Check logs!");
                });
        }
    }, [format]);

    return <section className="component docker">
        <VFlex>
            <div className="title secondary">docker</div>
            <div>
                <div>Select format</div>
                <div>
                    <button onClick={() => updateFormat("text")}>text</button>
                    <button onClick={() => updateFormat("json")}>json</button>
                </div>
            </div>
            <div>{error && <div>{error}</div>}</div>
            {(!error && format === "text") &&
                <div className="flex vflex mv4">
                    {
                        (Object.keys(docker as DockerT) as Array<keyof DockerT>)
                            .filter(k => k !== "error")
                            .map((key: keyof DockerT, index: number) => {
                                return <div key={`docker-${index}`} style={{ marginBottom: "1vh" }}>
                                    <Flex>
                                        <div style={{ width: "100px", wordWrap: "break-word", textAlign: "right" }}>{key}</div>
                                        <div style={{ wordWrap: "break-word", whiteSpace: "preserve" }}>
                                            {typeof docker[key] === "string" && (docker as DockerT)[key as keyof DockerT]}
                                        </div>
                                    </Flex>
                                </div>
                            })
                    }
                </div>
            }
            {(!error && format === "json") &&
                <div className="flex vflex mv4">
                    <Flex>
                        <div style={{ width: "100px", wordWrap: "break-word", textAlign: "right" }}>version</div>
                        <div style={{ wordWrap: "break-word", whiteSpace: "preserve" }}>
                            {(docker as DockerJsonT)["version"]}
                        </div>
                    </Flex>
                    <Flex>
                        <div style={{ width: "100px", wordWrap: "break-word", textAlign: "right" }}>images</div>
                        <div style={{ width: "calc(80vw - 100px - 2vw)", wordWrap: "break-word", whiteSpace: "preserve" }}>
                            <div className="flex mv4">
                                {typeof docker["images"] !== "string" &&
                                    (((docker as DockerJsonT)["images"]) as DockerImageT[])
                                        .map((image: DockerImageT, index) => {
                                            return <div className="flex vflex m0" key={`docker-image-${index}`}>
                                                {
                                                    Object.entries(image).map((v: [string, string], imageIndex: number) => {
                                                        return <Flex key={`docker-image-${index}-attr-${imageIndex}`}>
                                                            <div style={{ width: "100px", wordWrap: "break-word", textAlign: "right" }}>{v[0]}</div>
                                                            <div style={{ width: "500px", wordWrap: "break-word", whiteSpace: "preserve" }}>{v[1]}</div>
                                                        </Flex>
                                                    })
                                                }
                                            </div>
                                        })
                                }
                            </div>
                        </div>
                    </Flex>

                    <Flex>
                        <div style={{ width: "100px", wordWrap: "break-word", textAlign: "right" }}>containers</div>
                        <div style={{ width: "calc(80vw - 100px - 2vw)", wordWrap: "break-word", whiteSpace: "preserve" }}>
                            <div className="flex mv4">
                                {typeof docker["containers"] !== "string" &&
                                    (((docker as DockerJsonT)["containers"]) as DockerContainerT[])
                                        .map((container: DockerContainerT, index) => {
                                            return <div className="flex vflex m0" key={`docker-container-${index}`}>
                                                {
                                                    Object.entries(container).filter((v:[string, string]) => v[0].length > 0 && v[1].length > 0).map((v: [string, string], containerIndex: number) => {
                                                        return <Flex key={`docker-container-${index}-attr-${containerIndex}`}>
                                                            <div style={{ width: "100px", wordWrap: "break-word", textAlign: "right" }}>{v[0]}</div>
                                                            <div style={{ width: "500px", wordWrap: "break-word", whiteSpace: "preserve" }}>
                                                                {v[1] === "running" && v[0] === "State" && <span className="dot green"></span>}
                                                                {/* {v[1] === "exited" && v[0] === "State" && <span className="dot red"></span>} */}
                                                                {v[1]}
                                                                </div>
                                                        </Flex>
                                                    })
                                                }
                                            </div>
                                        })
                                }

                            </div>
                        </div>
                    </Flex>
                </div>
            }
        </VFlex>
    </section>
}

export { Docker };
