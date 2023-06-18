import * as fs from 'fs';

export default class File {
    _path: string;
    _data: string | null;

    constructor(path: string) {
        this._path = path;
        this._data = null;
    }

    exists(): boolean {
        return fs.existsSync(this._path);
    }

    data(): Promise<string> {
        if(this._data !== null) {
            return Promise.resolve(this._data);
        }
        return new Promise((resolve, reject) => {
            fs.readFile(this._path, 'utf8', (err, data) => {
                if (err) {
                  reject(err);
                  return;
                }

                this._data = data;
                resolve(data);
              });
        });
    }

    write(data: string) {
        fs.writeFileSync(this._path, data);
    }
}
