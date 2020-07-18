export interface IWeatherObject {
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
