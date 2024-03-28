import { yupResolver } from "@hookform/resolvers/yup";
import { Controller, useForm } from "react-hook-form";
import { Grid } from "@mui/material";
import { TextFieldForm } from "../shared/form";
import useLocale from "@/hooks/useLocale";
import { ContainedButton } from "../shared/button";
import { passwordSchema } from "@/utils/schemas";

const PasswordReset = () => {
    const { getDictLocales } = useLocale();
    const { auth } = getDictLocales();

    const {
        control,
        formState: { errors, isDirty },
        handleSubmit,
    } = useForm({
        resolver: yupResolver(passwordSchema),
        defaultValues: {
            password: "",
            newPassword: "",
            confirm: "",
        },
    });

    const onSubmit = async (formData: {
        password: string;
        newPassword: string;
    }) => {
        // await updateProfile(formData)
        //     .then(() => {
        //         setSnackbarState({
        //             message: "Profile updated successfully",
        //             severity: "success",
        //         });
        //     })
        //     .catch((error) => {
        //         setSnackbarState({
        //             message: "Error occurred",
        //             severity: "error",
        //         });
        //     });
    };

    return (
        <Grid
            container
            justifyContent="start"
            alignContent="space-around"
            component="form"
            noValidate
            rowGap={5}
            onSubmit={handleSubmit(onSubmit)}
        >
            <Grid item mobile={12} justifyContent="center">
                <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                        <TextFieldForm
                            {...field}
                            type="password"
                            label={auth.oldPassword}
                            error={!!errors.password}
                            helperText={errors.password?.message}
                        />
                    )}
                />
            </Grid>

            <Grid item mobile={12} laptop={6} justifyContent="center">
                <Controller
                    name="newPassword"
                    control={control}
                    render={({ field }) => (
                        <TextFieldForm
                            {...field}
                            type="password"
                            label={auth.newPassword}
                            error={!!errors.newPassword}
                            helperText={errors.newPassword?.message}
                        />
                    )}
                />
            </Grid>

            <Grid item mobile={12} laptop={6} justifyContent="center">
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

            <Grid container item mobile={12} justifyContent="center">
                <ContainedButton
                    type="submit"
                    disabled={!isDirty}
                    sx={{
                        width: { mobile: "50%", laptop: "20%" },
                    }}
                >
                    {auth.save}
                </ContainedButton>
            </Grid>
        </Grid>
    );
};

export default PasswordReset;
