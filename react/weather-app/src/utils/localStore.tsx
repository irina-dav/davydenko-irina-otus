export class LocalStore {

    save(key: string, data: any) {
        const dataString = JSON.stringify(data);
        localStorage.setItem(key, dataString);
    }

    load(key: string) {
        const dataString = localStorage.getItem(key);
        return JSON.parse(dataString);
    }
}