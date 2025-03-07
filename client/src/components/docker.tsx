import { useEffect, useState } from "react";
import { DockerT } from "../types";
import { Flex, VFlex } from "./layout";

function Docker({ initialDocker }: { initialDocker: DockerT }) {
    const [docker, setDocker] = useState<DockerT>(initialDocker);

    const [error, setError] = useState<string| null>(null);

    useEffect(() => {
        fetch("https://localhost:4420/docker", { method: "GET" })
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
    }, []);

    return <section className="component docker flex vflex">
        <div className="title secondary">docker</div>
        <>
            {error && <div>{error}</div>}

            {!error && <VFlex>
                <div>
                    {
                        Object.keys(docker)
                            .filter(k => k !== "error")
                            .map((key: string, index: number) => {
                                return <div key={`docker-${index}`} style={{ marginBottom: "1vh" }}>
                                    <Flex>
                                        <div style={{ width: "100px", wordWrap: "break-word", textAlign: "right" }}>{key}</div>
                                        <div style={{ wordWrap: "break-word", whiteSpace: "preserve" }}>
                                            {docker[key as keyof DockerT]}
                                        </div>
                                    </Flex>
                                </div>
                            })
                    }
                </div>
            </VFlex>
            }
        </>

    </section>
}

export { Docker };
