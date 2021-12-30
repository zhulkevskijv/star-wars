export interface Person {
    name: string;
    films: Array<string>;
    species: Array<string>;
    starships: Array<string>;
    url: string;
}

export interface Specimen {
    name: string;
    url: string;
}

export interface Film {
    title: string;
    url: string;
}

export interface Starship extends Specimen{
}

export interface SWAPIResult<Type> {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<Type>;
}

export interface FilterTypes{
    film: string | null;
    specimen: string | null;
}

