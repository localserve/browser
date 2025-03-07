import { Children, ReactNode } from "react";

function Layout({ children }: { children: ReactNode | ReactNode[] }) {
    const [thin, thick] = Children.toArray(children);
    return <div className="flex layout">
        <div className="thin">{thin}</div>
        <div className="thick">{thick}</div>
    </div>
}

function Flex({ children }: { children: ReactNode | ReactNode[] }) {
    return <div className="flex">
        {children}
    </div>
}

function VFlex({ children }: { children: ReactNode | ReactNode[] }) {
    return <div className="flex vflex">
        {children}
    </div>
}

export { Layout, Flex, VFlex };
