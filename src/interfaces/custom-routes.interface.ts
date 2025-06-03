import { JSX } from 'react';

export interface CustomRoute {
  path: string;
  Component: () => JSX.Element;
  children?: CustomRoute[];
}
