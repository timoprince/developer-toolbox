import {v4 as uuid} from "uuid";

export function useIndexedDbHook() {
    let dbName = "developer-toolbox";
    let dbVersion = 1;

    let tableConfig = {
        md5: "id",
    }

    function getIndexedDatabase() {
        return new Promise<IDBDatabase>((resolve, reject) => {
            let idbOpenDBRequest = indexedDB.open(dbName, dbVersion);
            idbOpenDBRequest.addEventListener("success", (event) => {
                resolve((event.target as any).result as IDBDatabase);
            })
            idbOpenDBRequest.onerror = reject;
            idbOpenDBRequest.addEventListener("upgradeneeded", (event) => {
                let db = (event.target as any).result as IDBDatabase;

                for (const key of Object.keys(tableConfig)) {
                    if (!db.objectStoreNames.contains(key)) {
                        db.createObjectStore(key, {keyPath: tableConfig[key]})
                    }
                }
            })
        })
    }

    function selectInDatabase(tableName: string) {
        return new Promise((resolve, reject) => {
            getIndexedDatabase().then((db) => {
                let idbTransaction = db.transaction([tableName], "readonly");
                let idbObjectStore = idbTransaction.objectStore(tableName);
                let idbRequest = idbObjectStore.getAll();

                idbRequest.addEventListener("success", (event) => {
                    resolve((event.target as any).result)
                })

                idbRequest.addEventListener("error", reject);
            });
        })
    }

    function firstInDatabase(tableName: string, id: string) {
        return new Promise((resolve, reject) => {
            getIndexedDatabase().then((db) => {
                let idbTransaction = db.transaction([tableName], "readonly");
                let idbObjectStore = idbTransaction.objectStore(tableName);
                let idbRequest = idbObjectStore.get(id);

                idbRequest.addEventListener("success", (event) => {
                    resolve((event.target as any).result)
                })

                idbRequest.addEventListener("error", reject);
            });
        })
    }

    function writeToDatabase(tableName: string, data: any) {
        return new Promise((resolve, reject) => {
            getIndexedDatabase().then((db) => {
                let idbTransaction = db.transaction([tableName], "readwrite");
                let idbObjectStore = idbTransaction.objectStore(tableName);
                let idbRequest = idbObjectStore.add(data);

                idbRequest.addEventListener("success", (event) => {
                    resolve(data);
                })

                idbRequest.addEventListener("error", reject);
            });
        })
    }

    function deleteDatabase() {
        indexedDB.deleteDatabase("satisfactory-toolbox");
    }

    return {
        getIndexedDatabase,
        selectInDatabase,
        firstInDatabase,
        writeToDatabase,
        deleteDatabase
    }
}