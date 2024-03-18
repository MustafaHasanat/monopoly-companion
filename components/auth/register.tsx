"use client";

import { Typography, useTheme, Stack, Grid, Link } from "@mui/material";
import { ContainedButton } from "../shared/button";
import { TextFieldForm } from "../shared/form";
import useLocale from "@/hooks/useLocale";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import registerSchema from "./schemas/register";

interface FormData {
    username: string;
    email: string;
    password: string;
    confirm: string;
}

const Register = () => {
    const theme = useTheme();
    const { getDictLocales } = useLocale();
    const { auth } = getDictLocales();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(registerSchema),
    });

    const onSubmit = (data: FormData) => {
        console.log(data);
    };

    return (
        <Grid
            container
            justifyContent="center"
            alignContent="space-between"
            component="form"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
            sx={{
                width: "100%",
                height: "100%",
                p: "10px 20px",
                overflow: "hidden",
            }}
        >
            <Grid container item mobile={12} justifyContent="center">
                <Typography variant="h3">{auth.register}</Typography>
            </Grid>

            <Grid container item mobile={12}>
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
            </Grid>

            <Grid container item mobile={12}>
                <Grid item mobile={12} laptop={6} textAlign="center">
                    <Controller
                        name="password"
                        control={control}
                        render={({ field }) => (
                            <TextFieldForm
                                {...field}
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
                                label={auth.confirm}
                                error={!!errors.confirm}
                                helperText={errors.confirm?.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>

            <Grid container item mobile={12}>
                <Grid item mobile={12} px="10%">
                    <ContainedButton
                        type="submit"
                        sx={{
                            width: "100%",
                        }}
                    >
                        {auth.register}
                    </ContainedButton>
                </Grid>
            </Grid>

            <Grid item mobile={12} textAlign="center">
                <Link href="/auth?active=login">{auth.login}</Link>
            </Grid>
        </Grid>
    );
};

export default Register;
