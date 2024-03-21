/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useContext, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { schema } from "./schemas/account";
import { AuthContext } from "@/utils/context/auth-context";
import { updateProfile } from "@/app/[locale]/account/action";
import { Avatar, Grid, OutlinedInput, Select, Typography } from "@mui/material";
import { SelectBox, TextFieldForm } from "../shared/form";
import useLocale from "@/hooks/useLocale";
import { UserAvatar } from "@/utils/enums";
import { userAvatarMapping } from "@/utils/constants";
import { ContainedButton } from "../shared/button";
import { ControlsContext } from "@/utils/context/controls-context";

const AccountForm = () => {
    const [dialogIsOpen, setDialogIsOpen] = useState(false);
    const { user } = useContext(AuthContext);
    const { setSnackbarState } = useContext(ControlsContext);
    const { getDictLocales } = useLocale();
    const { auth } = getDictLocales();

    const {
        control,
        formState: { errors, isDirty },
        watch,
        setValue,
        handleSubmit,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            username: user.username,
            email: user.email,
            avatar: user.avatar,
        },
    });

    useEffect(() => {
        if (user) {
            setValue("username", user.username);
            setValue("email", user.email);
            setValue("avatar", user.avatar);
        }
    }, [user]);

    const onSubmit = async (formData: {
        email: string;
        username: string;
        avatar: string;
    }) => {
        const response = await updateProfile(formData)
            .then((data) => {
                setSnackbarState({
                    message: "Profile updated successfully",
                    severity: "success",
                });
            })
            .catch((error) => {
                setSnackbarState({
                    message: "Error occurred",
                    severity: "error",
                });
            });

            console.log(response);
            
    };

    return (
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
                    src={userAvatarMapping()[watch("avatar") as UserAvatar]}
                    alt="avatar"
                    sx={{
                        width: "100px",
                        height: "auto",
                        m: "auto",
                    }}
                />
            </Grid>

            <Grid container item mobile={7} m="auto" justifyContent="center">
                <Controller
                    name="avatar"
                    control={control}
                    render={({ field }) => (
                        <SelectBox
                            {...field}
                            initialValue={user?.avatar || UserAvatar.M1}
                            values={Object.keys(UserAvatar)}
                            labels={Object.values(userAvatarMapping(true))}
                            input={<OutlinedInput label="Avatar" />}
                            error={!!errors.avatar}
                            sx={{}}
                        />
                    )}
                />
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
