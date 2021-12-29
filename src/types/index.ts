export interface Person {
    name: string;
    films: Array<string>;
    species: Array<string>;
    starships: Array<string>;
    url: string;
}

export interface SWAPIPersonResult {
    count: number;
    next: string | null;
    previous: string | null;
    results: Array<Person>;
}

