declare module "react-mailchimp-subscribe" {
  import * as React from "react";

  export interface FormHooks {
    subscribe: (data: any) => void;
    status: "sending" | "error" | "success" | null;
    message: string | Error | null;
  }

  export interface Props {
    url: string;
    render?: (hooks: FormHooks) => React.ReactNode;
  }

  export default class MailchimpSubscribe extends React.Component<Props> {}
}

declare module "*.json" {
  const value: any;
  export default value;
}
