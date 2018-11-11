import { Component, ComponentType, ReactNode } from 'react';

export interface RenderCodeProps {
  source: string,
  result: ReactNode,
}

export type RenderCodeType = ComponentType<RenderCodeProps>;

interface CodeProps {
  render: RenderCodeType,
  children: ReactNode,
}

declare class Code extends Component<CodeProps> {

}

export default Code;
