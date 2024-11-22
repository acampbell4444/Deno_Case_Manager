import React from "react";
import { SlideProps, Slide } from "@mui/material";

export const Transition = React.forwardRef(
    function Transition(props: SlideProps, ref: any) {
        return (
            <Slide
                direction="up"
                ref={ref}
                {...props}
                timeout={{ enter: 300, exit: 300 }}
                easing={{ enter: "ease-in-out", exit: "ease-in-out" }}
            />
        );
    },
);