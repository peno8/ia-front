import { Context, createContext } from 'react';
import { AppMetadata, CompanyDef } from '../app.store';


export type MetadataContextDef = {
    metadata: AppMetadata,
    compDef: CompanyDef
}

const defaultContext = {
    metadata: {
        DATE: '',
        CURRENT_QT: '',
        LAST_QT: '',
    },
    compDef: {
        sb: '',
        name: '',
        cik: '',
        exg: '',
        sic: '',
        desc: '',
        div: '',
        div2: '',
        nai: 0,
        nd: '',
        cc: '',
        nameLocal: '',
        descLocal: ''

        // sb: string
        // name: string
        // cik: string
        // exg: string
        // sic: string
        // desc: string
        // div: string
        // div2: string
        // nai: number
        // nd: string
        // cc: string
        // nameLocal: string | undefined
        // descLocal: string | undefined
    }
}

export const MetadataContext = createContext<MetadataContextDef>(defaultContext); // TODO: Move to Project Root