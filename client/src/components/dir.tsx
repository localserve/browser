import { useEffect, useState } from "react"
import { DirT } from "../types";
import { Flex, VFlex } from "./layout";
import { EP_DIR, PORT, SERVER } from "../net/constants";

function Dir({ initialDir }: { initialDir: DirT }) {
    const [dir, setDir] = useState<DirT>(initialDir);
    const [path, setPath] = useState<string>(initialDir.path);
    const [error, setError] = useState<string | null>(null);
    const [editingPath, setEditingPath] = useState(false);

    function fetchWithPath(p: string) {
        fetch(`${SERVER}:${PORT}/${EP_DIR}`,
            {
                method: "POST",
                body: JSON.stringify({ path: p }),
                headers: { "Content-Type": "application/json" },
            }
        )
            .then(res => res.json())
            .then(data => {
                if (data.error === null) {
                    delete data.error;
                    setDir(data);
                } else {
                    setError(`ERROR: ${data.error.message}`);
                }
            }).catch(error => {
                console.error(error);
                setError("ERROR: network error");
            });
    }

    useEffect(() => {
        if (path.length === 0) {
            return;
        }
        fetchWithPath(path);
    }, [path]);

    return <>
        <VFlex>
            <div className="title secondary">Directory</div>
            <div>
                <div>
                    {editingPath && <div>Path:
                        <input
                            type="text"
                            onChange={e => setPath(e.target.value)}
                            value={path}
                            name="dir-path"
                            id="dir-path"
                            onBlur={e => { fetchWithPath(e.target.value); setEditingPath(false); }}
                            onKeyDown={e => e.code === "13" && fetchWithPath(path)}
                        />
                    </div>
                    }
                    {!editingPath && <div>
                        <div onClick={() => setEditingPath(true)}>Edit</div>
                        {
                            path.split("/")
                                .filter(i => !!i)
                                .map((part, index) => <button onClick={() => setPath("/" + path.split("/").filter(i => !!i).slice(0, index + 1).join("/"))}
                                    key={`dir-part-${index}`}><span>/</span><span>{part}</span></button>)
                        }
                    </div>}
                </div>
            </div>
            {error && <div className="error">{error}</div>}
            <div>
                <div className="subtitle">directories</div>
                <Flex>
                    {dir.dirs.map((d, index) => {
                        return <button style={{ minWidth: "10vw", textAlign: "right" }} key={`dir-dir-${index}`} onClick={() => setPath(path + "/" + d)}>
                            {d}
                        </button>
                    })}
                </Flex>
            </div>
            <div>
                <div className="subtitle">files</div>
                <Flex>
                    {
                        dir.files.map((f, index) => {
                            return <div style={{ minWidth: "10vw", textAlign: "right" }} key={`dir-file-${index}`}>
                                <a href={path + "/" + f} target="_blank">{f}</a>
                            </div>
                        })
                    }
                </Flex>
            </div>

        </VFlex>
    </>
}

export { Dir }
