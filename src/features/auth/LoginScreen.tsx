type Props = {};
import { Input, InputField, ScrollView } from "@gluestack-ui/themed";
import { FC } from "react";

export const LoginScreen: FC<Props> = () => {
  return (
    <ScrollView>
      <Input
        variant="outline"
        size="md"
        isDisabled={false}
        isInvalid={false}
        isReadOnly={false}
      >
        <InputField placeholder="Enter Text here" />
      </Input>
    </ScrollView>
  );
};
