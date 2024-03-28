/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { updateProfile } from "@/app/[locale]/account/action";
import { Avatar, Grid, Typography } from "@mui/material";
import { SelectBox, TextFieldForm } from "../shared/form";
import useLocale from "@/hooks/useLocale";
import { UserAvatar } from "@/utils/enums";
import { AVATAR_PLACEHOLDER, userAvatarMapping } from "@/utils/constants";
import { ContainedButton } from "../shared/button";
import { useDispatch, useSelector } from "react-redux";
import { selectAuth } from "@/utils/redux/auth-slice";
import { controlsSlice } from "@/utils/redux/controls-slice";
import useAuthGuard from "@/hooks/useAuthGuard";
import { accountSchema } from "@/utils/schemas";

const AccountForm = () => {
    const { getDictLocales } = useLocale();
    const { auth } = getDictLocales();
    const { user } = useSelector(selectAuth);
    const dispatch = useDispatch();
    const { isAccessible, loadingComponent } = useAuthGuard({
        page: "account",
    });
    const [avatarURL, setAvatarURL] = useState(AVATAR_PLACEHOLDER);

    const {
        control,
        formState: { errors, isDirty },
        watch,
        setValue,
        handleSubmit,
    } = useForm({
        resolver: yupResolver(accountSchema),
        defaultValues: {
            username: "",
            email: "",
            avatar: AVATAR_PLACEHOLDER,
        },
    });

    useEffect(() => {
        if (user) {
            setValue("username", user.username);
            setValue("email", user.email);
            setValue("avatar", user.avatar);
            setAvatarURL(userAvatarMapping()[watch("avatar") as UserAvatar]);
        }
    }, [user]);

    const onSubmit = async (formData: {
        email: string;
        username: string;
        avatar: string;
    }) => {
        await updateProfile(formData)
            .then((data) => {
                dispatch(
                    controlsSlice.actions.setSnackbarState({
                        snackbarState: {
                            message: "Profile updated successfully",
                            severity: "success",
                        },
                    })
                );
            })
            .catch((error) => {
                dispatch(
                    controlsSlice.actions.setSnackbarState({
                        snackbarState: {
                            message: "Error occurred",
                            severity: "error",
                        },
                    })
                );
            });
    };

    return !isAccessible ? (
        loadingComponent
    ) : (
        <Grid
            container
            rowGap={5}
            justifyContent="center"
            alignContent="center"
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            mobile={12}
            sx={{
                width: "80%",
                height: "100%",
                p: { mobile: "30px 0", laptop: "30px 20vw" },
                overflow: "hidden",
                m: "auto",
            }}
        >
            <Grid container item mobile={2}>
                <Avatar
                    src={avatarURL}
                    alt="avatar"
                    sx={{
                        width: "100px",
                        height: "auto",
                        m: "auto",
                    }}
                />
            </Grid>

            <Grid
                container
                item
                mobile={7}
                m="auto"
                justifyContent="center"
                rowGap={3}
            >
                <Grid item mobile={12} m="auto">
                    <Controller
                        name="avatar"
                        control={control}
                        render={({ field }) => (
                            <SelectBox
                                {...field}
                                initialValue={UserAvatar.M1}
                                defaultValue={UserAvatar.M1}
                                label={auth.avatar}
                                values={Object.keys(UserAvatar)}
                                labels={Object.values(userAvatarMapping(true))}
                                error={!!errors.avatar}
                                helperText={errors.avatar?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid item mobile={5} m="auto">
                    <Typography>{auth.preview}</Typography>
                </Grid>
                <Grid item mobile={5} m="auto">
                    <Avatar
                        src={userAvatarMapping()[watch("avatar") as UserAvatar]}
                        alt="avatar"
                        sx={{
                            width: "50px",
                            height: "auto",
                            m: "auto",
                        }}
                    />
                </Grid>
            </Grid>

            <Grid item mobile={12}>
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <TextFieldForm
                            {...field}
                            value={watch("username")}
                            label={auth.username}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                            sx={{
                                width: "100%",
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid item mobile={12}>
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextFieldForm
                            {...field}
                            label={auth.email}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                            sx={{
                                width: "100%",
                            }}
                        />
                    )}
                />
            </Grid>

            <Grid container item mobile={12} justifyContent="center">
                <ContainedButton
                    type="submit"
                    disabled={!isDirty}
                    sx={{
                        width: { mobile: "50%", laptop: "20%" },
                        m: "auto",
                    }}
                >
                    {auth.save}
                </ContainedButton>
            </Grid>
        </Grid>
    );
};

export default AccountForm;
