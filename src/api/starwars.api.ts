const url: string = 'https://swapi.dev/api';

export const getData = (type:string, index?:number):Promise<any> => {
    let params = `${url}/${type}`;
    if (typeof index === 'number') {
        params += `/${index}`;
    }
    return fetch(params).then((res) => res.json());
}
