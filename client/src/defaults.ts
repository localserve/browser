import { CPUT, DatabaseT, DirT, DockerContainerT, DockerImageT, DockerT, EnvT, UserT } from "./types";

const defaultCPU: CPUT = {
    app: { user: 1, system: 1 }, machine: [
        {
            model: '11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz',
            speed: 929,
            times: { user: 503240, nice: 12010, sys: 134200, idle: 9438030, irq: 0 }
        },
        {
            model: '11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz',
            speed: 2786,
            times: { user: 535500, nice: 9360, sys: 148120, idle: 11222890, irq: 0 }
        },
        {
            model: '11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz',
            speed: 2425,
            times: { user: 470900, nice: 9980, sys: 142790, idle: 11265460, irq: 0 }
        },
        {
            model: '11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz',
            speed: 400,
            times: { user: 520890, nice: 10500, sys: 139960, idle: 11266880, irq: 0 }
        },
        {
            model: '11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz',
            speed: 490,
            times: { user: 512440, nice: 11450, sys: 131230, idle: 11274320, irq: 0 }
        },
        {
            model: '11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz',
            speed: 2500,
            times: { user: 510550, nice: 11110, sys: 154070, idle: 11230180, irq: 0 }
        },
        {
            model: '11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz',
            speed: 3084,
            times: { user: 546430, nice: 9810, sys: 148840, idle: 11116000, irq: 0 }
        },
        {
            model: '11th Gen Intel(R) Core(TM) i7-1165G7 @ 2.80GHz',
            speed: 2333,
            times: { user: 516670, nice: 10080, sys: 144990, idle: 11261740, irq: 0 }
        }
    ]
};

const defaultUser: UserT = {
    uid: 1000,
    gid: 1000,
    username: 'user',
    homedir: '/home/user',
    shell: '/usr/bin/zsh'
}

const defaultEnv: EnvT = {
    node: { node: "node" },
}

const defaultDocker: DockerT = {
    containers: "containers",
    error: null,
    images: "images",
    version: "version"
}

const defaultDir: DirT = {
    path: "",
    dirs: [],
    files: []
}


const defaultDockerContainer: DockerContainerT = {
    Command: '"/entrypoint.sh"',
    CreatedAt: "2025-02-05 16:23:00 +0530 IST",
    ID: "15236a4063f1",
    Image: "plantuml/plantuml-server:jetty",
    Labels: "org.opencontainers.image.created=2024-11-18T18:08:45.552Z,org.opencontainers.image.description=PlantUML Online Server,org.opencontainers.image.licenses=GPL-3.0,org.opencontainers.image.title=plantuml-server,org.opencontainers.image.url=https://github.com/plantuml/plantuml-server,org.opencontainers.image.ref.name=ubuntu,org.opencontainers.image.revision=91b372f3021628fc3adc5d4dd7084facddd53f7b,org.opencontainers.image.source=https://github.com/plantuml/plantuml-server,org.opencontainers.image.version=v1.2024.8",
    LocalVolumes: "1",
    Mounts: "47afed0abe2050…",
    Names: "plantuml",
    Networks: "bridge",
    Ports: "0.0.0.0:36363->3636/tcp, [::]:36363->3636/tcp",
    RunningFor: "4 weeks ago",
    Size: "0B",
    State: "running",
    Status: "Up About an hour",
}

const defaultDockerImage: DockerImageT = {
    Containers: 'N/A',
    CreatedAt: '2024-11-19 00:27:51 +0530 IST',
    CreatedSince: '3 months ago',
    Digest: '<none>',
    ID: 'c0ce8bc92c51',
    Repository: 'plantuml/plantuml-server',
    SharedSize: 'N/A',
    Size: '486MB',
    Tag: 'jetty',
    UniqueSize: 'N/A',
    VirtualSize: '485.7MB'
}

const defaultDatabase: DatabaseT = {
    name: "",
    host: "",
    port: "",
    user: "",
    password: "",
    isConnected: false,
    error: false,
    errmsg: "",
}


export {
    defaultCPU,
    defaultDatabase,
    defaultDir,
    defaultDocker,
    defaultDockerContainer,
    defaultDockerImage,
    defaultEnv,
    defaultUser,
};
