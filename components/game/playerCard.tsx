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
import React from "react";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import SentimentSatisfiedAltIcon from "@mui/icons-material/SentimentSatisfiedAlt";
import SentimentVeryDissatisfiedIcon from "@mui/icons-material/SentimentVeryDissatisfied";
import { UserStatus } from "@/utils/enums";

interface Props {
    player: Player;
}

const PlayerCard = ({ player }: Props) => {
    const [avatarImg, playerUsername, playerEmail, playerStatus, playerCredit] =
        useAsyncStates({
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

    return (
        <ListItem alignItems="flex-start">
            <ListItemAvatar>
                <Avatar src={avatarImg} alt="avatar" />
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Typography variant="body1">{playerUsername}</Typography>
                }
                secondary={
                    <Typography variant="body2">{playerEmail}</Typography>
                }
            />
            <ListItemIcon>
                {playerStatus === UserStatus.BANKER ? (
                    <AccountBalanceIcon sx={iconSX} color="success" />
                ) : playerCredit < 100 ? (
                    <SentimentVeryDissatisfiedIcon sx={iconSX} color="error" />
                ) : (
                    <SentimentSatisfiedAltIcon sx={iconSX} color="primary" />
                )}
            </ListItemIcon>
        </ListItem>
    );
};

export default PlayerCard;
