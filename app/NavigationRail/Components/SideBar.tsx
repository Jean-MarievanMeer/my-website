import "app/app.css";

interface sideBarProps {
    mainDrawer: React.ReactNode;
    secondDrawer?: React.ReactNode|null;
}

const SideBar = ({ mainDrawer, secondDrawer = null , emptySecond}: sideBarProps & {emptySecond: ()=> void}) => {
    return (
        <>
            <nav className="navigation-rail" style={{width: secondDrawer ? "240px" : "60px",}} onMouseLeave={emptySecond}>
                <div className="first-drawer"
                >
                    <div className="nav-buttons-row">
                        {mainDrawer}
                    </div>
                </div>
                <div className="second-drawer">

                    {secondDrawer}

                </div>
            </nav>
        </>
    );
}

export default SideBar;