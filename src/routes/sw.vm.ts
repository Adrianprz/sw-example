export type routerObject = {
    [key: string]: routerParamsInterface;
};

export interface routerParamsInterface extends Object {
    component: any;
    path: string;
}
