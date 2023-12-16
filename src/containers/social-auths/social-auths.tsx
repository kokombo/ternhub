import { SocialAuthFrame } from "@/components";
import { icons } from "@/constants";
import { signIn, LiteralUnion, ClientSafeProvider } from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";

type Props = {
  providers: Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null;
  label: string;
};

const SocialAuths = (props: Props) => {
  return (
    <div>
      {props.providers &&
        Object.values(props.providers)
          .filter((provider) => provider.id !== "credentials")
          .map((provider) => {
            return (
              <SocialAuthFrame
                onClick={() =>
                  signIn(provider.id, { callbackUrl: "/", redirect: true })
                }
                key={provider.name}
                authName={provider.name}
                label={props.label}
                icon={icons.google}
              />
            );
          })}
    </div>
  );
};

export default SocialAuths;
