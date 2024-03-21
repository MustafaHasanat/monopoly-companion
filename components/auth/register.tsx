"use client";

import { Typography, useTheme, Grid, Link } from "@mui/material";
import { ContainedButton } from "../shared/button";
import { TextFieldForm } from "../shared/form";
import useLocale from "@/hooks/useLocale";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "./schemas/register";
import { ControlsContext } from "@/utils/context/controls-context";
import { useContext } from "react";
import { useRouter } from "next/navigation";
import { register } from "@/app/[locale]/auth/action";

const Register = () => {
    const theme = useTheme();
    const { getDictLocales } = useLocale();
    const { auth } = getDictLocales();
    const { setSnackbarState } = useContext(ControlsContext);
    const router = useRouter();

    const {
        control,
        formState: { errors },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(registerSchema),
        defaultValues: {
            username: "Mustafa",
            email: "mustafa@gmail.com",
            password: "Test12345678",
            confirm: "Test12345678",
        },
    });

    const onSubmit = async (formData: {
        email: string;
        password: string;
        username: string;
    }) => {
        const response = await register(formData);

        if (!response.error) {
            setSnackbarState({
                message: "User is created",
                severity: "success",
            });
            setTimeout(() => {
                router.push("/auth?active=login");
            }, 2000);
        } else {
            setSnackbarState({
                message: response.error.message,
                severity: "error",
            });
        }
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignContent="space-around"
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            sx={{
                width: "100%",
                height: "100%",
                p: "20px",
                overflow: "hidden",
            }}
        >
            <Grid container item mobile={12} justifyContent="center">
                <Typography variant="h3">{auth.register}</Typography>
            </Grid>

            <Grid item mobile={12} laptop={6} textAlign="center">
                <Controller
                    name="username"
                    control={control}
                    render={({ field }) => (
                        <TextFieldForm
                            {...field}
                            label={auth.username}
                            error={!!errors.username}
                            helperText={errors.username?.message}
                        />
                    )}
                />
            </Grid>

            <Grid item mobile={12} laptop={6} textAlign="center">
                <Controller
                    name="email"
                    control={control}
                    render={({ field }) => (
                        <TextFieldForm
                            {...field}
                            label={auth.email}
                            error={!!errors.email}
                            helperText={errors.email?.message}
                        />
                    )}
                />
            </Grid>

            <Grid item mobile={12} laptop={6} textAlign="center">
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextFieldForm
                            {...field}
                            type="password"
                            label={auth.password}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    )}
                />
            </Grid>

            <Grid item mobile={12} laptop={6} textAlign="center">
                <Controller
                    name="confirm"
                    control={control}
                    render={({ field }) => (
                        <TextFieldForm
                            {...field}
                            type="password"
                            label={auth.confirm}
                            error={!!errors.confirm}
                            helperText={errors.confirm?.message}
                        />
                    )}
                />
            </Grid>

            <Grid item mobile={12} px="10%" mt={{ mobile: 0, laptop: 5 }}>
                <ContainedButton
                    type="submit"
                    sx={{
                        width: "100%",
                    }}
                >
                    {auth.register}
                </ContainedButton>
            </Grid>

            <Grid item mobile={12} textAlign="center">
                <Link href="/auth?active=login">{auth.login}</Link>
            </Grid>
        </Grid>
    );
};

export default Register;
