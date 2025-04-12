declare module '*.svg' {
    const content: string;
    export default content;
}

declare module "*.json" {
    const value: any;  // You can replace `any` with a more specific type if you want to type the data
    export default value;
}