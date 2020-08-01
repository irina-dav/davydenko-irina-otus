export interface IWeatherObject {
    date?: string,
    coord: { "lon": number, "lat": number },
    city: string,
    main: string,
    description: string,
    icon: string,
    data: {
        "temp": number,
        "pressure": number,
        "humidity": number
    }
}

export function isWeatherObject(obj: any): obj is IWeatherObject {
    return (obj as IWeatherObject).city !== undefined;
}

export interface IError {
    errorMessage: string;
}

export function isErrorObject(obj: any): obj is IError {
    return (obj as IError).errorMessage !== undefined;
}
