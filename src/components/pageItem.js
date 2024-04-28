import React from "react";
import MiniDrawer from "./navbar";

export default function PageItem({ Page }) {
    return (
        <div>
            <MiniDrawer />
            <Page />
        </div>
    );
}
