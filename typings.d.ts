// typings.d.ts 或 src/typings.d.ts
declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.scss' {
  const classes: { [key: string]: string };
  export default classes;
}

declare global {
  interface Window {
    $message: any;
  }
}
