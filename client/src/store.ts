import { defaultUser } from "./defaults";

const store = {
    cpu: {
        refresh: {
            value: 5,
            min: 1,
            max: 5,
            step: 1
        },
        listeners: new Set as Set<() => void>
    },
    user: defaultUser
};

function updateCpuRefresh(newValue: number) {
    store.cpu = { ...store.cpu, refresh: { ...store.cpu.refresh, value: newValue }};
    store.cpu.listeners.forEach(l => l());
}

function addCpuListener(listener: () => void) {
    store.cpu.listeners.add(listener);
}

function removeCpuListener(listener: () => void) {
    store.cpu.listeners.delete(listener);
}

const cpuActions = {
    updateCpuRefresh,
    addCpuListener,
    removeCpuListener
}

export { store, cpuActions };
