import {
  AlertCircleIcon,
  Button,
  ButtonSpinner,
  ButtonText,
  FormControl,
  FormControlError,
  FormControlErrorIcon,
  FormControlErrorText,
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
import {
  NavigationProp,
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Formik } from "formik";
import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../app/store";
import { colors } from "../../styles";
import { CustomToast } from "../components/CustomToast";
import { AuthParams } from "./AuthScreen";
import { signIn } from "./authSlice";

type FormData = {
  email: string;
  password: string;
};

export const LoginScreen: FC = () => {
  const status = useSelector((state: RootState) => state.auth.status);
  const navigation = useNavigation<NavigationProp<AuthParams, "login">>();
  const route = useRoute<RouteProp<AuthParams, "login">>();
  const dispatch = useDispatch<AppDispatch>();
  const toast = useToast();

  const initialValues: FormData = {
    email: "",
    password: "",
  };

  const validate = (values: FormData) => {
    const errors: Partial<FormData> = {};

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

    return errors;
  };

  useEffect(() => {
    if (route.params) {
      toast.show({
        placement: "bottom",
        render: ({ id }) => {
          const toastId = "toast-" + id;

          return (
            <CustomToast
              toastId={toastId}
              title="Sign up success"
              message={"Congratulations! You can log in now."}
              action="success"
            />
          );
        },
      });
    }
  }, [route.params]);

  return (
    <ScrollView mt="$11" mx="$9">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={(values: FormData, { resetForm }) => {
          dispatch(signIn({ email: values.email, password: values.password }))
            .then((res) => {
              resetForm();
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
        <Text>Don't have an account yet? </Text>
        <Link onPress={() => navigation.navigate("signup")}>
          <LinkText>Sign up now</LinkText>
        </Link>
      </HStack>
    </ScrollView>
  );
};
