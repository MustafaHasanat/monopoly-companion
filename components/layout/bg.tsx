const Background = () => {
    return (
        <svg viewBox="0 0 400 400">
            <defs>
                <pattern
                    id="bg_pattern"
                    width="100"
                    height="100"
                    patternUnits="userSpaceOnUse"
                >
                    <line
                        x1="35"
                        y1="35"
                        x2="65"
                        y2="65"
                        stroke="#0d47a1"
                        strokeWidth="6"
                        strokeLinecap="round"
                        opacity="0.75"
                    ></line>{" "}
                    <line
                        x1="35"
                        y1="65"
                        x2="65"
                        y2="35"
                        stroke="#0d47a1"
                        strokeWidth="6"
                        strokeLinecap="round"
                        opacity="0.75"
                    ></line>
                    <polygon
                        points="0,20 0,0, 20,0"
                        fill="#bbdefb"
                        opacity="0.75"
                    ></polygon>{" "}
                    <polygon
                        points="80,100 100,100, 100,80"
                        fill="#bbdefb"
                        opacity="0.75"
                    ></polygon>{" "}
                    <polygon
                        points="0,80 0,100, 20,100"
                        fill="#bbdefb"
                        opacity="0.75"
                    ></polygon>{" "}
                    <polygon
                        points="80,0 100,0, 100,20"
                        fill="#bbdefb"
                        opacity="0.75"
                    ></polygon>{" "}
                </pattern>
            </defs>
            <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="#f9f9ff"
                opacity="0.75"
            ></rect>
            <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#bg_pattern)"
                opacity="0.75"
            ></rect>
        </svg>
    );
};

export default Background;
