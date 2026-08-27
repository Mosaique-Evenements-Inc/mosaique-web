import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "iconoir-react";

import "./editorial-action.css";

type CommonProps = {
  children: ReactNode;
  className?: string;
};

type LinkProps = CommonProps &
  Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "children" | "className"> & {
    href: string;
  };

type ButtonProps = CommonProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className"> & {
    href?: never;
  };

type EditorialActionProps = LinkProps | ButtonProps;

const classNames = (className?: string) =>
  ["editorial-action", className].filter(Boolean).join(" ");

export default function EditorialAction(props: EditorialActionProps) {
  if ("href" in props && props.href) {
    const { children, className, href, ...attributes } = props as LinkProps;
    return (
      <a className={classNames(className)} href={href} {...attributes}>
        <span>{children}</span>
        <ArrowRight className="editorial-action__arrow" aria-hidden="true" strokeWidth={1.25} />
      </a>
    );
  }

  const { children, className, type = "button", ...attributes } = props as ButtonProps;
  return (
    <button className={classNames(className)} type={type} {...attributes}>
      <span>{children}</span>
      <ArrowRight className="editorial-action__arrow" aria-hidden="true" strokeWidth={1.25} />
    </button>
  );
}
