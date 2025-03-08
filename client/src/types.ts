type UserT = {
    uid: number;
    gid: number;
    username: string;
    homedir: string;
    shell: string;
};

type EnvT = {
    node: Record<string, string>;
}

type DockerT = {
    version: string;
    images: string;
    containers: string;
    error: null | string;
}

type DockerJsonT = {
    version: string;
    images: Array<DockerImageT>;
    containers: Array<DockerContainerT>;
    error: null | string;
}

type SliderT = {
    name: string;
    min: number;
    max: number;
    step: number;
    initialValue: number;
    onchange: (newValue: number) => void;
    title: string;
}

type MachineT = Array<{
    model: string;
    speed: number;
    times: {
        user: number;
        nice: number;
        sys: number;
        idle: number;
        irq: number;
    }
}>;

type AppT = {
    system: number;
    user: number;
};

type CPUT = {
    machine: MachineT;
    app: AppT;
};

type DirT = {
    path: string;
    files: string[];
    dirs: string[];
}

type DockerContainerT = {
    Command: string;
    CreatedAt: string;
    ID: string;
    Image: string;
    Labels: string;
    LocalVolumes: string;
    Mounts: string;
    Names: string;
    Networks: string;
    Ports: string;
    RunningFor: string;
    Size: string;
    State: string;
    Status: string;
}

type DockerImageT = {
    Containers: string;
    CreatedAt: string;
    CreatedSince: string;
    Digest: string;
    ID: string;
    Repository: string;
    SharedSize: string;
    Size: string;
    Tag: string;
    UniqueSize: string;
    VirtualSize: string;
}


export type { UserT, EnvT, DockerT, SliderT, MachineT, AppT, CPUT, DirT, DockerContainerT, DockerImageT, DockerJsonT }
