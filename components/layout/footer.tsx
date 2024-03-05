"use client";

import { Box, Divider } from "@mui/material";

const Footer = ({}) => {
    return (
        <Box
            component="footer"
            sx={{
                backgroundColor: "#ffffff22",
                gridColumn: "span 2",
                height: "100%",
            }}
        >
            <Divider />
            This is the Footer
        </Box>
    );
};

export default Footer;
