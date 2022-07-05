import { createElement, FC } from "react";

type HookType<HookProps, HookResult> = (props: HookProps) => HookResult;

export function bind<HookProps extends Record<string, unknown>, HookResult>(
  useHook: HookType<HookProps, HookResult>,
  ViewComponent: FC<HookResult>
) {
  return (props: HookProps) => createElement(ViewComponent, useHook(props));
}
