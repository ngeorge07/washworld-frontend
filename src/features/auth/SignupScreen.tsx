import {
  AlertCircleIcon,
  Button,
  ButtonSpinner,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
  FormControlHelper,
  FormControlHelperText,
  FormControlLabel,
  FormControlLabelText,
  HStack,
  Input,
  InputField,
  Link,
  LinkText,
  ScrollView,
  Text,
  useToast,
  View,
} from "@gluestack-ui/themed";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Formik } from "formik";
import React, { FC } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { colors } from "../../styles";
import { CustomToast } from "../components/CustomToast";
import { AuthParams } from "./AuthScreen";
import { signUp } from "./authSlice";

type FormData = {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export const SignupScreen: FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.auth.status);
  const navigation = useNavigation<NavigationProp<AuthParams, "signup">>();
  const toast = useToast();

  const initialValues: FormData = {
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const validate = (values: FormData) => {
    const errors: Partial<FormData> = {};

    // Full Name validation
    if (!values.fullName) {
      errors.fullName = "Please enter your full name.";
    }

    // Email validation
    if (!values.email) {
      errors.email = "Please enter your email address.";
    } else if (!/^\S+@\S+\.\S+$/.test(values.email)) {
      errors.email = "Invalid email address";
    }

    // Password validation
    if (!values.password) {
      errors.password = "Please enter a password.";
    } else if (!/^(?=.*[A-Z])(?=.*\d).{6,}$/.test(values.password)) {
      errors.password =
        "Password must be at least 6 characters, include one uppercase letter and one number.";
    }

    // Confirm Password validation
    if (!values.confirmPassword) {
      errors.confirmPassword = "Please confirm your password.";
    } else if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return errors;
  };

  async function navigateToSignin(values: FormData): Promise<void> {
    const user = {
      fullName: values.fullName,
      email: values.email,
      password: values.password,
    };
    navigation.navigate("login", {
      email: user.email,
      password: user.password,
    });
  }

  return (
    <ScrollView mt="$11" mx="$9">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values: FormData, { resetForm }) => {
          dispatch(
            signUp({
              fullName: values.fullName,
              password: values.password,
              email: values.email,
            })
          )
            .then(() => {
              navigateToSignin(values);
              // resetForm();
            })
            .catch((error) => {
              toast.show({
                placement: "bottom",
                render: ({ id }) => {
                  const toastId = "toast-" + id;
                  return (
                    <CustomToast
                      toastId={toastId}
                      title="Sign up error"
                      message={error.response.data.message}
                      action="error"
                    />
                  );
                },
              });
            });
        }}
        validateOnBlur={false}
        validateOnChange={false}
      >
        {({ errors, handleChange, handleBlur, handleSubmit, values }) => (
          <View display="flex" gap="$6">
            {/* Full Name Field */}
            <FormControl
              size="md"
              isInvalid={errors.fullName ? true : false}
              isRequired={true}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Full Name</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  placeholder="Full Name"
                  onChangeText={(text) => {
                    handleChange("fullName")(text); // Handle text change
                    if (errors.fullName) {
                      // Clear the error if it exists
                      errors.fullName = undefined;
                    }
                  }}
                  onBlur={handleBlur("fullName")}
                  value={values.fullName}
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{errors.fullName}</FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* Email Field */}
            <FormControl
              size="md"
              isInvalid={errors.email ? true : false}
              isRequired={true}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Email</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="text"
                  placeholder="Email"
                  onChangeText={(text) => {
                    handleChange("email")(text);
                    if (errors.email) {
                      errors.email = undefined;
                    }
                  }}
                  onBlur={handleBlur("email")}
                  value={values.email}
                  autoCapitalize="none"
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{errors.email}</FormControlErrorText>
              </FormControlError>
            </FormControl>

            {/* Password Field */}
            <FormControl
              size="md"
              isInvalid={errors.password ? true : false}
              isRequired={true}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Password</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="password"
                  placeholder="Password"
                  onChangeText={(text) => {
                    handleChange("password")(text);
                    if (errors.password) {
                      errors.password = undefined;
                    }
                  }}
                  onBlur={handleBlur("password")}
                  value={values.password}
                  autoCapitalize="none"
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>{errors.password}</FormControlErrorText>
              </FormControlError>
              {!errors.password && (
                <FormControlHelper>
                  <FormControlHelperText>
                    Must be at least 6 characters, include one uppercase letter
                    and one number.
                  </FormControlHelperText>
                </FormControlHelper>
              )}
            </FormControl>

            {/* Confirm Password Field */}
            <FormControl
              size="md"
              isInvalid={errors.confirmPassword ? true : false}
              isRequired={true}
            >
              <FormControlLabel mb="$1">
                <FormControlLabelText>Confirm Password</FormControlLabelText>
              </FormControlLabel>
              <Input>
                <InputField
                  type="password"
                  placeholder="Confirm Password"
                  onChangeText={(text) => {
                    handleChange("confirmPassword")(text); // Handle text change
                    if (errors.confirmPassword) {
                      // Clear the error if it exists
                      errors.confirmPassword = undefined;
                    }
                  }}
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  autoCapitalize="none"
                />
              </Input>
              <FormControlError>
                <FormControlErrorIcon as={AlertCircleIcon} />
                <FormControlErrorText>
                  {errors.confirmPassword}
                </FormControlErrorText>
              </FormControlError>
            </FormControl>
            <Button
              bg={colors.primary.washWorldGreen}
              isDisabled={status === "loading"}
              onPress={() => handleSubmit()}
            >
              {status === "loading" && <ButtonSpinner mr="$1" />}
              <ButtonText>Submit</ButtonText>
            </Button>
          </View>
        )}
      </Formik>

      <HStack mt="$3">
        <Text>Already have an account? </Text>
        <Link onPress={() => navigation.navigate("login")}>
          <LinkText>Log in</LinkText>
        </Link>
      </HStack>
    </ScrollView>
  );
};
