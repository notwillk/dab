import JSON5 from 'json5';
import File from './File.js'

export default class Json5File<T> {
    _file: File;
    _parsed: T | null;

    constructor(file: File) {
        this._file = file;
        this._parsed = null;
    }

    raw(): Promise<T> {
        if(this._parsed !== null) {
            return Promise.resolve(this._parsed);
        }
        return new Promise((resolve, reject) => {
            this._file.data().then(data => {
                this._parsed = JSON5.parse<T>(data);
                resolve(this._parsed);
            }, reject);
        });
    }
}
