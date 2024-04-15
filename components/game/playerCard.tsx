import useAsyncStates from "@/hooks/useAsyncStates";
import { AVATAR_PLACEHOLDER, userAvatarMapping } from "@/utils/constants";
import { Player } from "@/utils/types";
import {
    Avatar,
    ListItem,
    ListItemAvatar,
    ListItemIcon,
    ListItemText,
    SxProps,
    Typography,
} from "@mui/material";
import React, { ReactNode } from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { UserStatus } from "@/utils/enums";

interface Props {
    player: Player;
}

const PlayerCard = ({ player }: Props) => {
    const [avatarImg, playerUsername, playerEmail, playerStatus, playerCredit] = useAsyncStates({
        dependents: [player],
        initialStates: [AVATAR_PLACEHOLDER, "", "", UserStatus.CITIZEN, 0],
        finalStates: [
            userAvatarMapping()[player.avatar],
            player.username,
            player.email,
            player.status,
            player.credit,
        ],
    });

    const iconSX: SxProps = {
        height: "30px",
        width: "auto",
        m: "auto",
    };

    const getIconMapping = (status: UserStatus, credit: number): ReactNode => {
        if (status === UserStatus.BANKER) return <AccountBalanceIcon sx={iconSX} color="success" />;
        if (status === UserStatus.AWAITING) return <HourglassTopIcon sx={iconSX} color="warning" />;
        else if (credit < 100) return <SentimentVeryDissatisfiedIcon sx={iconSX} color="error" />;
        else return <SentimentSatisfiedAltIcon sx={iconSX} color="primary" />;
    };

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar src={avatarImg} alt="avatar" />
            </ListItemAvatar>
            <ListItemText
                primary={<Typography variant="body1">{playerUsername}</Typography>}
                secondary={<Typography variant="body2">{playerEmail}</Typography>}
            />
            <ListItemIcon>{getIconMapping(playerStatus, playerCredit)}</ListItemIcon>
        </ListItem>
    );
};

export default PlayerCard;
