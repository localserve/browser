import { useEffect, useState } from "react";
import { UserT } from "../types";

function User({ initialUser }: { initialUser: UserT }) {
    const [user, setUser] = useState<UserT>(initialUser);
    useEffect(() => {
        fetch("https://localhost:4420/user/machine", { method: "GET" })
            .then(res => res.json())
            .then(data => setUser(data))
            .catch(console.error);
    }, []);

    return <section className="component user flex vflex">
        <div className="title secondary">user</div>
        <div className="flex vflex m0">
            <div className="flex"><div>uid:gid</div><div>{user.uid}:{user.gid}</div></div>
            <div className="flex"><div>username</div><div>{user.username}</div></div>
            <div className="flex"><div>homedir</div><div>{user.homedir}</div></div>
            <div className="flex"><div>shell</div><div>{user.shell}</div></div>
        </div>
    </section>
}

export { User };
