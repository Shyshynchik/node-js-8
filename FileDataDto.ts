export class FileDataDto {
    private readonly _name: string;
    private readonly _content: string;
    private readonly _extension: string;


    constructor(name: string, content: string, extension: string) {
        this._name = name;
        this._content = content;
        this._extension = extension;
    }


    get name(): string {
        return this._name;
    }

    get content(): string {
        return this._content;
    }

    get extension(): string {
        return this._extension;
    }

    public fullName(): string {
        return this._name + this._extension;
    }
}