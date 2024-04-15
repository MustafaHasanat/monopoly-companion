"use client";

import { Typography, Link, Grid } from "@mui/material";
import { ContainedButton } from "../shared/button";
import { TextFieldForm } from "../shared/form";
import useLocale from "@/hooks/useLocale";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { login } from "@/app/[locale]/auth/action";
import { useDispatch } from "react-redux";
import { loginSchema } from "@/utils/schemas";
import { snackbarAlert } from "@/utils/helpers";

const Login = () => {
    const { getDictLocales } = useLocale();
    const { auth } = getDictLocales();
    const router = useRouter();
    const dispatch = useDispatch();

    const {
        control,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(loginSchema),
        defaultValues: {
            email: "mustafa@gmail.com",
            password: "Test12345678",
        },
    });

    const onSubmit = async (formData: { email: string; password: string }) => {
        const response = await login(formData);

        if (!response.error) {
            snackbarAlert("Logged in successfully", "success", dispatch);
            setTimeout(() => {
                router.replace("/lobby");
            }, 1500);
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
            sx={{
                width: "100%",
                height: "100%",
                p: "20px",
                overflow: "hidden",
            }}
        >
            <Grid container item mobile={12} justifyContent="center">
                <Typography variant="h3">{auth.login}</Typography>
            </Grid>
            <Grid container mobile={12} justifyContent="center">
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
            <Grid container item mobile={12} justifyContent="center">
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
            <Grid container item mobile={12} justifyContent="center">
                <ContainedButton
                    type="submit"
                    sx={{
                        width: "100%",
                    }}
                >
                    {auth.login}
                </ContainedButton>
            </Grid>
            <Grid item mobile={6} justifyContent="center" alignItems="center" textAlign="start">
                <Link href="/">{auth.forgotPass}</Link>
            </Grid>
            <Grid item mobile={6} textAlign="end">
                <Link href="/auth?active=register">{auth.register}</Link>
            </Grid>
        </Grid>
    );
};

export default Login;
