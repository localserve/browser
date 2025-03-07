import { ReactNode, useState } from "react";


function SideCollapsible({ children, title }: { children: ReactNode | ReactNode[], title: string }) {
    const [collapsed, setCollapsed] = useState(false);
    const klass = collapsed ? "collapsed" : "";
    return <div className={`collapsible`}>
        <div className="trigger" onClick={() => setCollapsed(!collapsed)}>
            <div className="title button">{title}</div>
        </div>
        {!collapsed && <div className={klass}>
            {children}
        </div>
        }
    </div>
}

export { SideCollapsible }
