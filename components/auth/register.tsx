"use client";

import { Typography, Grid, Link } from "@mui/material";
import { ContainedButton } from "../shared/button";
import { TextFieldForm } from "../shared/form";
import useLocale from "@/hooks/useLocale";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { login, register } from "@/app/[locale]/auth/action";
import { useDispatch } from "react-redux";
import { registerSchema } from "@/utils/schemas";
import { snackbarAlert } from "@/utils/helpers";

const Register = () => {
    const { getDictLocales } = useLocale();
    const { auth } = getDictLocales();
    const dispatch = useDispatch();
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

    const onSubmit = async (formData: { email: string; password: string; username: string }) => {
        const response = await register(formData);

        if (!response.error) {
            snackbarAlert("User is created, logging you in ..", "success", dispatch);
            const loginResponse = await login(formData);

            if (!loginResponse.error) {
                snackbarAlert("Logged in successfully", "success", dispatch);
                setTimeout(() => {
                    router.replace("/lobby");
                }, 1500);
            } else {
                snackbarAlert(loginResponse.error.message, "error", dispatch);
            }
        } else {
            snackbarAlert(response.error.message, "error", dispatch);
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
