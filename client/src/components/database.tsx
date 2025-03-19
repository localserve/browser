import { useState } from "react"
import { DatabaseT } from "../types"
import { Flex, VFlex } from "./layout";
import { defaultDatabase } from "../defaults";

function Database() {
    // const [db, setDB] = useState(initialDatabase);
    const [list, setList] = useState<DatabaseT[]>([]);
    const [draft, setDraft] = useState<boolean>(false);

    function onSaveDraftDB(db: DatabaseT) {
        setList([...list, db]);
        setDraft(false);
    }

    return <VFlex>
        <div className="title secondary">Database</div>
        <div>
            <button onClick={_ => setDraft(true)}>create database</button>
        </div>
        <div>{draft && <DatabaseForm onsave={onSaveDraftDB} />} </div>
        <VFlex>
            {list.map((db, dbIndex) => <VFlex key={`database-${dbIndex}`}>
                <Flex>
                    <div style={{ width: "100px", wordWrap: "break-word", textAlign: "right" }}>&nbsp;</div>
                    <div className="subtitle secondary" style={{ width: "500px", wordWrap: "break-word", whiteSpace: "preserve" }}>{db.name}</div>
                </Flex>
                <Flex>
                    <div style={{ width: "100px", wordWrap: "break-word", textAlign: "right" }}>HOST</div>
                    <div style={{ width: "500px", wordWrap: "break-word", whiteSpace: "preserve" }}>{db.host}</div>
                </Flex>
                <Flex>
                    <div style={{ width: "100px", wordWrap: "break-word", textAlign: "right" }}>PORT</div>
                    <div style={{ width: "500px", wordWrap: "break-word", whiteSpace: "preserve" }}>{db.port}</div>
                </Flex>
                <Flex>
                    <div style={{ width: "100px", wordWrap: "break-word", textAlign: "right" }}>USER</div>
                    <div style={{ width: "500px", wordWrap: "break-word", whiteSpace: "preserve" }}>{db.user}</div>
                </Flex>
                <Flex>
                    <div style={{ width: "100px", wordWrap: "break-word", textAlign: "right" }}>PASSWORD</div>
                    <div style={{ width: "500px", wordWrap: "break-word", whiteSpace: "preserve" }}>{Array(db.password.length).fill("*").join('')}</div>
                </Flex>
            </VFlex>
            )
            }
        </VFlex>
    </VFlex>
}

function DatabaseForm({ onsave }: { onsave: (db: DatabaseT) => void }) {
    const [db, setdb] = useState<DatabaseT>(defaultDatabase);

    function onSave() {
        // check db is valid
        onsave(db);
    }

    return <VFlex>
        <div>Enter details for database</div>
        <VFlex>
            <div>
                <label htmlFor="db_name">
                    Database Name:
                    <input
                        id="db_name"
                        value={db.name}
                        placeholder="database name"
                        onChange={e => setdb({ ...db, name: e.target.value })} />
                </label>
            </div>
            <div>
                <label htmlFor="db_host">
                    Database Host:
                    <input
                        id="db_host"
                        value={db.host}
                        placeholder="database host"
                        onChange={e => setdb({ ...db, host: e.target.value })} />
                </label>
            </div>
            <div>
                <label htmlFor="db_port">
                    Database Port:
                    <input
                        id="db_port"
                        value={db.port}
                        placeholder="database port"
                        onChange={e => setdb({ ...db, port: e.target.value })} />
                </label>
            </div>
            <div>
                <label htmlFor="db_user">
                    Database User:
                    <input
                        id="db_user"
                        value={db.user}
                        placeholder="database user"
                        onChange={e => setdb({ ...db, user: e.target.value })} />
                </label>
            </div>
            <div>
                <label htmlFor="db_password">
                    Database Password:
                    <input
                        type="password"
                        id="db_password"
                        value={db.password}
                        placeholder="database password"
                        onChange={e => setdb({ ...db, password: e.target.value })} />
                </label>
            </div>
        </VFlex>
        <div><button onClick={_ => onSave()}>Save</button></div>
    </VFlex>
}

export { Database }