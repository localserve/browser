import { useEffect, useState } from "react";
import { UserT } from "../types";
import { fetchUserMachine } from "../net/user.api";

function User({ initialUser }: { initialUser: UserT }) {
    const [user, setUser] = useState<UserT>(initialUser);
    useEffect(() => {
        fetchUserMachine().then(setUser);
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
