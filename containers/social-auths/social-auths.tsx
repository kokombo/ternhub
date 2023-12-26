"use client";
import { SocialAuthFrame } from "@/components";
import { icons } from "@/constants";
import {
  signIn,
  LiteralUnion,
  ClientSafeProvider,
  getProviders,
} from "next-auth/react";
import { BuiltInProviderType } from "next-auth/providers/index";
import { useEffect, useState } from "react";

type Props = {
  label: string;
};

const SocialAuths = (props: Props) => {
  const [providers, setProviders] = useState<Record<
    LiteralUnion<BuiltInProviderType, string>,
    ClientSafeProvider
  > | null>(null);

  useEffect(() => {
    const initializeProviders = async () => {
      const response = await getProviders();
      setProviders(response);
    };

    initializeProviders();
  }, []);

  return (
    <div>
      {providers &&
        Object.values(providers)
          .filter((provider) => provider.id !== "credentials")
          .map((provider) => {
            return (
              <SocialAuthFrame
                onClick={() =>
                  signIn(provider.id, { callbackUrl: "/jobs", redirect: true })
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
