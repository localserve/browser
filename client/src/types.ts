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

export type { UserT, EnvT, DockerT, SliderT, MachineT, AppT, CPUT, DirT }
